import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createSummoner = async (summonerName, region, tag) => {
    const key = process.env.RG_API_KEY;
    const accountsResponse = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`, {
        headers: {
            "X-Riot-Token": key
        }
    })
    const accountsData = await accountsResponse.json()

    const existingRecord = await prisma.summonerId.findUnique({
        where: {
            puuid: accountsData.puuid
        }
    })

    if (existingRecord) {
        throw new Error("Summoner already exists")
    }

    const summonersResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountsData.puuid}`, {
        headers : {
            "X-Riot-Token": key
        }
    })
    const summonersData = await summonersResponse.json()

    await prisma.summonerId.create({
        data : {
            puuid: accountsData.puuid,
            summoner_Id: summonersData.id,
            account_Id: summonersData.accountId,
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
    const accountData = await accountResponse.json()

    const summonerResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
        headers: { 
            "X-Riot-Token": process.env.RG_API_KEY 
        }
    })
    const summonerData = await summonerResponse.json()

    await prisma.summonerId.create({
        data: {
            puuid: puuid,
            summoner_name: accountData.gameName,
            summoner_tag: accountData.tagLine,
            summoner_Id: summonerData.id,
            account_Id: summonerData.accountId
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
    if (puuid) {
        return puuid
    } else {
        throw new Error("puuid not found")
    }
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

    if (summoner === null) {
        throw new Error("Summoner not found")
    }
    return {
        ...summoner,
        ...summoner.details,
        details: undefined
    }
}