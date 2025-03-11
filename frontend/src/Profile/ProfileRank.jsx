import './ProfileRank.css'

export default function ProfileRank({ data }) {
    const ranks = data
    const rankData = ranks.map(rank =>
    <div className="rank" key={rank.queue_type}>
      <p>{rank.queue_type}</p>
      <p>{rank.tier} {rank.rank} {rank.points} LP</p>
      <p>Games: {rank.wins + rank.losses}</p>
      <p>W:{rank.wins} / L:{rank.losses} - {( (rank.wins / (rank.wins + rank.losses)) * 100).toFixed(2)}% WR</p>
    </div>
  )  
    
    return (
        <div className='ranks-container'>
          {rankData}
        </div>
    )
}