'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileData from '../../Data/profile.json';
import SocialCountGraph from '../component/SocialCountGraph/page';
import NetworkIcon from '../component/NetworkIcon/page';

const Admin = () => {
    const [socialData, setSocialData] = useState([]);
    const [networks, setNetworks] = useState({});

    const today = new Date();
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const fetchSocialData = async () => {
        try {
            const response = await axios.get(`/api/social?day=${day}&month=${month}&year=${year}`);
            if (response.data.success) {
                setSocialData(response.data.data);
                if (response.data.data.length > 0) {
                    setNetworks(response.data.data[0].network);
                }
            }
        } catch (error) {
            console.error('Error fetching social data:', error);
        }
    };

    useEffect(() => {
        fetchSocialData();
    }, [day, month, year]);

    // Helper function to get the number of days in a given month and year
    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    // Determine the max day for the selected month and year
    const maxDays = (year === today.getFullYear() && month === today.getMonth() + 1) ? today.getDate() : getDaysInMonth(month, year);

    // Prepare graph data
    const graphData = Object.entries(networks).map(([network, count]) => ({
        date: `${day}-${month}-${year}`,
        count,
        network,
    }));

    return (
        <div className="min-h-screen bg-gray-900 text-white font-mono p-6">
            <div className="flex justify-center">
                <span className="text-center text-3xl font-bold">Analytics</span>
            </div>

            <div className="flex gap-4 mb-4">
                {/* Day Selection */}
                <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className="bg-gray-800 text-white border border-gray-600 rounded p-2"
                >
                    {Array.from({ length: maxDays }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>

                {/* Month Selection */}
                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="bg-gray-800 text-white border border-gray-600 rounded p-2"
                >
                    {Array.from({ length: year === today.getFullYear() ? today.getMonth() + 1 : 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>

                {/* Year Selection */}
                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="bg-gray-800 text-white border border-gray-600 rounded p-2"
                >
                    {Array.from({ length: 5 }, (_, i) => (
                        <option key={i} value={today.getFullYear() - i}>
                            {today.getFullYear() - i}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center align-middle flex-wrap mt-4">
                {profileData
                    .map((item) => ({
                        network: item.network,
                        count: networks[item.network] || 0,
                    }))
                    .sort((a, b) => b.count - a.count)
                    .map(({ network, count }) => (
                        <div key={network} className="m-2 text-center">
                            <span className="block font-bold mb-1">{count}</span>
                            <NetworkIcon network={network} alt={network} />
                        </div>
                    ))}
            </div>

            <div className="flex justify-center align-middle mt-8">
                <SocialCountGraph data={graphData} />
            </div>
        </div>
    );
};

export default Admin;