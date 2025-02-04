import {Router} from 'express'
import profile from './summoner/profile.controller.js'
import match from './match/match.controller.js'

const api = Router()
    .use(profile)
    .use(match)

export default api