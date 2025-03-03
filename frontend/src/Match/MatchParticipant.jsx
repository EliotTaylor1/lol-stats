import './MatchParticipant.css'
const PATCH = import.meta.env.VITE_PATCH;

function getItemImageString(itemId) {
    return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/item/${itemId}.png`
} 

function getChampionPortrait(championName) {
    return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/champion/${championName}.png`
}

function getSummonerSpellImageFromId(summonerSpellId) {
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

export function MatchParticipant({ participant }) {
    // the build object contains more than just the 6 items a player builds
    // this array makes it easier to iterate over just the 6 items we want to display
    const itemKeys = ["item_0", "item_1", "item_2", "item_3", "item_4", "item_5"];

    return (
        <div className="participant-card">
            <p>{participant.team_position}</p>
            <p>{participant.summoner.summoner_name} #{participant.summoner.summoner_tag}</p>
            <img className='champion' src={getChampionPortrait(participant.champion_name)} alt={participant.champion_name}></img>
            <p>Level: {participant.performance.champion_level}</p>
            <p>K/D/A: {participant.performance.kills}/{participant.performance.deaths}/{participant.performance.assists}</p>
            <p>Largest Multi-kill: {participant.performance.largest_multi_kill}</p>
            <p>Gold: {participant.performance.gold_earned}</p>

            <div className='build-icons-container'>
                {itemKeys.map((key, index) => 
                    participant.build[key] !== 0 && <img key={index} src={getItemImageString(participant.build[key])} />
                )}
            </div>

            <div className='summoner-spell-trinket-container'>
                <img className='trinket' src={getItemImageString(participant.build.item_6)}></img>
                <img className='summoner-spell' src={getSummonerSpellImageFromId(participant.build.summoner_1_id)}></img>
                <img className='summoner-spell' src={getSummonerSpellImageFromId(participant.build.summoner_2_id)}></img>
            </div>
            <p>Vision Wards:{participant.build.vision_wards_bought}</p>
        </div>
    )
}