import express from 'express'
import { createSummoner, getSummoner, getMatches, createMatches } from './profile.service.js'

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

router.get('/profile/:summoner-:tag', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag} GET request`)
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

router.get('/profile/:summoner-:tag/matches', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag}/matches GET request`)
    try {
        const matches = await getMatches(req.params.summoner, req.params.tag, req.query.numOfMatches || 10)
        res.json(matches)
    } catch (e) {
        console.log(e)
        res.json({
            status: 'Failed to get matches'
        })
    }
})

router.post('/profile/:summoner-:tag/matches', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag}/matches POST request`)
    try {
        await createMatches(req.params.summoner, req.params.tag, req.query.numOfMatches || 10)
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

export default router