import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './ProfileSearchForm.css'

const platforms = ['euw1', 'eun1', 'ru', 'tr', 'me1', 'na1',
    'br1', 'la2', 'la1', 'kr', 'jp1', 'sg2',
    'oc1', 'vn2', 'tw2',];

export default function ProfileSearchForm() {
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
        // so the url looks like /:platform/:name-:tag instead of /:platform/:name/:tag
        const nameTag = encodeURIComponent(`${name}-${tag}`)
        navigate(`/profile/${platform}/${(nameTag)}`);
    };

    return (
        <div className="profile-search-container">
            <form onSubmit={handleSubmit} className="form-container">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Summoner Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input"
                    />
                    <span className="hashtag">#</span>
                    <input
                        type="text"
                        placeholder="Tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="tag-input"
                    />
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="platform-select"
                    >
                        {platforms.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <button type="submit" className="search">View Summoner</button>
                </div>
            </form>
        </div>
    );
}