import './Participants.css'

import ParticipantChampion from './ParticipantChampion.jsx'

export default function Participants({participants, matchId}) {
    const redTeam = participants.filter(participant =>
        participant.team_id === 200
    )
    const blueTeam = participants.filter(participant =>
        participant.team_id === 100
    )

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