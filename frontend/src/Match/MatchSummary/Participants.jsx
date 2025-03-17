import './Participants.css'

import ParticipantChampion from './ParticipantChampion.jsx'

export default function Participants({participants, matchId}) {
    const blueTeam = participants.filter(participant => participant.team_id === 100)
    blueTeam.sort((a, b) => a.position_id - b.position_id)
    const redTeam = participants.filter(participant => participant.team_id === 200)
    redTeam.sort((a, b) => a.position_id - b.position_id)

    return (
        <div className="participants-container">
            <div className="red">
                {redTeam.map((participant) => (
                    <ParticipantChampion key={participant.puuid} participant={participant} matchId={matchId} />
                ))
                }
            </div>
            <div className="blue">
                {blueTeam.map((participant) => (
                    <ParticipantChampion key={participant.puuid} participant={participant} matchId={matchId} />
                ))
                }
            </div>
        </div>
    )
}