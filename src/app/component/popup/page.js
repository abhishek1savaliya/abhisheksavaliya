'use client'
import React from 'react'
import { SocialIcon } from 'react-social-icons';

const page = ({ togglePopup }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white rounded-lg p-4 shadow-lg relative">
                <button
                    className="absolute -top-1 -right-1 text-white bg-red-500 hover:bg-red-700 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                    onClick={togglePopup}

                >
                    <span className="pointer-events-none">&times;</span>
                </button>

                <p className="text-base font-bold mb-2">Share profile</p>
                <div className="flex justify-center">
                    <button
                        className="bg-gray-200 rounded-full flex items-center justify-center mr-3"
                        onClick={() => window.open('https://wa.me/?text=👋%20Hey!%20Check%20out%20this%20amazing%20profile:%20https://abhisheksavaliya.vercel.app/%20🎉%20Here%27s%20Abhishek!%20😊', '_blank')}

                    >
                        <SocialIcon network="whatsapp" style={{ height: 40, width: 40 }} />
                    </button>
                    <button
                        className="bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => window.open('https://twitter.com/intent/tweet?text=👋%20Hey!%20Check%20out%20this%20amazing%20profile:%20https://abhisheksavaliya.vercel.app/%20🎉%20Here%27s%20Abhishek!%20😊', '_blank')}
                    >
                        <SocialIcon network="x" style={{ height: 40, width: 40 }} />
                    </button>
                </div>
            </div>
        </div>


    )
}

export default page
