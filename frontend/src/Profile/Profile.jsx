import { useParams, Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileRank from './ProfileRank'
import ProfileMastery from './ProfileMastery'
import useSummonerData from './hooks/useSummonerData';

export default function Profile() {
  const { platform, nameTag } = useParams();
  const [ name, tag ] = splitNameTag(nameTag)
  const {
    summonerData,
    summonerRankData,
    summonerMasteryData,
      summonerMatchData,
    refreshSummonerData,
      loading,
      error
  } = useSummonerData(platform, name, tag);

  //split out the nameTag we created from the SearchForm.
  function splitNameTag(nameTag) {
    const decodedNameTag = decodeURI(nameTag)
    return decodedNameTag.split('-') //This is fine as names can't contain a '-' so we won't incorrectly split
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ProfileHeader 
        name={name}
        tag={tag}
        platform={platform}
        data={summonerData}
        refreshSummonerData={refreshSummonerData}
      />
      <ProfileRank data={summonerRankData} />
      <ProfileMastery data={summonerMasteryData} />
      <ol>
        {summonerMatchData.map(match =>
        <li key={match}>
            <Link to={`/match/${match}/details`}>{match}</Link>
        </li>
      )}
      </ol>
    </div>
  );
}