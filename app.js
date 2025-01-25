require('dotenv').config()
const express = require('express')
const cors = require('cors')
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

app.post('/profile', (req, res) => {
    console.log("Got profile post request")
    console.log(req.body)
    const summonerName = req.body.summonerName
    const tag = req.body.tag;
    const region = req.body.region
    res.json({
        status:'received',
        data: req.body
    })
})