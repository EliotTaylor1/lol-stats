export default function ProfileMastery({ data }) {
    const masteries = data
    const masteryData = masteries.map(mastery =>
    <li key={mastery.champion_id}>
      <p>Champion: {mastery.champion_id}</p>
      <p>Level: {mastery.champion_level}</p>
      <p>Points: {mastery.champion_points}</p>
      <p>Last played: {new Date(mastery.last_play_time).toLocaleString('en-GB')}</p>
    </li>
  )  
    
    return (
        <div className='ranks'>
          <div>{masteryData}</div>
        </div>
    )
}