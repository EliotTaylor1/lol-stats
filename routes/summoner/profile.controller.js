import express from 'express'
import { createSummoner, getSummoner } from './profile.service.js'
import { createMatches, getMatchesForSummoner } from './matches.service.js'

BigInt.prototype.toJSON = function() { return this.toString() }
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
    console.log(`Got /profiles/${req.params.summoner}-${req.params.tag} GET request`)
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

router.post('/profiles/:summoner-:tag/createMatches', async (req, res) => {
    console.log(`Got /profiles/${req.params.summoner}-${req.params.tag}/createMatches POST request`)
    const {summonerName, tag} = req.body
    try {
        await createMatches(summonerName, tag)
        res.json({
            status: 'matches fetched'
        })
    } catch (e) {
        console.log(e)
        res.json({
            status: 'failed to create matches'
        })
    }
})

router.get('/profiles/:summoner-:tag/matches', async (req, res) => {
    console.log(`Got /profiles/${req.params.summoner}-${req.params.tag}/matches GET request`)
    try {
        const matches = await getMatchesForSummoner(req.params.summoner, req.params.tag, 10)
        res.json(matches)
    } catch (e) {
        console.log(e)
        res.json({
            status: 'Failed to get matches'
        })
    }
})

export default router