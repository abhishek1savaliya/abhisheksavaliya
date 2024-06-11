'use client'
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './page.css';

const Page = ({ toggleQr }) => {
    const [showLoader, setShowLoader] = useState(true);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className="p-4 flex justify-between items-center">
                <button className="close-button -top-5 -right-5" onClick={toggleQr}>&times;</button>
            </div>

            {showLoader ? (
                <div className="flex justify-center items-center w-160 h-48 p-10">
                  <span class="loader"></span>
                </div>
            ) : (<>
                <div className="flex justify-center items-center">
                    <button className="button-15 mb-5" onClick={copyLink} role="button">Copy Link</button>
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
            </>
            )}
        </div>
    );
};

export default Page;
