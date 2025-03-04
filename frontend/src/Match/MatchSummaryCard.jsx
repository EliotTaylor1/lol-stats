import {convertQueueIdToQueueName} from './match.utils.js'
import {useEffect, useState} from "react";

export default function MatchSummaryCard({matchData}) {
    const [participants, setParticipants] = useState([])

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await fetch(`http://localhost:3000/api/match/${matchData.match_id}/summary`)
            if (!response) throw new Error('Failed to fetch');
            const participants = await response.json()
            setParticipants(participants.participants)
        }
        fetchParticipants()
    }, [])


    return (
        <div className="match-summary-card">
            <p>Match ID: {matchData.match_id}</p>
            <p>Match Start: {new Date(matchData.start).toLocaleString('en-GB')}</p>
            <p>Duration: {matchData.duration}</p>
            <p>Gamemode: {convertQueueIdToQueueName(matchData.queue_id)}</p>
            <ul>
                {participants.map(participant => (
                    <li key={participant.puuid}>{participant.summoner.summoner_name}#{participant.summoner.summoner_tag}</li>
                ))}
            </ul>
        </div>
    )
}