import express from 'express'
import { createMatches, getMatches, getMatchSummary, getMatchDetails } from './matches.service.js'

// convert BigInts to strings so .json() works
BigInt.prototype.toJSON = function() { return this.toString() }

const router = express.Router()

router.post('/createMatches', async (req, res) => {
    console.log(`Got /createMatches POST request`)
    const {summonerName, tag, numOfMatches} = req.body
    try {
        await createMatches(summonerName, tag, numOfMatches)
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
    console.log(`Got /profiles/${req.params.summoner}-${req.params.tag}/matches POST request`)
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

router.get('/match/:match_id/summary', async (req, res) => {
    console.log(`Got /matches/${req.params.match_id}/summary GET request`)
    try {
        const summary = await getMatchSummary(req.params.match_id)
        res.json(summary)
    } catch (e) {
        console.log(e)
        res.json({
            status: 'Failed to get match summary'
        })
    }
})

router.get('/match/:match_id/details', async (req, res) => {
    console.log(`Got /match/${req.params.match_id}/details GET request`)
    try {
        const details = await getMatchDetails(req.params.match_id)
        res.json(details)
    } catch (e) {
        console.log(e)
        res.json({
            status: 'Failed to get match summary'
        })
    }
})

export default router