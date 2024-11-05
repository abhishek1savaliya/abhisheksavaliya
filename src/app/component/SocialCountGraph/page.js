'use client'
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from 'recharts';

import NetworkIcon from '../NetworkIcon/page';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { count, network } = payload[0].payload;

        return (
            <div className="bg-gray-800 text-white p-2 rounded">
                <div className="flex items-center">
                    <NetworkIcon
                        network={network}
                        alt={network}
                    />
                    <span className="ml-2">{network}</span>
                </div>
                <span>Count: {count}</span>
                <span> on {label}</span>
            </div>
        );
    }

    return null;
};

const SocialCountGraph = ({ data }) => {
    return (
        <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
    );
};

export default SocialCountGraph;