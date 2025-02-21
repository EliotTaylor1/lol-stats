import './Profile.css'

export default function ProfileHeader() {
    return (
        <div className="header-container">
            <div className="summoner-image">Image</div>
            <div className="summoner-details"></div>
                <div className="summoner-name-tag">Summoner Name #Tag</div>
                <div className="region">Region</div>
                <div className="last-updated">Last Updated</div>
                <div className="refresh">Refresh</div>
        </div>
    )
}