import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileRank from './ProfileRank';
import ProfileMastery from './ProfileMastery';
import MatchSummaryCard from "../Match/MatchSummary/MatchSummaryCard";
import './Profile.css';

function splitNameTag(nameTag) {
    const decodedNameTag = decodeURIComponent(nameTag);
    return decodedNameTag.split('-');
}

export default function Profile() {
    const { platform, nameTag } = useParams();
    const [name, tag] = splitNameTag(nameTag);
    const [activeTab, setActiveTab] = useState('rank');
    const [summonerData, setSummonerData] = useState(null);
    const [masteryData, setMasteryData] = useState(null);
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (url, options = {}) => {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }, []);

    // Main data loading function
    const loadAllData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // create/update all data sources
            await Promise.all([
                fetchData('http://localhost:3000/api/createUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ summonerName: name, tag, platform }),
                }),
                fetchData(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`, {
                    method: 'POST',
                }),
                fetchData(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/matches?numOfMatches=3`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }),
            ]);

            // fetch all data required
            const [summoner, mastery, matches] = await Promise.all([
                fetchData(`http://localhost:3000/api/profile/${platform}/${name}-${tag}`),
                fetchData(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`),
                fetchData(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/matches?numOfMatches=10`),
            ]);

            // set states
            setSummonerData(summoner.summoner);
            setMasteryData(mastery.mastery);
            setMatchData(matches);
        } catch (err) {
            setError(err.message || 'Failed to load profile data');
        } finally {
            setLoading(false);
        }
    }, [platform, name, tag, fetchData]);

    // initial load
    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    const handleRefresh = useCallback(async () => {
        // Clear existing data while refreshing
        setSummonerData(null);
        setMasteryData(null);
        setMatchData(null);
        await loadAllData();
    }, [loadAllData]);

    if (loading) return <div className="loading">Loading... This may take a minute for new profiles</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="profile-container">
            {summonerData && (
                <ProfileHeader
                    name={name}
                    tag={tag}
                    platform={platform}
                    data={summonerData}
                    refreshSummonerData={handleRefresh}
                />
            )}

            <div className="tabs-container">
                {['rank', 'mastery', 'matches'].map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="tab-content-container">
                {activeTab === 'rank' && summonerData?.ranks && <ProfileRank data={summonerData.ranks} />}
                {activeTab === 'mastery' && masteryData && <ProfileMastery data={masteryData} />}
                {activeTab === 'matches' && matchData && (
                    <div className="matches-container">
                        {matchData.map((match) => (
                            <MatchSummaryCard key={match.match_id} matchData={match} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}