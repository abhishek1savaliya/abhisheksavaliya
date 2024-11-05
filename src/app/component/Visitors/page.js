// Visitors.js
'use client'
import { useVisitors } from '@/app/context/VisitorsContext';
import React from 'react'
import { ClipLoader } from "react-spinners";

const Visitors = ({ mode }) => {
    const { visitorCount, loading } = useVisitors()

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