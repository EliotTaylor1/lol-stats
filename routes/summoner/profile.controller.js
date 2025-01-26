import express from 'express'
import { RiotAccount } from './profile.model.js'
import { ChampionStats } from './champions.model.js'

const router = express.Router()

router.post('/profile', async (req, res) => {
        console.log("Got summoner post request")
        const {summonerName, tag, region} = req.body
        const account = new RiotAccount(summonerName, tag, region)
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
})

router.post('/profile/champions', async (req , res) => {
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
})

export default router