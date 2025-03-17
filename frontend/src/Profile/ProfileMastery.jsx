import './ProfileMastery.css'

export default function ProfileMastery({ data }) {
    const masteryData = data.map(mastery =>
        <div className="mastery" key={mastery.champion_id}>
            <p>{mastery.champion_name}</p>
            <p>Level: {mastery.champion_level}</p>
            <p>Points: {mastery.champion_points}</p>
            <p>Last played: {new Date(mastery.last_play_time).toLocaleString('en-GB')}</p>
        </div>
    );

    return (
        <div className="mastery-container">
            {masteryData}
        </div>
    );
}