import express from 'express'
import { createSummoner, getSummoner, getMatches, createMatches, getMastery, createMastery } from './profile.service.js'

const router = express.Router()

router.post('/createUser', async (req, res) => {
    console.log("Got /createUser POST request")
    const {summonerName, tag} = req.body
    try {
        await createSummoner(summonerName, tag)
        res.status(201)
        res.json({
            status: 'Summoner added'
        })
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({
            error: 'Internal server error'
        })
    }
})

router.get('/profile/:summoner-:tag', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag} GET request`)
    try {
        const summoner = await getSummoner(req.params.summoner, req.params.tag)
        res.status(200)
        res.json({summoner})
    } catch (e) {
        console.log(e)
        res.status(404)
        res.json({
            error: 'Summoner not found'
        })
    }
})

router.get('/profile/:summoner-:tag/mastery', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-:${req.params.tag}/mastery GET request`)
    try {
        const mastery = await getMastery(req.params.summoner, req.params.tag)
        res.status(200)
        res.json({mastery})
    } catch (e) {
        console.log(e)
        res.status(404)
        res.json({
            error: 'Summoner not found'
        })
    }
})

router.post('/profile/:summoner-:tag/mastery', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag}/mastery POST request`)
    try {
        await createMastery(req.params.summoner, req.params.tag)
        res.status(201)
        res.json({
            status: 'Mastery created'
        })
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({
            error: 'Internal server error'
        })
    }
})

router.get('/profile/:summoner-:tag/matches', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag}/matches GET request`)
    try {
        const matches = await getMatches(req.params.summoner, req.params.tag, req.query.numOfMatches || 10)
        res.status(200)
        res.json(matches)
    } catch (e) {
        console.log(e)
        res.status(404)
        res.json({
            error: 'Summoner not found'
        })
    }
})

router.post('/profile/:summoner-:tag/matches', async (req, res) => {
    console.log(`Got /profile/${req.params.summoner}-${req.params.tag}/matches POST request`)
    try {
        await createMatches(req.params.summoner, req.params.tag, req.query.numOfMatches || 10)
        res.status(201)
        res.json({
            status: 'matches created'
        })
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({
            error: 'Internal server error'
        })
    }
})

export default router