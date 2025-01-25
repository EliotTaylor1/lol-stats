import { ChampionStats } from "../models/ChampionStats.js";
import { RiotAccount } from "../models/RiotAccount.js";

export const getChampionStats = async (req , res) => {
    console.log("Got Champions POST request")
    const {summonerName, tag, region} = req.body

    const account = new RiotAccount(summonerName, tag, region)
    await account.getPuuid();
    await account.getAccountInfo();

    const championStats = new ChampionStats(account)
    await championStats.getChampionStats()

    res.json({
        status: 'success',
        data: {
            summoner: account.summonerName,
            tag: account.tag,
            region: account.region,
            champions: championStats.champions
        }
    })
}