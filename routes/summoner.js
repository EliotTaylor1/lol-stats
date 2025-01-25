import express from 'express'
import {createSummoner} from '../controllers/summonerController.js'

const router = express.Router()

router.post('/', createSummoner)

export default router