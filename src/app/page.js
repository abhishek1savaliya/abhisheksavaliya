'use client'
import React, { useState } from "react";
import Image from "next/image";
import Dot from './component/Dot/page'
import Popup from './component/popup/page'


export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-md">

          <div className="flex justify-center mb-4">
            <div className="w-30 h-30 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center">
              <Image
                src="https://ugc.production.linktr.ee/e9d47103-08be-4d91-b2fd-370f186e9b07_20230926-161226.jpeg"
                alt="Profile"
                className="rounded-full transform transition-transform duration-300 hover:scale-110"
                width={100}
                height={100}
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold text-center">Abhishek Savaliya</h1>
            <h2 className="text-lg text-center">Let's connect with me 😀</h2>
            <ul className="space-y-2">


              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative" >
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/01653fe5-5844-4add-9634-99a853879988_018416a708cc44b0a2a89bfc92e2dbad-t.jpeg?io=true&size=thumbnail-stack-v1_0"
                      alt="Email Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="mailto:abhisheksavaliya000@outlook.com"
                      className="text-blue-500 hover:text-blue-700"
                      target="_blank"
                    >
                      Email
                    </a>
                  </div>
                </div>

                <button onClick={togglePopup}>
                  <Dot />
                </button>


              </li>
              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/5dde9ed8-128b-4b41-a0f9-8466ed7517ba_Profile.jpeg?io=true&size=thumbnail-stack-v1_0"
                      alt="Profile Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="https://www.abhishekprofile.online/"
                      className="text-blue-500 hover:text-blue-700"
                      target="_blank"
                    >
                      My Profile
                    </a>
                  </div>
                </div>

                <button onClick={togglePopup}>
                  <Dot />
                </button>

              </li>

              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/2dd74cc0-8e7c-4712-a50f-04f4bf3623ab_LinkedIn-icon.svg.png?io=true&size=thumbnail-stack-v1_0"
                      alt="LinkedIn Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="https://www.linkedin.com/in/abhisheksavaliya"
                      className="text-blue-500 hover:text-blue-700"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>

                <button onClick={togglePopup}>
                  <Dot />
                </button>

              </li>

              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/a7a9f8bf-2791-42fd-8871-7fc2d548cee1_25231.png?io=true&size=thumbnail-stack-v1_0"
                      alt="GitHub Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="https://github.com/abhishek1savaliya"
                      className="text-blue-500 hover:text-blue-700" target="_blank"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <button onClick={togglePopup}>
                  <Dot />
                </button>

              </li>

              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/137e17e8-ff3d-473b-8f09-1e9243cca042_X-icon-2.png?io=true&size=thumbnail-stack-v1_0"
                      alt="Twitter Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="https://twitter.com/abhisheksvaliya"
                      className="text-blue-500 hover:text-blue-700" target="_blank"
                    >
                      X (Twitter)
                    </a>
                  </div>
                </div>
                <button onClick={togglePopup}>
                  <Dot />
                </button>
              </li>

              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/e254c96f-f09a-4a58-a34d-1a523c4edddb_1384060.png?io=true&size=thumbnail-stack-v1_0"
                      alt="YouTube Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="http://www.youtube.com/@SriKrsnaBhajananvita"
                      className="text-blue-500 hover:text-blue-700" target="_blank"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
                <button onClick={togglePopup}>
                  <Dot />
                </button>
              </li>

              <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
                <div className="flex items-center flex-grow">
                  <div className="w-6 h-6 mr-2">
                    <img
                      src="https://ugc.production.linktr.ee/f8c44daa-b5c9-4653-9493-eb934e5f4db3_images--1-.jpeg?io=true&size=thumbnail-stack-v1_0"
                      alt="Instagram Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-center">
                    <a
                      href="https://www.instagram.com/ll__abhishek__ll__909/"
                      className="text-blue-500 hover:text-blue-700" target="_blank"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
                <button onClick={togglePopup}>
                  <Dot />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup togglePopup={togglePopup} />
      )}

    </>
  );
}




