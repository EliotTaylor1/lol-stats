import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';

export default function Profile() {
  const { platform, name, tag } = useParams();
  const decodedName = decodeURI(name);
  const decodedTag = decodeURI(tag);
  const [summonerData, setSummonerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Params:", platform, decodedName, decodedTag);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/${platform}/${decodedName}-${decodedTag}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setSummonerData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummonerData();
  }, [platform, decodedName, decodedTag]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ProfileHeader 
        name={decodedName}
        tag={decodedTag}
        platform={platform}
        data={summonerData}
      />
    </div>
  );
}