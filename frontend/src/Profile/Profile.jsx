import { useParams, Link } from 'react-router-dom';
import {useState} from "react";
import useSummonerData from './hooks/useSummonerData';
import ProfileHeader from './ProfileHeader';
import ProfileRank from './ProfileRank'
import ProfileMastery from './ProfileMastery'

export default function Profile() {
  const { platform, nameTag } = useParams();
    const [activeTab, setActiveTab] = useState('rank');
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

        <div className="tabs">
            <button
                className={activeTab === 'rank' ? 'active' : ''}
                onClick={() => setActiveTab('rank')}
            >
                Rank
            </button>
            <button
                className={activeTab === 'mastery' ? 'active' : ''}
                onClick={() => setActiveTab('mastery')}
            >
                Mastery
            </button>
            <button
                className={activeTab === 'matches' ? 'active' : ''}
                onClick={() => setActiveTab('matches')}
            >
                Matches
            </button>
        </div>

        <div className="tab-content">
            {activeTab === 'rank' && <ProfileRank data={summonerRankData} />}
            {activeTab === 'mastery' && <ProfileMastery data={summonerMasteryData} />}
            {activeTab === 'matches' && (
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