import express from 'express'
import { RiotAccount } from './profile.model.js'
import { ChampionStats } from './mastery.model.js'
import { createSummoner, getSummoner } from './profile.service.js'

const router = express.Router()

router.post('/createUser', async (req, res) => {
    console.log("Got /createUser POST request")
    const {summonerName, tag, region} = req.body
    try {
        await createSummoner(summonerName, tag, region)
        res.json({
            status:'Summoner added'
        })
    } catch (e) {
        console.log(e)
        res.json({
            status:'Summoner already exists'
        })
    }
})

router.get('/profiles/:summoner-:tag', async (req, res) => {
    console.log(`Got /profiles/${req.params.summoner}/${req.params.tag} GET request`)
    try {
        const summoner = await getSummoner(req.params.summoner, req.params.tag)
        res.json({summoner})
    } catch (e) {
        console.log(e)
        res.json({
            status:'Summoner not found'
        })
    }
})
/*
router.post('/profile/mastery', async (req , res) => {
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
*/
export default router