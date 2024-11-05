'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileData from '../../Data/profile.json';
import { SocialIcon } from 'react-social-icons';
import SocialCountGraph from '../component/SocialCountGraph/page';
import NetworkIcon from '../component/NetworkIcon/page';

const Admin = () => {
    const [socialData, setSocialData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [networks, setNetworks] = useState({});

    useEffect(() => {
        const fetchSocialData = async () => {
            try {
                const response = await axios.get('/api/social');
                if (response.data.success) {
                    setSocialData(response.data.data);
                    if (response.data.data.length > 0) {
                        setSelectedDate(response.data.data[0].date);
                    }
                }
            } catch (error) {
                console.error('Error fetching social data:', error);
            }
        };

        fetchSocialData();
    }, []);

    useEffect(() => {
        const selectedData = socialData.find(item => item.date === selectedDate);
        if (selectedData) {
            setNetworks(selectedData.network);
        }
    }, [selectedDate, socialData]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Prepare graph data
    const graphData = Object.entries(networks).map(([network, count]) => ({
        date: selectedDate,
        count,
        network,
    }));

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="mb-4">
                <label htmlFor="date-select" className="block mb-2">Select Date: </label>
                <select
                    id="date-select"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="bg-gray-800 text-white border border-gray-600 rounded p-2">
                    {socialData.map((item, index) => (
                        <option key={index} value={item.date}>
                            {item.date}
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
                    .map(({ network, count, image }) => (
                        <div key={network} className="m-2 text-center">
                            <span className="block font-bold mb-1">{count}</span>
                            <NetworkIcon
                                network={network}
                                alt={network}
                            />
                        </div>
                    ))}
            </div>

            <div className="flex justify-center align-middle    mt-8">
                <SocialCountGraph data={graphData} />
            </div>
        </div>
    );
};

export default Admin;
