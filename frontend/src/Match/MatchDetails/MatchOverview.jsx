import { convertQueueIdToQueueName } from '../match.utils.js'
import './MatchOverview.css'

export function MatchOverview({ matchData }) {
    return (
        <div>
            <p>Match ID: {matchData.match_id}</p>
            <p>Game Version: {matchData.game_version}</p>
            <p>Gamemode: {convertQueueIdToQueueName(matchData.queue_id)}</p>
            <p>Match Start: {new Date(matchData.start).toLocaleString('en-GB')}</p>
            <p>Match End: {new Date(matchData.end).toLocaleString('en-GB')}</p>
            <p>Match Duration: {new Date(matchData.duration * 1000).toISOString().slice(11, 19)}</p>
            <p>Winning team: {matchData.winning_team}</p>
        </div>
    )
}