import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function MatchSearch() {
    const [matchId, setMatchId] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/match/${matchId}/details`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Match ID"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}