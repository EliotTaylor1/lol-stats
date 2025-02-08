import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const fetchPuuidByNameTag = async (summonerName, tag) => {
    const key = process.env.RG_API_KEY;
    const accountResponse = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`, {
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

export const fetchNameTagByPuuid = async (puuid) => {
    const key = process.env.RG_API_KEY
    const accountResponse = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}`, {
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

export const fetchSummonerDataByPuuid = async (puuid) => {
    const key = process.env.RG_API_KEY
    const summonerResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
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

export const fetchRankBySummonerId = async (summonerId) => {
    const key = process.env.RG_API_KEY
    const rankResponse = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
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

export const fetchMasteryByPuuid = async (puuid) => {
    const key = process.env.RG_API_KEY
    const masteriesResponse = await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`, {
        headers: {
            "X-Riot-Token": key
        }
    })
    if (!masteriesResponse.ok) {
        throw new Error(`Failed to get mastery data ${masteriesResponse.status} `)
    }

    const masteryData = await masteriesResponse.json()
    return masteryData
}

export const fetchMatchesByPuuid = async (puuid, numOfMatches) => {
    const key = process.env.RG_API_KEY
    const matchesResponse = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numOfMatches}`, {
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

export const fetchMatchDetails = async (matchId) => {
    const key = process.env.RG_API_KEY
    const matchDetailsResponse = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
        headers: {
            "X-Riot-Token": key
        }
    })
    if (!matchDetailsResponse.ok) {
        throw new Error(`failed to get data for ${matchId} - ${matchDetailsResponse.status}`)
    }

    const matchDetailsData = await matchDetailsResponse.json()
    return matchDetailsData
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