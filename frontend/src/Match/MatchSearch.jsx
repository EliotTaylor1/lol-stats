import MatchSearchForm from './MatchSearchForm.jsx'
import MatchSummaryCard from "./MatchSummaryCard.jsx";
import {useEffect, useState} from "react";

export default function MatchSearch() {
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/matches`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setMatchData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <MatchSearchForm/>
            <ul>
                {matchData.map(match => (
                    <MatchSummaryCard key={match.match_id} matchData={match}/>
                ))}
            </ul>
        </>
    )
}