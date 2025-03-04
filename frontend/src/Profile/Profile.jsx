import {useParams, Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import ProfileHeader from './ProfileHeader';
import ProfileRank from './ProfileRank'
import ProfileMastery from './ProfileMastery'

export default function Profile() {
    const {platform, nameTag} = useParams();
    const [name, tag] = splitNameTag(nameTag)
    const [activeTab, setActiveTab] = useState('rank');
    const [summonerData, setSummonerData] = useState(null);
    const [summonerMasteryData, setSummonerMasteryData] = useState(null);
    const [summonerMatchData, setSummonerMatchData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //split out the nameTag we created from the SearchForm.
    function splitNameTag(nameTag) {
        const decodedNameTag = decodeURI(nameTag)
        return decodedNameTag.split('-') //This is fine as names can't contain a '-' so we won't incorrectly split
    }

    // Fetch header data on mount
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
                setSummonerMasteryData(data.mastery || []);
            } else if (tab === 'matches') {
                response = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/matches?numOfMatches=10`);
                data = await response.json();
                setSummonerMatchData(Array.isArray(data) ? data : []);
            }

            setActiveTab(tab);
        } catch (err) {
            setError(`Failed to fetch ${tab} data.`);
        } finally {
            setLoading(false);
        }
    };


    // Refresh button now resets everything
    const refreshSummonerData = async () => {
        setSummonerData(null);
        setSummonerMasteryData(null);
        setSummonerMatchData(null);
        setActiveTab(null);
        await fetchProfileHeader();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            {/* Profile Header loads immediately */}
            {summonerData && (
                <ProfileHeader
                    name={name}
                    tag={tag}
                    platform={platform}
                    data={summonerData}
                    refreshSummonerData={refreshSummonerData}
                />
            )}

            {/* Tab Navigation */}
            <div className="tabs">
                <button
                    className={activeTab === 'rank' ? 'active' : ''}
                    onClick={() => setActiveTab('rank')} // Fix: No fetch needed
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

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'rank' && summonerData?.ranks && <ProfileRank data={summonerData.ranks} />}
                {activeTab === 'mastery' && summonerMasteryData && <ProfileMastery data={summonerMasteryData} />}
                {activeTab === 'matches' && summonerMatchData && (
                    <ol>
                        {summonerMatchData.map((match) => (
                            <li key={match}>
                                <Link to={`/match/${match}/details`}>{match}</Link>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
}