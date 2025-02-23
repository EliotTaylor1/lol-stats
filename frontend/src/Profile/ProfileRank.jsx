export default function ProfileRank({ data }) {
    const ranks = data
    const rankData = ranks.map(rank =>
    <li key={rank.queue_type}>
      <p>Queue: {rank.queue_type}</p>
      <p>Tier: {rank.tier}</p>
      <p>Rank: {rank.rank}</p>
      <p>LP: {rank.points}</p>
      <p>Games: {rank.wins + rank.losses}</p>
      <p>W/L: W:{rank.wins} / L:{rank.losses} - {( (rank.wins / (rank.wins + rank.losses)) * 100).toFixed(2)}% WR</p>
    </li>
  )  
    
    return (
        <div className='ranks'>
          <div>{rankData}</div>
        </div>
    )
}