import './Profile.css'
import { useState} from "react";

function getProfileIcon(profileIconId) {
    return `https://ddragon.leagueoflegends.com/cdn/15.4.1/img/profileicon/${profileIconId}.png`
}

export default function ProfileHeader({ name, tag, platform, data }) {
    const [refreshedData, setRefreshedData] = useState(data);

    const refreshSummoner = async () => {
        const profileData = {
            summonerName: name,
            tag: tag,
            platform: platform,
        };

        try {
            // createUser is an upsert, so this gets the latest data from Riot API and puts into DB
            const profileReq = await fetch('http://localhost:3000/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (!profileReq.ok) {
                throw new Error('Failed to fetch updated data');
            }
            // DB record has now been refreshed so we can call GET summoner endpoint again for new data
            const summonerReq = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}`)
            const summonerRes = await summonerReq.json();
            setRefreshedData(summonerRes.summoner);
        } catch (error) {
            console.error("Error refreshing summoner:", error);
        }
    };

    return (
        <div className="header-container">
            <div className="summoner-details">
                <img src={getProfileIcon((refreshedData.summoner_profile_icon))}/>
                <div className="summoner-name-tag">{name} #{tag}</div>
                <div className="summoner-level">Level: {refreshedData.summoner_level}</div>
                <div className="platform">{platform} / {refreshedData.region}</div>
                <div className='added'>Summoner Added: {new Date(refreshedData.created_at).toLocaleString('en-GB')}</div>
                <div className="last-updated">Last Updated: {new Date(refreshedData.updated_at).toLocaleString('en-GB')}</div>
                <button className="refresh" onClick={refreshSummoner}>Refresh</button>
            </div>
        </div>
    );
}
