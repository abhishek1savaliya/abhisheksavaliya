'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const VisitorsContext = createContext()

export const VisitorsProvider = ({ children }) => {
    const [visitorCount, setVisitorCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const response = await axios.post('/api/visitors')
                setVisitorCount(response.data.sumVisitorCounts)
            } catch (error) {
                console.error('Error fetching visitor count:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchVisitorCount()
    }, [])

    return (
        <VisitorsContext.Provider value={{ visitorCount, loading }}>
            {children}
        </VisitorsContext.Provider>
    )
}

export const useVisitors = () => useContext(VisitorsContext)
