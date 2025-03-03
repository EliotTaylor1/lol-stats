import { useState, useEffect } from 'react';

export default function useSummonerData(platform, name, tag) {
    const [summonerData, setSummonerData] = useState(null);
    const [summonerRankData, setSummonerRankData] = useState(null);
    const [summonerMasteryData, setSummonerMasteryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSummonerData = async () => {
        try {
            setLoading(true);

            const summonerResponse = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}`);
            if (!summonerResponse.ok) throw new Error('Failed to fetch Summoner Data');
            const summonerData = await summonerResponse.json();

            const masteryResponse = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`);
            if (!masteryResponse.ok) throw new Error('Failed to fetch Mastery Data');
            const masteryData = await masteryResponse.json();

            setSummonerData(summonerData.summoner);
            setSummonerRankData(summonerData.summoner.ranks);
            setSummonerMasteryData(masteryData.mastery);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshSummonerData = async () => {
        try {
            const profileData = { summonerName: name, tag, platform };

            // Upsert user data to refresh from Riot API
            const updateProfileRes = await fetch('http://localhost:3000/api/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });
            if (!updateProfileRes.ok) throw new Error('Failed to refresh Summoner Data');

            await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`, {
                method: 'POST',
            });

            // Re-fetch the updated data
            await fetchSummonerData();
        } catch (error) {
            console.error('Error refreshing summoner:', error);
        }
    };

    useEffect(() => {
        fetchSummonerData();
    }, [platform, name, tag]);

    return { summonerData, summonerRankData, summonerMasteryData, loading, error, refreshSummonerData };
}
