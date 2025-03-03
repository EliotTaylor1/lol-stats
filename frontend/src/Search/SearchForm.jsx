import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SearchForm.css'

const platforms = ['euw1', 'eun1', 'ru', 'tr', 'me1', 'na1',
                'br1', 'la2', 'la1', 'kr', 'jp1', 'sg2',
                'oc1', 'vn2', 'tw2',];

export default function SearchForm() {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [platform, setPlatform] = useState('euw1');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      summonerName: name,
      tag: tag,
      platform: platform,
    }
    await fetch('http://localhost:3000/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/mastery`, {
      method: 'POST',
    })
    await fetch(`http://localhost:3000/api/profile/${platform}/${name}-${tag}/matches?numOfMatches=3`)
    // so the url looks like /:platform/:name-:tag instead of /:platform/:name/:tag
    const nameTag = encodeURIComponent(`${name}-${tag}`)
    navigate(`/profile/${platform}/${(nameTag)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="searchContainer">
      <div className="inputGroup">
        <div className="nameInputs">
          <input
            type="text"
            placeholder="Summoner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="nameInput"
          />
          <span className="hashtag">#</span>
          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="tagInput"
          />
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            className="platformSelect"
          >
            {platforms.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
        </div>
        <button type="submit" className="searchButton">View Summoner</button>
      </div>
    </form>
  );
}