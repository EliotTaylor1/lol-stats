import {useEffect, useState} from "react";
import MatchSummaryOverview from "./MatchSummaryOverview.jsx";
import Participants from "./Participants.jsx";
import './MatchSummaryCard.css'

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
        <div className="MatchSummaryCard">
            <MatchSummaryOverview matchData={matchData} />
            <Participants participants={participants} matchId={matchData.match_id} />
        </div>
    )
}