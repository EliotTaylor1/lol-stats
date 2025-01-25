export class RiotAccount {
    constructor(summonerName, tag, region) {
        this.summonerName = summonerName
        this.tag = tag
        this.region = region
        this.level = null
        this.profileIconId = null
        this.puuid = null
        this.summonerId = null
        this.accountId = null
    }

    async getPuuid() {
        console.log("Calling RG Account API")
        const key = process.env.RG_API_KEY;
        const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${this.summonerName}/${this.tag}`, {
            headers: {
                "X-Riot-Token": key
            }
        })
        const data = await response.json()
        this.puuid = data.puuid
    }

    async getAccountInfo() {
        console.log("Calling RG Summoner Endpoint")
        const key = process.env.RG_API_KEY;
        const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${this.puuid}`, {
            headers : {
                "X-Riot-Token": key
            }
        })
        const data = await response.json()
        this.level = data.summonerLevel
        this.profileIconId = data.profileIconId
        this.summonerId = data.id
        this.accountId = data.accountId
    }
}