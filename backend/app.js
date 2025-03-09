import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import {PrismaClient} from '@prisma/client'

// initial setup to get latest patch and champions
async function fetchLatestPatch() {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    const patches = await res.json()
    return patches[0] //latest patch is always first in list
}
async function fetchLatestChampions(patch){
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`)
    const champions = await res.json()

    const championArray = [] // create an Array instead of a map so we can insert easier via prisma in next func
    Object.values(champions.data).forEach(champion => {
        const data = {
            champion_id: champion.id,
            champion_key: Number(champion.key),
        }
        championArray.push(data)
    });
    return championArray;
}
async function populateChampionsTable(champions) {
    const prisma = new PrismaClient()
    await prisma.champions.createMany({
        data: champions
    })
}
export const PATCH = await fetchLatestPatch()
const CHAMPIONS_DATA = await fetchLatestChampions(PATCH)
await populateChampionsTable(CHAMPIONS_DATA)
// end of initial setup

// express setup
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Success: API is working')
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});