'use client'
import React, { useState } from 'react'
import './page.css'


const Page = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    return (
        <>
            <div className='easyclick'>
                <div className="flex items-center">
                    <div className="flex flex-col relative" id="dots-container" >
                        <span className="dot" onClick={togglePopup}></span>
                        <span className="dot" onClick={togglePopup}></span>
                        <span className="dot" onClick={togglePopup}></span>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
