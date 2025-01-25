import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import createSummoner from './routes/summoner.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/summoner', createSummoner)
