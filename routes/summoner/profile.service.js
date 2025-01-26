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

export const getSummoner = async (summonerName, tag) => {
    const summoner = await prisma.summonerId.findUnique({
        where: {
            summoner_name_summoner_tag: {
                summoner_name: summonerName,
                summoner_tag: tag
            }
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