import React from 'react';
import './AdCard.css';
import { useNavigate } from 'react-router-dom';  // Для навигации

//  Карточки объявлений
export default function AdCard({ ad }) {

    const handleClick = () => {
        window.open(`/ad/${ad.id}`, '_blank');
    };

    return (
        <div className="ad-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            {ad.images && ad.images.length > 0 && (
                <img
                    src={ad.images[0].image_url}
                    alt={ad.title}
                    className="ad-image"
                />
            )}
            <hr className="divider" />

            <div className="text-container">
                <h3 className="ad-title">{ad.title}</h3>
                <p className="ad-description">{ad.description.length > 23
                    ? ad.description.slice(0, 23) + "..."
                    : ad.description}</p>
                <p className="ad-price">{ad.price} руб.</p>
                <p className="ad-location">{ad.location}</p>
                {/* <p className="ad-location">{ad.users?.username}</p> */}
            </div>
        </div>

    );
};
