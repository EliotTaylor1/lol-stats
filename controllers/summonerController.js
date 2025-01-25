import { RiotAccount } from "../models/RiotAccount.js"

export const createSummoner = async (req, res) => {
    console.log("Got summoner post request")
    console.log(req.body)
    const account = new RiotAccount(req.body.summonerName, req.body.tag, req.body.region)
    await account.getPuuid()
    await account.getAccountInfo()
    console.log(account)
    res.json({
        status:'received',
        summonerName: account.summonerName,
        tag: account.tag,
        region: account.region,
        level: account.level,
        profileIconId: account.profileIconId,
        puuid: account.puuid,
        summonerId: account.summonerId,
        accountId: account.accountId
    })
}