import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SearchForm.css'

const regions = ['EUW', 'EUNE', 'RU', 'TR', 'ME', 'NA',
                'BR', 'LAS', 'LAN', 'KR', 'JP', 'SG',
                'OCE', 'VN', 'TW',];

export default function SearchForm() {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('EUW');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/profile/${name}-${tag}`);
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
            value={region} 
            onChange={(e) => setRegion(e.target.value)}
            className="regionSelect"
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
        </div>
        <button type="submit" className="searchButton">Search</button>
      </div>
    </form>
  );
}