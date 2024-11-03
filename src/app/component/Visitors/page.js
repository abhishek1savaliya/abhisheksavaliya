'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ClipLoader } from "react-spinners";

const Visitors = ({ mode }) => {
    const [visitorCount, setVisitorCount] = useState(0)
    const [loading, setLoading] = useState(true) // Add loading state

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const response = await axios.get('/api/visitors')
                setVisitorCount(response.data.totalVisit.visitorCounts)
            } catch (error) {
                console.error('Error fetching visitor count:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchVisitorCount()
    }, [])

    return (
        <span>
            {loading ? (
                <>&nbsp;<ClipLoader color={mode === 'dark' ? '#FFFFFF' : '#000000'} size={18} /></>
            ) : (
                visitorCount
            )}
        </span>

    )
}

export default Visitors