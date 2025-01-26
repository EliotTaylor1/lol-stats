import express from 'express'
import { RiotAccount } from './profile.model.js'

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

export default router