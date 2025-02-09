import {Router} from 'express'
import morgan from 'morgan'
import profile from './summoner/profile.controller.js'
import match from './match/match.controller.js'

const api = Router()
    .use(morgan('dev'))
    .use(profile)
    .use(match)

export default api