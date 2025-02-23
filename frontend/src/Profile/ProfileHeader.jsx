import './Profile.css'

export default function ProfileHeader({ name, tag, platform, data }) {
  return (
      <div className="header-container">
        <div className="summoner-details">
          <div className="summoner-name-tag">{name} #{tag}</div>
          <div className="summoner-level">Level: {data.summoner_level}</div>
          <div className="platform">{platform} / {data.region}</div>
          <div className='added'>Summoner Added: {new Date(data.created_at).toLocaleString('en-GB')}</div>
          <div className="last-updated">Last Updated: {new Date(data.updated_at).toLocaleString('en-GB')}</div>
          <button className="refresh">Refresh</button>
        </div>
      </div>
    );
  }

