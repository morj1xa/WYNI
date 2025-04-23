import React from 'react';
import './AdCard.css';

//  Карточки объявлений
export default function AdCard({ ad }) {
    return (

        <div className="ad-card">
            <h3 className="ad-title">{ad.title}</h3>
            <p className="ad-description">{ad.description}</p>
            <p className="ad-price">{ad.price} руб.</p>
            <p className="ad-location">{ad.location}</p>
        </div>

    );
};
