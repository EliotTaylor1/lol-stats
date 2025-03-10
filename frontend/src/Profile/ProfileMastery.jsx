export default function ProfileMastery({ data }) {
    const masteryData = data.map(mastery =>
        <li key={mastery.champion_id}>
            <p>{mastery.champion_name}</p>
            <p>Level: {mastery.champion_level}</p>
            <p>Points: {mastery.champion_points}</p>
            <p>Last played: {new Date(mastery.last_play_time).toLocaleString('en-GB')}</p>
        </li>
    );

    return (
        <div className='ranks'>
            <div>{masteryData}</div>
        </div>
    );
}