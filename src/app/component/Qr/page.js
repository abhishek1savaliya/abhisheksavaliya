'use client'
import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import './page.css'
const page = ({ toggleOr }) => {
    const copyLink = () => {
        const link = "https://abhisheksavaliya.vercel.app/";
        navigator.clipboard.writeText(link)
            .then(() => {
                    document.querySelector('.button-15').classList.add('clicked');
            })
            .catch(() => {
                alert("Failed to copy link to clipboard.");
            });
    };


    return (
        <div>
            <div className="p-4 flex justify-between items-center">
                <button class="close-button -top-5 -right-5" onClick={toggleOr}>&times;</button>
            </div>

            <div className="flex justify-center items-center">
                <button class="button-15 mb-5" onClick={copyLink} role="button">Copy Link</button>
            </div>

            <QRCodeSVG
                value={"https://abhisheksavaliya.vercel.app/"}
                size={128}
                bgColor={"#f3f6f4"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
                imageSettings={{
                    src: "https://i.ibb.co/kXb6MTR/qr.jpg",
                    x: undefined,
                    y: undefined,
                    height: 30,
                    width: 30,
                    excavate: true,
                }}
            />
        </div>
    )
}

export default page
