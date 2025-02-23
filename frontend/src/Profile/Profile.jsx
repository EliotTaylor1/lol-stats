import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileRank from './ProfileRank'
import ProfileMastery from './ProfileMastery'

export default function Profile() {
  const { platform, nameTag } = useParams();
  const [ name, tag ] = splitNameTag(nameTag)
  const [summonerData, setSummonerData] = useState(null);
  const [summonerRankData, setSummonerRankData] = useState(null);
  const [summonerMasteryData, setSummonerMasteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //split out the nameTag we created from the SearchForm.
  function splitNameTag(nameTag) {
    const decodedNameTag = decodeURI(nameTag)
    const split = decodedNameTag.split('-') //This is fine as names can't contain a '-' so we won't incorrectly split
    return split
  }

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const summonerResponse = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}`);
        if (!summonerResponse.ok) throw new Error('Failed to fetch Summoner Data');
        const summonerData = await summonerResponse.json();
        setSummonerData(summonerData.summoner);
        setSummonerRankData(summonerData.summoner.ranks);

        const masteryResponse = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`);
        if (!masteryResponse.ok) throw new Error('Failed to fetch Mastery Data');
        const masteryData = await masteryResponse.json();
        setSummonerMasteryData(masteryData.mastery);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummonerData();
  }, [platform, name, tag]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ProfileHeader 
        name={name}
        tag={tag}
        platform={platform}
        data={summonerData}
      />
      <ProfileRank data={summonerRankData} />
      <ProfileMastery data={summonerMasteryData} />
    </div>
  );
}