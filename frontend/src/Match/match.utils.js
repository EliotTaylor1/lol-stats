const PATCH = import.meta.env.VITE_PATCH;

export function convertQueueIdToQueueName(queueId) {
    switch(queueId)
    {
        case 0:
            return "Custom"
        case 400:
            return "Summoners Rift: Normal Draft"
        case 420:
            return "Summoners Rift: Solo Queue"
        case 430:
            return "Summoners Rift: Normal Blind Pick"
        case 440:
            return "Summoners Rift: Flex Queue"
        case 450:
            return "Howling Abyss: ARAM"
        case 490:
            return "Summoners Rift: Normal Quickplay"
        case 700:
            return "Summoners Rift: Clash"
        case 720:
            return "Howling Abyss: ARAM Clash"
        case 900:
            return "Summoners Rift: ARURF"
        case 1700:
            return "Arena"
        default:
            return "Unknown queue"
    }
}

export function getChampionPortrait(championName) {
    return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/champion/${championName}.png`
}

export function getItemImageString(itemId) {
    return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/item/${itemId}.png`
}

export function getSummonerSpellImageFromId(summonerSpellId) {
    switch (summonerSpellId) {
        case 1:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerBoost.png`
        case 3:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerExhaust.png`
        case 4:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerFlash.png`
        case 6:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerHaste.png`
        case 7:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerHeal.png`
        case 11:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerSmite.png`
        case 12:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerTeleport.png`
        case 13:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerMana.png`
        case 14:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerDot.png`
        case 21:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerBarrier.png`
        case 32:
            return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/spell/SummonerSnowball.png`
    }
}

export function getPlatformFromMatchId(matchId) {
    return matchId.split('_')[0].toLowerCase()
}