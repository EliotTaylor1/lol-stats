import './Profile.css'
const PATCH = import.meta.env.VITE_PATCH;

function getProfileIcon(profileIconId) {
    console.log(PATCH)
    return `https://ddragon.leagueoflegends.com/cdn/${PATCH}/img/profileicon/${profileIconId}.png`
}

export default function ProfileHeader({ name, tag, platform, data, refreshSummonerData }) {
    return (
        <div className="header-container">
            <div className="summoner-details">
                <img src={getProfileIcon((data.summoner_profile_icon))}/>
                <div className="summoner-name-tag">{name} #{tag}</div>
                <div className="summoner-level">Level: {data.summoner_level}</div>
                <div className="platform">{platform} / {data.region}</div>
                <div className='added'>Summoner Added: {new Date(data.created_at).toLocaleString('en-GB')}</div>
                <div className="last-updated">Last Updated: {new Date(data.updated_at).toLocaleString('en-GB')}</div>
                <button className="refresh" onClick={refreshSummonerData}>Refresh</button>
            </div>
        </div>
    );
}
