import {convertQueueIdToQueueName} from "../match.utils.js";
import {Link} from "react-router-dom";
import './MatchSummaryOverview.css'

export default function MatchSummaryOverview({matchData}) {

    return (
        <div className="match-summary-overview">
            <Link to={`/match/${matchData.match_id}/details`} className="match-id" >{matchData.match_id}</Link>
            <p>{new Date(matchData.start).toLocaleString('en-GB')}</p>
            <p>{new Date(matchData.duration * 1000).toISOString().slice(11, 19)}</p>
            <p>{convertQueueIdToQueueName(matchData.queue_id)}</p>
        </div>
    )
}