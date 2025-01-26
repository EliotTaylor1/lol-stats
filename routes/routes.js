import {Router} from 'express'
import createSummoner from './summoner/profile.controller.js'
import getChampionStats from './summoner/champions.controller.js'

const api = Router()
    .use(getChampionStats)
    .use(createSummoner)

export default Router().use('/api', api)