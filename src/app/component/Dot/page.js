'use client'
import React, { useState } from 'react'
import './page.css'
import { SocialIcon } from 'react-social-icons';

const Page = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <div className="flex items-center">
                <div className="flex flex-col relative" id="dots-container" >
                    <span className="dot" onClick={togglePopup}></span>
                    <span className="dot" onClick={togglePopup}></span>
                    <span className="dot" onClick={togglePopup}></span>
                    {showPopup && (
                  <div className="absolute left-0 top-full mt-2 w-56 z-50">
                  <div className="bg-white rounded-lg p-8 shadow-lg relative">
                      <button
                          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={togglePopup}
                          style={{ cursor: 'pointer' }}
                      >
                          <span className="pointer-events-none">&times;</span>
                      </button>
              
                      <p className="text-lg font-bold mb-4">Share profile</p>
                      <div className="flex justify-normal">
                          <button 
                              className="bg-gray-200 rounded-full flex items-center justify-center mr-3"
                              onClick={() => window.open('https://wa.me/?text=Check%20out%20this%20profile!', '_blank')}
                          >
                              <SocialIcon network="whatsapp" style={{ height: 50, width: 50 }} />
                          </button>
                          <button 
                              className="bg-gray-200 rounded-full flex items-center justify-center"
                              onClick={() => window.open('https://twitter.com/intent/tweet?text=Check%20out%20this%20profile!', '_blank')}
                          >
                              <SocialIcon network="x" style={{ height: 50, width: 50 }} />
                          </button>
                      </div>
                  </div>
              </div>
              

                    )}
                </div>
            </div>
        </>
    );
}

export default Page;
