import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';

export default function Profile() {
  const { platform, nameTag } = useParams();
  const [ name, tag ] = splitNameTag(nameTag)
  const [summonerData, setSummonerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function splitNameTag(nameTag) {
    const decodedNameTag = decodeURI(nameTag)
    const split = decodedNameTag.split('-')
    return split
  }

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}`);
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
    </div>
  );
}