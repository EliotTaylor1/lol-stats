import express from 'express'
import { createSummoner, getSummoner, getMatches, createMatches, getMasteries, createMasteries } from './profile.service.js'

const router = express.Router()

router.post('/createUser', async (req, res) => {
    const {summonerName, tag, platform} = req.body
    try {
        await createSummoner(summonerName, tag, platform)
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
    try {
        const mastery = await getMasteries(req.params.summoner, req.params.tag)
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
    try {
        await createMasteries(req.params.summoner, req.params.tag)
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