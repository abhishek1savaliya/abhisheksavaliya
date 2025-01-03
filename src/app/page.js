'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { Analytics } from "@vercel/analytics/react"
import Dot from './component/Dot/page'
import Popup from './component/popup/page'
import Qrcode from './component/Qr/page'
import profileData from '../Data/profile.json'
import Head from "next/head";
import Visitors from "./component/Visitors/page";
import axios from "axios";
import NetworkIcon from "./component/NetworkIcon/page";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [qr, setQr] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const visibleProfiles = showAll ? profileData : profileData.slice(0, 5);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleQr = () => {
    console.log("Toggle QR called");
    setQr(!qr);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      localStorage.setItem('mode', 'dark'); // Save dark mode in localStorage
    } else {
      localStorage.removeItem('mode'); // Remove from localStorage on light mode
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    } else {
      // Default to system preference if no saved mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
      localStorage.setItem('mode', prefersDarkMode ? 'dark' : 'light');
    }

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  const count = async (item) => {
    try {

      const response = await axios.post('/api/social', {
        network: item.network
      });

      console.log(response.data)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (

    <>

      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />

      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'dark-mode bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className={`w-full max-w-md p-8 m-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
          <div className="flex justify-between mb-4">

            <div>
              <Visitors mode={isDarkMode ? 'dark' : 'light'} />
            </div>

            <div></div>
            <button role="button" onClick={toggleDarkMode}>
              {isDarkMode ? <GoSun /> : <IoMoonOutline />}
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-36 h-36 bg-gray-300 rounded-full border-4 border-gray-100 overflow-hidden flex justify-center items-center">

              {showLoader ? (
                <div className="flex justify-center items-center w-160 h-48 p-10">
                  <span className="loader"></span>
                </div>
              ) : (
                <Image
                  src="https://ugc.production.linktr.ee/e9d47103-08be-4d91-b2fd-370f186e9b07_20230926-161226.jpeg"
                  alt="Profile"
                  className="rounded-full transform transition-transform duration-300 hover:scale-110"
                  width={220}
                  height={220}
                />
              )}

            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">Abhishek Savaliya</h1>
              <h2 className="text-lg">Let's connect with me 😀</h2>
            </div>
            <button className="button-30" role="button" onClick={toggleQr}>QR Code</button>
          </div>

          <div>
            <ul className="space-y-2">
              {visibleProfiles.map((item, index) => (
                <div
                  key={index}
                  style={{ padding: "1px" }}
                  onClick={() => {
                    count(item);
                    window.open(item.targetLink, "_blank");
                  }}
                >
                  <li
                    className={`p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer relative ${isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    <div className="flex items-center flex-grow">
                      <div className="mr-2 h-13">
                        <NetworkIcon network={item.network} alt={item.alt} />
                      </div>
                      <div
                        className={`flex-grow text-center ${isDarkMode ? "text-white font-bold" : "text-black font-bold"
                          }`}
                      >
                        {item.name}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePopup();
                      }}
                    >
                      <Dot />
                    </button>
                  </li>
                </div>
              ))}
            </ul>
            {/* Show More/Show Less Button */}
            {profileData.length > 5 && (
              <div className="mt-4 text-center">
                <button
                  onClick={toggleShowAll}
                  className={`px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow ${isDarkMode ? "bg-gray-700 text-white" : "px-3 py-2 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  dark:bg-gray-600 dark:hover:bg-gray-700 "
                    }`}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup togglePopup={togglePopup} />
      )}

      {qr && (
        <div className="relative">
          <div className="fixed inset-0 flex items-center justify-center z-40 backdrop-filter backdrop-blur-lg bg-opacity-75"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className={`rounded-lg p-4 shadow-lg relative ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <Qrcode toggleQr={toggleQr} />
            </div>
          </div>
        </div>
      )}
    </>

  );
}