import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createSummoner = async (summonerName, region, tag) => {
    const key = process.env.RG_API_KEY;
    const accountsResponse = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`, {
        headers: {
            "X-Riot-Token": key
        }
    })

    if (!accountsResponse.ok) {
        throw new Error(`Failed to fetch account details ${accountsResponse.status}`)
    }

    const accountsData = await accountsResponse.json()

    const existingRecord = await prisma.summonerId.findUnique({
        where: {
            puuid: accountsData.puuid
        }
    })
    if (existingRecord) {
        throw new Error(`${accountsData.puuid} already exists in SummonerId table`)
    }

    const summonersResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountsData.puuid}`, {
        headers : {
            "X-Riot-Token": key
        }
    })

    if (!summonersResponse.ok) {
        throw new Error(`Failed to fetch summoner details ${summonersResponse.status}`)
    }

    const summonersData = await summonersResponse.json()

    await prisma.summonerId.create({
        data : {
            puuid: accountsData.puuid,
            summoner_id: summonersData.id,
            account_id: summonersData.accountId,
            summoner_name: summonerName,
            summoner_tag: tag
        }
    })

    await prisma.summonerDetails.create({
        data: {
            puuid: accountsData.puuid,
            summoner_level: summonersData.summonerLevel,
            summoner_profileIcon: summonersData.profileIconId
        }
    })
}

export const createSummonerFromPuuid = async puuid => {
    const accountResponse = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`, {
        headers: { 
            "X-Riot-Token": process.env.RG_API_KEY 
        }
    })

    if (!accountResponse.ok) {
        throw new Error(`Failed to fetch account details ${accountResponse.status}`)
    }

    const accountData = await accountResponse.json()

    const summonerResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
        headers: { 
            "X-Riot-Token": process.env.RG_API_KEY 
        }
    })

    if (!summonerResponse.ok) {
        throw new Error(`Failed to fetch summoner details ${summonerResponse.status}`)
    }

    const summonerData = await summonerResponse.json()

    await prisma.summonerId.create({
        data: {
            puuid: puuid,
            summoner_name: accountData.gameName,
            summoner_tag: accountData.tagLine,
            summoner_id: summonerData.id,
            account_id: summonerData.accountId
        }
    })
    await prisma.summonerDetails.create({
        data: {
            puuid: puuid,
            summoner_level: summonerData.summonerLevel,
            summoner_profileIcon: summonerData.profileIconId
        }
    })
}

export const getSummonerPuuidFromNameTag = async (summonerName, tag) => {
    const puuid = await prisma.summonerId.findUnique({
        where: {
            summoner_name_tag_unique : {
                summoner_name: summonerName,
                summoner_tag: tag
            }
        },
        select: {
            puuid: true
        }
    })

    if (!puuid) {
        throw new Error(`No Puuid in SummonerId table for ${summonerName}, ${tag}`)
    }
    return puuid
}

export const getSummoner = async (summonerName, tag) => {
    const puuidData = await getSummonerPuuidFromNameTag(summonerName, tag)
    const puuid = puuidData.puuid
    const summoner = await prisma.summonerId.findUnique({
        where: {
            puuid: puuid
        },
        include: {
            details: {
                select: {
                    summoner_level: true,
                    summoner_profileIcon: true
                }
            }
        }
    })

    return {
        ...summoner,
        ...summoner.details,
        details: undefined
    }
}

export const createMatches = async (summonerName, tag, numOfMatches) => {
    // convert string to Number and check it's valid
    numOfMatches = Number(numOfMatches)
    if (isNaN(numOfMatches)) {
        throw new Error("Invalid numOfMatches given")
    }
    if (numOfMatches > 100) {
        throw new Error("requested number of matches too high")
    }
    
    const puuidData = await getSummonerPuuidFromNameTag(summonerName, tag)
    const puuid = puuidData.puuid
    // get list of matches
    const key = process.env.RG_API_KEY;
    const matchesResponse = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numOfMatches}`, {
        headers: {
            "X-Riot-Token": key
        }
    })

    if (!matchesResponse.ok) {
        throw new Error(`Failed to fetch list of matches ${matchesResponse.status}`)
    }

    const matches = await matchesResponse.json()

    // iterate through each match to get the details
    for (let match of matches) {
        // iterate through each match to check if we already have it in the DB
        const existingMatch = await prisma.Match.findUnique({
            where: { match_id: match }
        });
        if (existingMatch) continue;

        const matchDetailsResponse = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${match}`, {
            headers: {
                "X-Riot-Token": key
            }
        })

        if (!matchDetailsResponse.ok) {
            throw new Error(`failed to get data for ${match} - ${matchDetailsResponse.status}`)
        }

        const matchDetails = await matchDetailsResponse.json()

        await prisma.Match.create({
            data : {
                match_id: match,
                start: BigInt(matchDetails.info.gameCreation),
                end: BigInt(matchDetails.info.gameEndTimestamp),
                duration: matchDetails.info.gameDuration,
                gamemode: matchDetails.info.gameMode,
                game_type: matchDetails.info.gameType,
                game_version: matchDetails.info.gameVersion
            }
        })
        const participants = matchDetails.info.participants
        for (let participant of participants) {
            // check if the participant exists 
            let puuidExists = await prisma.summonerId.findUnique({
                where: {puuid: participant.puuid}
            })
            if (!puuidExists) {
                await createSummonerFromPuuid(participant.puuid)
            }
            await prisma.Participant.create({
                data : {
                    match_id: match,
                    puuid: participant.puuid,
                    team_id: participant.teamId,
                    win: participant.win,
                    champion_id: participant.championId,
                    time_played: participant.timePlayed,
                    lane: participant.lane,
                    role: participant.role,
                    individual_position: participant.individualPosition
                }
            })
            await prisma.ParticipantPerformance.create({
                data: {
                    match_id: match,
                    puuid: participant.puuid,
                    champion_level: participant.champLevel,
                    gold_earned: participant.goldEarned,
                    gold_spent:participant.goldSpent,
                    kills: participant.kills,
                    deaths: participant.deaths,
                    assists: participant.assists,
                    total_damage: participant.totalDamageDealt,
                    total_damage_to_champions: participant.totalDamageDealtToChampions,
                    magic_damage_to_champions: participant.magicDamageDealtToChampions,
                    physical_damage_to_champions: participant.physicalDamageDealtToChampions,
                    largest_critical_strike: participant.largestCriticalStrike,
                    double_kills: participant.doubleKills,
                    triple_kills: participant.tripleKills,
                    quadra_kills: participant.quadraKills,
                    penta_kills: participant.pentaKills,
                    largest_killing_spree: participant.largestKillingSpree,
                    largest_multi_kill: participant.largestMultiKill,
                    longest_time_living: participant.longestTimeSpentLiving,
                    total_time_spent_dead: participant.totalTimeSpentDead,
                    time_ccing_others: participant.timeCCingOthers,
                    time_cc_dealt: participant.totalTimeCCDealt,
                    total_minions_killed: participant.totalMinionsKilled,
                    total_ally_jungle_monsters_killed: participant.totalAllyJungleMinionsKilled,
                    total_enemy_jungle_monsters_killed: participant.totalEnemyJungleMinionsKilled,
                    first_blood_kill: participant.firstBloodKill,
                    first_blood_assist: participant.firstBloodAssist,
                    turret_kills: participant.turretKills,
                    turret_takedowns: participant.turretTakedowns,
                    objectives_stolen: participant.objectivesStolen,
                    objectives_stolen_assists: participant.objectivesStolenAssists,
                    vision_score: participant.visionScore,
                    wards_killed: participant.wardsKilled,
                    stealth_wards_placed: participant.wardsPlaced,
                    vision_wards_placed: participant.detectorWardsPlaced
                }
            })
            await prisma.ParticipantBuild.create({
                data: {
                    match_id: match,
                    puuid: participant.puuid,
                    item_0: participant.item0,
                    item_1: participant.item1,
                    item_2: participant.item2,
                    item_3: participant.item3,
                    item_4: participant.item4,
                    item_5: participant.item5,
                    item_6: participant.item6,
                    summoner_1_id: participant.summoner1Id,
                    summoner_2_id: participant.summoner2Id,
                    consumables_purchased: participant.consumablesPurchased,
                    sight_wards_bought: participant.sightWardsBoughtInGame,
                    vision_wards_bought: participant.visionWardsBoughtInGame
                }
            })
            await prisma.ParticipantPings.create({
                data: {
                    match_id: match,
                    puuid: participant.puuid,
                    basic_pings: participant.basicPings,
                    all_in_pings: participant.allInPings,
                    assist_me_pings: participant.assistMePings,
                    command_pings: participant.commandPings,
                    danger_pings: participant.dangerPings,
                    enemy_missing_pings: participant.enemyMissingPings,
                    enemy_vision_pings: participant.enemyVisionPings,
                    need_vision_pings: participant.needVisionPings,
                    fallback_pings: participant.getBackPings,
                    hold_pings: participant.holdPings,
                    on_my_way_pings: participant.onMyWayPings,
                    push_pings: participant.pushPings
                }
            })
            await prisma.ParticipantCasts.create({
                data: {
                    match_id: match,
                    puuid: participant.puuid,
                    spell_1_casts: participant.spell1Casts,
                    spell_2_casts: participant.spell2Casts,
                    spell_3_casts: participant.spell3Casts,
                    spell_4_casts: participant.spell4Casts,
                    summoner_1_casts: participant.summoner1Casts,
                    summoner_2_casts: participant.summoner2Casts
                }
            })
            await prisma.ParticipantChallenges.create({
                data: {
                    match_id: match,
                    puuid: participant.puuid,
                    ability_uses: participant.challenges.abilityUses,
                    aces_before_15_minutes: participant.challenges.acesBefore15Minutes,
                    allied_jungle_monster_kills: participant.challenges.alliedJungleMonsterKills,
                    baron_takedowns: participant.challenges.baronTakedowns,
                    blast_cone_opposite_opponent_count: participant.challenges.blastConeOppositeOpponentCount,
                    bounty_gold: participant.challenges.bountyGold,
                    buffs_stolen: participant.challenges.buffsStolen,
                    complete_support_quest_in_time: participant.challenges.completeSupportQuestInTime,
                    control_wards_placed: participant.challenges.controlWardsPlaced,
                    damage_per_minute: participant.challenges.damagePerMinute,
                    damage_taken_on_team_percentage: participant.challenges.damageTakenOnTeamPercentage,
                    danced_with_rift_herald: participant.challenges.dancedWithRiftHerald,
                    deaths_by_enemy_champs: participant.challenges.deathsByEnemyChamps,
                    dodge_skill_shots_small_window: participant.challenges.dodgeSkillShotsSmallWindow,
                    double_aces: participant.challenges.doubleAces,
                    dragon_takedowns: participant.challenges.dragonTakedowns,
                    effective_heal_and_shielding: participant.challenges.effectiveHealAndShielding,
                    elder_dragon_kills_with_opposing_soul: participant.challenges.elderDragonKillsWithOpposingSoul,
                    elder_dragon_multikills: participant.challenges.elderDragonMultikills,
                    enemy_champion_immobilizations: participant.challenges.enemyChampionImmobilizations,
                    enemy_jungle_monster_kills: participant.challenges.enemyJungleMonsterKills,
                    epic_monster_kills_near_enemy_jungler: participant.challenges.epicMonsterKillsNearEnemyJungler,
                    epic_monster_kills_within_30_seconds_of_spawn: participant.challenges.epicMonsterKillsWithin30SecondsOfSpawn,
                    epic_monster_steals: participant.challenges.epicMonsterSteals,
                    epic_monster_stolen_without_smite: participant.challenges.epicMonsterStolenWithoutSmite,
                    first_turret_killed: participant.challenges.firstTurretKilled,
                    first_turret_killed_time: participant.challenges.firstTurretKilledTime,
                    flawless_aces: participant.challenges.flawlessAces,
                    full_team_takedown: participant.challenges.fullTeamTakedown,
                    game_length: participant.challenges.gameLength,
                    get_takedowns_in_all_lanes_early_jungle_as_laner: participant.challenges.getTakedownsInAllLanesEarlyJungleAsLaner,
                    gold_per_minute: participant.challenges.goldPerMinute,
                    had_open_nexus: participant.challenges.hadOpenNexus,
                    immobilize_and_kill_with_ally: participant.challenges.immobilizeAndKillWithAlly,
                    initial_buff_count: participant.challenges.initialBuffCount,
                    initial_crab_count: participant.challenges.initialCrabCount,
                    jungle_cs_before_10_minutes: participant.challenges.jungleCsBefore10Minutes,
                    jungler_takedowns_near_damaged_epic_monster: participant.challenges.junglerTakedownsNearDamagedEpicMonster,
                    k_turrets_destroyed_before_plates_fall: participant.challenges.kTurretsDestroyedBeforePlatesFall,
                    kda: participant.challenges.kda,
                    kill_after_hidden_with_ally: participant.challenges.killAfterHiddenWithAlly,
                    kill_participation: participant.challenges.killParticipation,
                    killed_champ_took_full_team_damage_survived: participant.challenges.killedChampTookFullTeamDamageSurvived,
                    killing_sprees: participant.challenges.killingSprees,
                    kills_near_enemy_turret: participant.challenges.killsNearEnemyTurret,
                    kills_on_other_lanes_early_jungle_as_laner: participant.challenges.killsOnOtherLanesEarlyJungleAsLaner,
                    kills_on_recently_healed_by_aram_pack: participant.challenges.killsOnRecentlyHealedByAramPack,
                    kills_under_own_turret: participant.challenges.killsUnderOwnTurret,
                    kills_with_help_from_epic_monster: participant.challenges.killsWithHelpFromEpicMonster,
                    knock_enemy_into_team_and_kill: participant.challenges.knockEnemyIntoTeamAndKill,
                    land_skill_shots_early_game: participant.challenges.landSkillShotsEarlyGame,
                    lane_minions_first_10_minutes: participant.challenges.laneMinionsFirst10Minutes,
                    legendary_count: participant.challenges.legendaryCount,
                    lost_an_inhibitor: participant.challenges.lostAnInhibitor,
                    max_kill_deficit: participant.challenges.maxKillDeficit,
                    mejais_full_stack_in_time: participant.challenges.mejaisFullStackInTime,
                    more_enemy_jungle_than_opponent: participant.challenges.moreEnemyJungleThanOpponent,
                    multi_kill_one_spell: participant.challenges.multiKillOneSpell,
                    multi_turret_rift_herald_count: participant.challenges.multiTurretRiftHeraldCount,
                    multikills: participant.challenges.multikills,
                    multikills_after_aggressive_flash: participant.challenges.multikillsAfterAggressiveFlash,
                    outer_turret_executes_before_10_minutes: participant.challenges.outerTurretExecutesBefore10Minutes,
                    outnumbered_kills: participant.challenges.outnumberedKills,
                    outnumbered_nexus_kill: participant.challenges.outnumberedNexusKill,
                    perfect_dragon_souls_taken: participant.challenges.perfectDragonSoulsTaken,
                    perfect_game: participant.challenges.perfectGame,
                    pick_kill_with_ally: participant.challenges.pickKillWithAlly,
                    poro_explosions: participant.challenges.poroExplosions,
                    quick_cleanse: participant.challenges.quickCleanse,
                    quick_first_turret: participant.challenges.quickFirstTurret,
                    quick_solo_kills: participant.challenges.quickSoloKills,
                    rift_herald_takedowns: participant.challenges.riftHeraldTakedowns,
                    save_ally_from_death: participant.challenges.saveAllyFromDeath,
                    scuttle_crab_kills: participant.challenges.scuttleCrabKills,
                    shortest_time_to_ace_from_first_takedown: participant.challenges.shortestTimeToAceFromFirstTakedown,
                    skillshots_dodged: participant.challenges.skillshotsDodged,
                    skillshots_hit: participant.challenges.skillshotsHit,
                    snowballs_hit: participant.challenges.snowballsHit,
                    solo_baron_kills: participant.challenges.soloBaronKills,
                    solo_kills: participant.challenges.soloKills,
                    stealth_wards_placed: participant.challenges.stealthWardsPlaced,
                    survived_single_digit_hp_count: participant.challenges.survivedSingleDigitHpCount,
                    survived_three_immobilizes_in_fight: participant.challenges.survivedThreeImmobilizesInFight,
                    takedown_on_first_turret: participant.challenges.takedownOnFirstTurret,
                    takedowns: participant.challenges.takedowns,
                    takedowns_after_gaining_level_advantage: participant.challenges.takedownsAfterGainingLevelAdvantage,
                    takedowns_before_jungle_minion_spawn: participant.challenges.takedownsBeforeJungleMinionSpawn,
                    takedowns_first_x_minutes: participant.challenges.takedownsFirstXMinutes,
                    takedowns_in_alcove: participant.challenges.takedownsInAlcove,
                    takedowns_in_enemy_fountain: participant.challenges.takedownsInEnemyFountain,
                    team_baron_kills: participant.challenges.teamBaronKills,
                    team_damage_percentage: participant.challenges.teamDamagePercentage,
                    team_elder_dragon_kills: participant.challenges.teamElderDragonKills,
                    team_rift_herald_kills: participant.challenges.teamRiftHeraldKills,
                    took_large_damage_survived: participant.challenges.tookLargeDamageSurvived,
                    turret_plates_taken: participant.challenges.turretPlatesTaken,
                    turret_takedowns: participant.challenges.turretTakedowns,
                    turrets_taken_with_rift_herald: participant.challenges.turretsTakenWithRiftHerald,
                    twenty_minions_in_3_seconds_count: participant.challenges.twentyMinionsIn3SecondsCount,
                    two_wards_one_sweeper_count: participant.challenges.twoWardsOneSweeperCount,
                    unseen_recalls: participant.challenges.unseenRecalls,
                    vision_score_per_minute: participant.challenges.visionScorePerMinute,
                    void_monster_kill: participant.challenges.voidMonsterKill,
                    ward_takedowns: participant.challenges.wardTakedowns,
                    ward_takedowns_before_20m: participant.challenges.wardTakedownsBefore20M,
                    wards_guarded: participant.challenges.wardsGuarded
                }
            })
        }
    }
}

export const getMatches = async (summonerName, tag, numOfMatches) => {
    // convert string to Number and check it's valid
    numOfMatches = Number(numOfMatches)
    if (isNaN(numOfMatches)) {
        throw new Error("Invalid numOfMatches given")
    }
    const puuidData = await getSummonerPuuidFromNameTag(summonerName, tag)
    const puuid = puuidData.puuid

    const participants = await prisma.participant.findMany({
        where: { puuid: puuid },
        select: {
            match_id: true,
        },
        orderBy: {
            match: {
                start: 'desc'
            }
        },
        take: numOfMatches
    });

    if (participants.length === 0) {
        throw new Error(`No matches found in Participant table for ${puuid}`)
    }
    // map down to just match ids
    const matchIds = participants.map(p => p.match_id)

    return matchIds
}