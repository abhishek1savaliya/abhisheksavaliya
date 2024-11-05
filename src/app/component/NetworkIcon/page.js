import React from 'react';
import { SocialIcon } from 'react-social-icons';
import profileData from '../../../Data/profile.json';

const NetworkIcon = ({ network, alt }) => {
    const imageShow = ['profile', 'paypal', 'shop', 'buymeacoffee'];

    const networkData = profileData.find((data) => data.network === network);

    return (
        <>
            {imageShow.includes(network) && networkData ? (
                <img
                    src={networkData.image}
                    alt={networkData.alt || alt}
                    style={{ height: 50, width: 50, borderRadius: '50%' }}
                />
            ) : (
                <SocialIcon network={network} style={{ height: 50, width: 50 }} />
            )}
        </>
    );
};

export default NetworkIcon;