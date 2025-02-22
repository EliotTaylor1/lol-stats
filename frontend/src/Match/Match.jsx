import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Match() {
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

  const participants = matchData.participants
  const participantData = participants.map(participant => 
    <li key={participant.puuid}>
        <p>PUUID: {participant.puuid}</p>
        <p>Name: {participant.summoner.summoner_name} #{participant.summoner.summoner_tag}</p>
        <p>Team ID: {participant.team_id}</p>
        <p>Win: {participant.win.toString()}</p>
        <p>Time Played: {new Date(participant.time_played * 1000).toISOString().slice(11, 19)} - {(participant.time_played / matchData.duration) *100}%</p>
        <p>Champion: {participant.champion_id}</p>
        <p>Level: {participant.performance.champion_level}</p>
        <p>K/D/A: {participant.performance.kills}/{participant.performance.deaths}/{participant.performance.assists}</p>
        <p>Total Damage to Champions: {participant.performance.total_damage_to_champions}</p>
        <p>Largest Multi-kill: {participant.performance.largest_multi_kill}</p>
        <p>Gold Earned: {participant.performance.gold_earned}</p>
    </li>
  )

  return (
    <div>
        <p>Match ID: {matchData.match_id}</p>
        <p>Game Version: {matchData.game_version}</p>
        <p>Gamemode: {matchData.gamemode}</p>
        <p>Match Start: {new Date(matchData.start).toLocaleString('en-GB')}</p>
        <p>Match End: {new Date(matchData.end).toLocaleString('en-GB')}</p>
        <p>Match Duration: {new Date(matchData.duration * 1000).toISOString().slice(11, 19)}</p>
        <ul>{participantData}</ul>
    </div>
  );
}