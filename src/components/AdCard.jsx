import React from 'react';
import './AdCard.css';

//  Карточки объявлений
export default function AdCard({ ad }) {
    return (

        <div className="ad-card">
            {ad.images && ad.images.length > 0 && (
                <img
                    src={ad.images[0].image_url}
                    alt={ad.title}
                    className="ad-image"
                />
            )}
            <h3 className="ad-title">{ad.title}</h3>
            <p className="ad-description">{ad.description}</p>
            <p className="ad-price">{ad.price} руб.</p>
            <p className="ad-location">{ad.location}</p>
            <p className="ad-location">{ad.users?.username}</p>
        </div>

    );
};
