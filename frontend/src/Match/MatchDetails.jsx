import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchParticipant } from './MatchParticipants';
import { MatchOverview } from './MatchOverview';
import { MatchStats } from './MatchStats';

import './MatchDetails.css'

export default function MatchDetails() {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/match/${matchId}/details`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMatchData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [matchId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const blueTeam = matchData.participants.filter((p) => p.team_id === 100)
  const redTeam = matchData.participants.filter((p) => p.team_id === 200)

  return (
    <div>
      <MatchOverview matchData={matchData} />
      <div className="teamsContainer">
        <div className="team-row-blue">
          {blueTeam.map(participant => <MatchParticipant key={participant.puuid} participant={participant} />)}
        </div>
        <div className="team-row-red">
          {redTeam.map(participant => <MatchParticipant key={participant.puuid} participant={participant} />)}
        </div>
      </div>
      <MatchStats participants={matchData.participants} />
    </div>
  );
}