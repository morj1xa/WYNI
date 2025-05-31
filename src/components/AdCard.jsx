import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './AdCard.css';

export default function AdCard({ ad }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const res = await fetch('http://localhost:3000/favorites', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Ошибка получения избранного');

                const favorites = await res.json();

                const isFav = favorites.some(fav =>
                    fav.id === ad.id ||
                    fav.ad_id === ad.id ||
                    fav.ad?.id === ad.id
                );

                setIsFavorite(isFav);
            } catch (err) {
                console.error('Ошибка при проверке избранного:', err);
            }
        };

        if (token) checkFavorite();
    }, [ad.id, token]);

    const toggleFavorite = async (e) => {
        e.stopPropagation();

        if (!token) {
            console.error('Пользователь не авторизован');
            return;
        }

        try {
            if (isFavorite) {
                await fetch(`http://localhost:3000/favorites/${ad.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setIsFavorite(false);
            } else {
                await fetch(`http://localhost:3000/favorites`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ad_id: ad.id }),
                });
                setIsFavorite(true);
            }
        } catch (err) {
            console.error('Ошибка при изменении избранного:', err);
        }
    };

    const handleClick = () => {
        window.open(`/ad/${ad.id}`, '_blank');
    };

    return (
        <div className="ad-card" onClick={handleClick} style={{ cursor: 'pointer', position: 'relative' }}>
            {ad.images?.[0]?.image_url && (
                <img src={ad.images[0].image_url} alt={ad.title} className="ad-image" />
            )}
            <hr className="divider" />
            <div className="text-container">
                <h3 className="ad-title">{ad.title.length > 20 ? ad.title.slice(0, 20) + "..." : ad.title}</h3>
                <p>{ad.description?.slice(0, 23)}...</p>
                <p className="ad-price">{ad.price} руб.</p>
                <p className="ad-location">{ad.location}</p>
                <span className="favorite-icon" onClick={toggleFavorite}>
                    {isFavorite ? (
                        <FaHeart className="heart-icon active" />
                    ) : (
                        <FaRegHeart className="heart-icon" />
                    )}
                </span>
            </div>
        </div>
    );
}
