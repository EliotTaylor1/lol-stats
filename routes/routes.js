import {Router} from 'express'
import profile from './summoner/profile.controller.js'

const api = Router()
    .use(profile)

export default api