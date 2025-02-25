import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// split the 'option' string into an array for each level of nesting within the participant object
// iterate through the new array to drill into nested objects within the participant object to get the final value requested
// each iteration 'builds' up the 'acc' 
// iteration 1. acc = participant, key = performance
// iteration 2. acc = participant.performance, key = gold_earned
const getNestedValue = (participant, option) => {
    return option.split('.').reduce((acc, key) => (acc[key]), participant);
};

export function MatchStats({ participants }) {
    const [option, setOption] = useState('Gold Earned');
    const [chartData, setChartData] = useState([]);

    const options = {
        'Gold Earned': 'performance.gold_earned',
        'Gold Spent': 'performance.gold_spent',
        'Gold Per Minute': 'challenges.gold_per_minute',
        'Kills': 'performance.kills',
        'Deaths': 'performance.deaths',
        'Assists': 'performance.assists',
        'Kills Near Enemy Turret': 'challenges.kills_near_enemy_turret',
        'Kills Under Own Turret' : 'challenges.kills_under_own_turret',
        'Total Damage Dealt': 'performance.total_damage',
        'Total Damage To Champions Dealt': 'performance.total_damage_to_champions',
        'Magic Damage To Champions Dealt': 'performance.magic_damage_to_champions',
        'Physical Damage To Champions Dealt': 'performance.physical_damage_to_champions',
        'Damage Per Minute': 'challenges.damage_per_minute',
        'Largest Critical Strike': 'performance.largest_critical_strike',
        'Largest Killing Spree': 'performance.largest_killing_spree',
        'Largest Multi kill': 'performance.largest_multi_kill',
        'Solo kills': 'challenges.solo_kills',
        'Longest Time Spent Living': 'performance.longest_time_living',
        'Total Time Spend Dead': 'performance.total_time_spent_dead',
        'Total Time CCing Others': 'performance.time_ccing_others',
        'Total Time CC Dealt': 'performance.time_cc_dealt',
        'Skillshots Dodged': 'challenges.skillshots_dodged',
        'Skillshots Hit': 'challenges.skillshots_hit',
        'Total Minion Kills': 'performance.total_minions_killed',
        'Turrets Killed': 'performance.turret_kills',
        'Turret Takedowns': 'performance.turret_takedowns',
        'Turret Plates': 'challenges.turret_plates_taken',
        'Objectives Stolen': 'performance.objectives_stolen',
        'Objectives Stolen Assists': 'performance.objectives_stolen_assists',
        'Vision Score': 'performance.vision_score',
        'Vision Score Per Minute': 'challenges.vision_score_per_minute',
        'Wards Killed': 'performance.wards_killed',
        'Stealth Wards Placed': 'performance.stealth_wards_placed',
        'Vision Wards Placed': 'performance.vision_wards_placed',
        'Blue Pings': 'pings.command_pings',
        'All In Pings': 'pings.all_in_pings',
        'Assist Pings': 'pings.assist_me_pings',
        'Danger Pings': 'pings.danger_pings',
        'Missing Pings': 'pings.enemy_missing_pings',
        'Enemy Vision Pings': 'pings.enemy_vision_pings',
        'Need Vision Pings': 'pings.need_vision_pings',
        'Fallback Pings': 'pings.fallback_pings',
        'Hold Pings': 'pings.hold_pings',
        'On My Way Pings': 'pings.on_my_way_pings',
        'Push Pings': 'pings.push_pings',
    };

    useEffect(() => {
        const selectedOption = options[option];

        const data = participants.map(participant => ({
            name: `${participant.summoner.summoner_name} #${participant.summoner.summoner_tag}`,
            value: getNestedValue(participant, selectedOption)
        }));

        setChartData(data);
    }, [option, participants]);

    return (
        <>
            <select value={option} onChange={(e) => setOption(e.target.value)}>
                {Object.keys(options).map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
