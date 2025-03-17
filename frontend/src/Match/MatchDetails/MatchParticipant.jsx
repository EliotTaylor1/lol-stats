import './MatchParticipant.css'
import {getChampionPortrait, getItemImageString, getSummonerSpellImageFromId} from "../match.utils.js";

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