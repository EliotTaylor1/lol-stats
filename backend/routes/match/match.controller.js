import express from 'express'
import {getMatchSummary, getMatchDetails, getMatches} from './matches.service.js'

const router = express.Router();

router.get('/matches', async (req, res) => {
    try {
        const matches = await getMatches()
        res.status(200);
        res.json(matches);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({
            error: 'No matches stored'
        });
    }
});

router.get('/match/:match_id/summary', async (req, res) => {
    try {
        const summary = await getMatchSummary(req.params.match_id);
        res.status(200);
        res.json(summary);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({
            error: 'Match not found'
        });
    }
});

router.get('/match/:match_id/details', async (req, res) => {
    try {
        const details = await getMatchDetails(req.params.match_id);
        res.status(200);
        res.json(details);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({
            error: 'Match not found'
        });
    }
});

export default router