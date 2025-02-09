import { PrismaClient } from '@prisma/client'

// region = europe / amercias / asia etc
// platform = euw1 / na1 / kr etc

const prisma = new PrismaClient()

export const fetchPuuidByNameTag = async (summonerName, tag, region) => {
    const key = process.env.RG_API_KEY;
    const accountResponse = await fetch(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`, {
        headers: {
            "X-Riot-Token": key
        }
    })

    if (!accountResponse.ok) {
        throw new Error(`Failed to fetch account details ${accountResponse.status}`)
    }

    const account = await accountResponse.json()
    return account
}

export const fetchNameTagByPuuid = async (puuid, region) => {
    const key = process.env.RG_API_KEY
    const accountResponse = await fetch(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`, {
        headers: {
            "X-Riot-Token": key
        }
    })

    if (!accountResponse.ok) {
        throw new Error(`Failed to fetch Summoner Name and Tag ${accountResponse.status}`)
    }

    const account = await accountResponse.json()
    return account
}

export const fetchSummonerDataByPuuid = async (puuid, platform) => {
    const key = process.env.RG_API_KEY
    const summonerResponse = await fetch(`https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
        headers : {
            "X-Riot-Token": key
        }
    })
    if (!summonerResponse.ok) {
        throw new Error(`Failed to fetch summoner details ${summonerResponse.status}`)
    }

    const summoner = await summonerResponse.json()
    return summoner
}

export const fetchRankBySummonerId = async (summonerId, platform) => {
    const key = process.env.RG_API_KEY
    const rankResponse = await fetch(`https://${platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
        headers: { 
            "X-Riot-Token": key
        }
    })
    if (!rankResponse.ok) {
        throw new Error(`Failed to fetch rank details ${rankResponse.status}`)
    }

    const rankData = await rankResponse.json()
    return rankData
}

export const fetchMasteryByPuuid = async (puuid, platform) => {
    const key = process.env.RG_API_KEY
    const masteriesResponse = await fetch(`https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`, {
        headers: {
            "X-Riot-Token": key
        }
    })
    if (!masteriesResponse.ok) {
        throw new Error(`Failed to fetch mastery data ${masteriesResponse.status} `)
    }

    const masteryData = await masteriesResponse.json()
    return masteryData
}

export const fetchMatchesByPuuid = async (puuid, numOfMatches, region) => {
    const key = process.env.RG_API_KEY
    const matchesResponse = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numOfMatches}`, {
        headers: {
            "X-Riot-Token": key
        }
    })
    if (!matchesResponse.ok) {
        throw new Error(`Failed to fetch list of matches ${matchesResponse.status}`)
    }

    const matchesData = await matchesResponse.json()
    return matchesData
}

export const fetchMatchDetails = async (matchId, region) => {
    const key = process.env.RG_API_KEY
    const matchDetailsResponse = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
        headers: {
            "X-Riot-Token": key
        }
    })
    if (!matchDetailsResponse.ok) {
        throw new Error(`failed to fetch data for ${matchId} - ${matchDetailsResponse.status}`)
    }

    const matchDetailsData = await matchDetailsResponse.json()
    return matchDetailsData
}

export const getSummonerPuuidFromNameTag = async (summonerName, tag) => {
    const puuid = await prisma.summonerId.findUnique({
        where: {
            summoner_name_summoner_tag : {
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

export const getRegionFromPlatform = (platform) => {
    switch (platform) {
        case 'euw1':
        case 'eun1':
        case 'me1':
        case 'tr':
        case 'ru':
            return "europe"
        case 'na1':
        case 'br1':
        case 'la1': //LAN
        case 'la2': //LAS
            return "americas"
        case 'kr':
        case 'jp1':
            return "asia"
        case 'oc1':
        case 'sg2':
        case 'tw2':
        case 'vn2':
            return "sea"
        default:
            throw new Error(`${platform} is not a valid platform`)
    }
}

export const getPlatformFromPuuid = async (puuid) => {
    const platform = await prisma.summonerDetails.findUnique({
        where: {
            puuid: puuid
        },
        select: {
            platform: true
        }
    })
    if (!platform) {
        throw new Error(`Failed to get platform. ${puuid} does not exist in SummonerDetails`)
    }
    return platform
}

export const getRegionFromPuuid = async (puuid) => {
    const region = await prisma.summonerDetails.findUnique({
        where: {
            puuid: puuid
        },
        select: {
            region: true
        }
    })
    if (!region) {
        throw new Error(`Failed to get region. ${puuid} does not exist in SummonerDetails`)
    }
    return region
}