import React, { useState, useEffect } from 'react';
import './ProfileTabs.css';
import AdCard from '../components/AdCard';

export default function ProfileTabs({ userId, btn }) {
    const [activeTab, setActiveTab] = useState('ads');
    const [myAds, setMyAds] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (activeTab === 'ads') {
            fetchUserAds();
        } else if (activeTab === 'favorites') {
            fetchFavorites();
        }
    }, [activeTab]);

    const fetchUserAds = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:3000/ads/my`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error('Ошибка загрузки объявлений');
            setMyAds(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        setLoading(true);
        setError('');
        try {
            fetch('http://localhost:3000/favorites', {
                headers: {
                    'Authorization': `Bearer ${token}`,  // токен из авторизации пользователя
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Избранное:', data);
                    setFavorites(data);
                });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (loading) return <p>Загрузка...</p>;
        if (error) return <p style={{ color: 'red' }}>{error}</p>;

        if (activeTab === 'ads') {
            if (!myAds.length) return <p>У вас пока нет объявлений.</p>;
            return (
                <>
                    < div className="my-ads-grid" >
                        {
                            myAds.map(ad => (
                                <AdCard key={ad.id} ad={ad} />
                            ))
                        }
                    </div >
                </>


            );
        }

        if (activeTab === 'favorites') {
            if (!favorites || favorites.length === 0) return <p>У вас пока нет избранного.</p>;

            return (
                <div className="my-ads-grid">
                    {favorites
                        .filter(ad => ad) // удаляет null/undefined
                        .map(ad => (
                            <AdCard key={ad.id} ad={ad} />
                        ))}
                </div>
            );
        }


        if (activeTab === 'reviews') {
            return <div>Отзывы</div>; // Можно позже сделать полноценный блок
        }

        return null;
    };

    return (
        <div className="profile-tabs">
            <div className="tab-buttons">
                <button
                    className={`tab-button ${activeTab === 'ads' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ads')}
                >
                    Объявления
                </button>
                <button
                    className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Избранное
                </button>
            </div>

            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
}
