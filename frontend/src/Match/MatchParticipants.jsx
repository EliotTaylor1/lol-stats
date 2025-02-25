import './MatchParticipant.css'

export function MatchParticipant({ participant }) {
    return (
        <div className="participant-card">
            <p>{participant.individual_position}</p>
            <p>{participant.summoner.summoner_name} #{participant.summoner.summoner_tag}</p>
            <p>{participant.champion_id}</p>
            <p>{participant.performance.champion_level}</p>
            <p>K/D/A: {participant.performance.kills}/{participant.performance.deaths}/{participant.performance.assists}</p>
            <p>Largest Multi-kill: {participant.performance.largest_multi_kill}</p>
            <p>Gold Earned: {participant.performance.gold_earned}</p>
            <p>{participant.build.item_0}</p>
            <p>{participant.build.item_1}</p>
            <p>{participant.build.item_2}</p>
            <p>{participant.build.item_3}</p>
            <p>{participant.build.item_4}</p>
            <p>{participant.build.item_5}</p>
            <p>{participant.build.item_6}</p>
            <p>{participant.build.summoner_1_id}</p>
            <p>{participant.build.summoner_2_id}</p>
            <p>{participant.build.stealth_wards_bought}</p>
            <p>{participant.build.vision_wards_bought}</p>
        </div>
    )
}