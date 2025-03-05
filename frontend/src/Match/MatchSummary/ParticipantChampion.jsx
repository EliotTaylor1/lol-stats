import './ParticipantChampion.css'
import {getChampionPortrait, getPlatformFromMatchId} from "../match.utils.js";
import {Link} from "react-router-dom";

export default function ParticipantChampion({ participant, matchId }) {
    return (
        <div className="participant-champion">
            <img src={getChampionPortrait(participant.champion_name)} className="participant-champion-icon" />
            <Link to={`/profile/${getPlatformFromMatchId(matchId)}/${participant.summoner.summoner_name}-${participant.summoner.summoner_tag}`}>{participant.summoner.summoner_name}</Link>
        </div>
    )
}