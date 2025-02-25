import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getNestedValue = (participant, option) => {
    return option.split('.').reduce((acc, key) => (acc[key]), participant);
};

export function MatchStats({ participants }) {
    const [option, setOption] = useState('Gold Earned');
    const [chartData, setChartData] = useState([]);

    const options = {
        'Gold Earned': 'performance.gold_earned',
        'Gold Spent': 'performance.gold_spent',
        'Damage Dealt': 'performance.total_damage',
        'Kills': 'performance.kills',
        'Deaths': 'performance.deaths',
        'Assists': 'performance.assists',
        'Command Pings': 'pings.command_pings',
        'Danger Pings': 'pings.danger_pings',
        'Missing Pings': 'pings.enemy_missing_pings'
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
