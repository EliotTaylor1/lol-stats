import {useParams, Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import ProfileHeader from './ProfileHeader';
import ProfileRank from './ProfileRank'
import ProfileMastery from './ProfileMastery'
import MatchSummaryCard from "../Match/MatchSummary/MatchSummaryCard.jsx";
import './Profile.css'

export default function Profile() {
    const {platform, nameTag} = useParams();
    const [name, tag] = splitNameTag(nameTag)
    const [activeTab, setActiveTab] = useState('rank');
    const [summonerData, setSummonerData] = useState(null);
    const [summonerMasteryData, setSummonerMasteryData] = useState(null);
    const [summonerMatchData, setSummonerMatchData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //split out the nameTag we created from the ProfileSearchForm.
    function splitNameTag(nameTag) {
        const decodedNameTag = decodeURI(nameTag)
        return decodedNameTag.split('-') //This is fine as names can't contain a '-' so we won't incorrectly split
    }

    // Fetch header data on load
    const fetchProfileHeader = async () => {
        try {
            setLoading(true);
            await fetch('http://localhost:3000/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summonerName: name,
                    tag: tag,
                    platform: platform,
                })
            })
            const response = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}`);
            const data = await response.json();
            setSummonerData(data.summoner);
        } catch (err) {
            setError('Failed to fetch summoner data.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMatches = async () => {
        try {
            setLoading(true);
            await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/matches?numOfMatches=3`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const response = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/matches?numOfMatches=10`);
            const data = await response.json();
            setSummonerMatchData(data);
        } catch (err) {
            setError('Failed to fetch matches.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileHeader();
    }, [platform, name, tag]);

    const fetchTabData = async (tab) => {
        if ((tab === 'mastery' && summonerMasteryData) ||
            (tab === 'matches' && summonerMatchData)) {
            setActiveTab(tab);
            return;
        }

        try {
            setLoading(true);
            let response, data;

            if (tab === 'mastery') {
                response = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`);
                data = await response.json();
                setSummonerMasteryData(data.mastery);
            } else if (tab === 'matches') {
                await fetchMatches();
            }
            setActiveTab(tab);
        } catch (err) {
            setError(`Failed to fetch ${tab} data.`);
        } finally {
            setLoading(false);
        }
    };


    const refreshSummonerData = async () => {
        setSummonerData(null);
        setSummonerMasteryData(null);
        setSummonerMatchData(null);
        setActiveTab(null);
        await fetchProfileHeader();
        await fetchMatches();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="profile-container">
            {summonerData && (
                <ProfileHeader
                    name={name}
                    tag={tag}
                    platform={platform}
                    data={summonerData}
                    refreshSummonerData={refreshSummonerData}
                />
            )}

            <div className="tabs-container">
                <button
                    className={activeTab === 'rank' ? 'active' : ''}
                    onClick={() => setActiveTab('rank')}
                >
                    Rank
                </button>
                <button
                    className={activeTab === 'mastery' ? 'active' : ''}
                    onClick={() => fetchTabData('mastery')}
                >
                    Mastery
                </button>
                <button
                    className={activeTab === 'matches' ? 'active' : ''}
                    onClick={() => fetchTabData('matches')}
                >
                    Matches
                </button>
            </div>

            <div className="tab-content-container">
                {activeTab === 'rank' && summonerData?.ranks && <ProfileRank data={summonerData.ranks} />}
                {activeTab === 'mastery' && summonerMasteryData && <ProfileMastery data={summonerMasteryData} />}
                {activeTab === 'matches' && summonerMatchData && (
                    <div className="matches-container">
                        {summonerMatchData.map((match) => (
                            <MatchSummaryCard key={match.match_id} matchData={match}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}