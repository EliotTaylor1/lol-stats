import express from 'express'
import { createSummoner, getSummoner, getMatches, createMatches, getMasteries, createMasteries } from './profile.service.js'

const router = express.Router();

router.post('/createUser', async (req, res) => {
    const {platform, summonerName, tag} = req.body;
    try {
        await createSummoner(platform, summonerName, tag);
        res.status(201);
        res.json({
            status: 'Summoner added'
        });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            error: 'Internal server error'
        });
    }
});

router.get('/profile/:platform/:summoner-:tag', async (req, res) => {
    try {
        const summoner = await getSummoner(req.params.platform, req.params.summoner, req.params.tag);
        res.status(200);
        res.json({summoner});
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({
            error: 'Summoner not found'
        });
    }
});

router.get('/profile/:platform/:summoner-:tag/mastery', async (req, res) => {
    try {
        const mastery = await getMasteries(req.params.platform, req.params.summoner, req.params.tag);
        res.status(200);
        res.json({mastery});
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({
            error: 'Summoner not found'
        });
    }
});

router.post('/profile/:platform/:summoner-:tag/mastery', async (req, res) => {
    try {
        await createMasteries(req.params.platform, req.params.summoner, req.params.tag);
        res.status(201);
        res.json({
            status: 'Mastery created'
        });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            error: 'Internal server error'
        });
    }
});

router.get('/profile/:platform/:summoner-:tag/matches', async (req, res) => {
    try {
        const matches = await getMatches(req.params.platform, req.params.summoner, req.params.tag, req.query.numOfMatches || 10);
        res.status(200);
        res.json(matches);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({
            error: 'Summoner not found'
        });
    }
});

router.post('/profile/:platform/:summoner-:tag/matches', async (req, res) => {
    try {
        await createMatches(req.params.platform, req.params.summoner, req.params.tag, req.query.numOfMatches || 10);
        res.status(201);
        res.json({
            status: 'matches created'
        })
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            error: 'Internal server error'
        });
    }
});

export default router