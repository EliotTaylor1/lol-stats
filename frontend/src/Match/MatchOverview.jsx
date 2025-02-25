import './MatchOverview.css'

export function MatchOverview({ matchData }) {
    const convertQueueIdToQueueName = () => {
        switch(matchData.queue_id)
        {
            case 0:
                return "Custom"
            case 400:
                return "Summoners Rift: Normal Draft"
            case 420:
                return "Summoners Rift: Solo Queue"
            case 430:
                return "Summoners Rift: Normal Blind Pick"
            case 440:
                return "Summoners Rift: Flex Queue"
            case 450:
                return "Howling Abyss: ARAM"
            case 490:
                return "Summoners Rift: Normal Quickplay"
            case 700:
                return "Summoners Rift: Clash"
            case 720:
                return "Howling Abyss: ARAM Clash"
            case 900:
                return "Summoners Rift: ARURF"
            default:
                return "Unknown queue"
        }
    }

    return (
        <div>
            <p>Match ID: {matchData.match_id}</p>
            <p>Game Version: {matchData.game_version}</p>
            <p>Gamemode: {convertQueueIdToQueueName(matchData.queue_id)}</p>
            <p>Match Start: {new Date(matchData.start).toLocaleString('en-GB')}</p>
            <p>Match End: {new Date(matchData.end).toLocaleString('en-GB')}</p>
            <p>Match Duration: {new Date(matchData.duration * 1000).toISOString().slice(11, 19)}</p>
        </div>
    )
}