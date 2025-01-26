export class ChampionStats {
    constructor(riotAccount) {
        this.account = riotAccount
        this.champions = []
    }

    async getChampionStats() {
        console.log("Calling RG Champion Mastery Endpoint")
        console.log('Using PUUID:', this.account.puuid);
        const key = process.env.RG_API_KEY
        const response = await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${this.account.puuid}/top?count=5`, {
            headers: {
                "X-Riot-Token": key
            }
        })

        const data = await response.json()  
        this.champions = data.map(champion => ({
            id: champion.championId,
            level: champion.championLevel,
            points: champion.championPoints,
            lastPlayed: new Date(champion.lastPlayTime)
        }))
    }
}