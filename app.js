import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Success: API is working')
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})