'use client'
import React, { useState } from "react";
import Image from "next/image";
import Dot from './component/Dot/page'
import Popup from './component/popup/page'
import profileData from '../Data/profile.json'

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  return (
    <>
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
  {profileData.map((item, index) => (
    <div
      key={index}
      className="text-blue-500 hover:text-blue-700"
      style={{ padding: "1px" }}
      onClick={() => window.open(item.targetLink, "_blank")}
    >
      <li className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-between cursor-pointer hover:bg-gray-200 relative">
        <div className="flex items-center flex-grow">
          <div className="w-6 h-6 mr-2">
            <img src={item.image} alt={item.alt} className="w-full h-full" />
          </div>
          <div className="flex-grow text-center">{item.name}</div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); togglePopup(); }}>
          <Dot />
        </button>
      </li>
    </div>
  ))}
</ul>

    </div>
  </div>
</div>


      {showPopup && (
        <Popup togglePopup={togglePopup} />
      )
      }

    </>
  );
}




