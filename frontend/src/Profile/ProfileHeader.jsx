import './Profile.css'

export default function ProfileHeader({ name, tag, platform, data }) {
    return (
      <div className="header-container">
        <div className="summoner-details">
          <div className="summoner-name-tag">
            {name}#{tag}
          </div>
          <div className="platform">{platform}</div>
          <div className="last-updated">
            Last Updated: {new Date(data.lastUpdated).toLocaleString()}
          </div>
          <button className="refresh">Refresh</button>
        </div>
      </div>
    );
  }

