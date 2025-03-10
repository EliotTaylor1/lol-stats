import {assignPositionId} from "./match.utils.js";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getMatches = async () => {
    const matches = await prisma.match.findMany({
        orderBy: {
            start: 'desc'
        }
    })
    if (!matches) {
        throw new Error('No matches found')
    }
    return matches
}

export const getMatchSummary = async (match_id) => {
    const match = await prisma.match.findUnique({
        where: {match_id: match_id},
        select: {
            start: true,
            duration: true,
            gamemode: true,
            queue_id: true,
            participants: {
                select: {
                    team_id: true,
                    win: true,
                    champion_id: true,
                    champion_name: true,
                    team_position: true,
                    puuid: true,
                    summoner: {
                        select: {
                            summoner_name: true,
                            summoner_tag: true
                        }
                    },
                    performance: {
                        select: {
                            kills: true,
                            deaths: true,
                            assists: true,
                            champion_level: true,
                            total_damage_to_champions: true,
                            total_minions_killed: true,
                            vision_score: true,
                            wards_killed: true,
                            stealth_wards_placed: true,
                            vision_wards_placed: true
                        }
                    },
                    build: {
                        select: {
                            item_0: true,
                            item_1: true,
                            item_2: true,
                            item_3: true,
                            item_4: true,
                            item_5: true,
                            item_6: true,
                            summoner_1_id: true,
                            summoner_2_id: true
                        }
                    }
                }
            }
        }
    });
    if (!match) {
        throw new Error(`${match_id} does not exist in Match table`)
    }
    // assigns an ID based on the position the pariticpant played so we can order them in front end
    for (const participant of match.participants) {
        if (participant.team_position === "") { //some modes have no positions and therefore set pos to: ""
            continue;
        }
        const positionId = assignPositionId(participant.team_position)
        participant.position_id = positionId
    }
    return match;
};

export const getMatchDetails = async (match_id) => {
    const match = await prisma.match.findUnique({
        where: {match_id: match_id},
        omit: {
            created_at: true
        },
        include: {
            participants: {
                omit: {match_id: true},
                include: {
                    summoner: {
                        select: {
                            summoner_name: true,
                            summoner_tag: true
                        }
                    },
                    performance: {
                        omit: {
                            match_id: true,
                            puuid: true
                        }
                    },
                    build: {
                        omit: {
                            match_id: true,
                            puuid: true
                        }
                    },
                    pings: {
                        omit: {
                            match_id: true,
                            puuid: true
                        }
                    },
                    casts: {
                        omit: {
                            match_id: true,
                            puuid: true
                        }
                    },
                    challenges: {
                        omit: {
                            match_id: true,
                            puuid: true
                        }
                    }
                }
            }
        }
    });
    if (!match) {
        throw new Error(`${match_id} does not exist in Match table`)
    }
    // assigns an ID based on the position the pariticpant played so we can order them in front end
    for (const participant of match.participants) {
        if (participant.team_position === "") { //some modes have no positions and therefore set pos to: ""
            continue;
        }
        const positionId = assignPositionId(participant.team_position)
        participant.position_id = positionId
    }
    return match;
};