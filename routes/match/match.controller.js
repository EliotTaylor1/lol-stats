import express from 'express'
import { getMatchSummary, getMatchDetails } from './matches.service.js'

// convert BigInts to strings so .json() works
BigInt.prototype.toJSON = function() { return this.toString() }

const router = express.Router()

router.get('/match/:match_id/summary', async (req, res) => {
    console.log(`Got /matches/${req.params.match_id}/summary GET request`)
    try {
        const summary = await getMatchSummary(req.params.match_id)
        res.status(200)
        res.json(summary)
    } catch (e) {
        console.log(e)
        res.status(404)
        res.json({
            error: 'Match not found'
        })
    }
})

router.get('/match/:match_id/details', async (req, res) => {
    console.log(`Got /match/${req.params.match_id}/details GET request`)
    try {
        const details = await getMatchDetails(req.params.match_id)
        res.status(200)
        res.json(details)
    } catch (e) {
        console.log(e)
        res.status(404)
        res.json({
            error: 'Match not found'
        })
    }
})

export default router