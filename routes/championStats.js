import express from 'express'
import {getChampionStats} from '../controllers/championStatsController.js'

const router = express.Router()

router.post('/', getChampionStats)

export default router