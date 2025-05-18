import React, { useEffect, useState } from 'react';
import AdCard from '../components/AdCard';
import './UsersAds.css'

export default function UsersAds() {
    const [myAds, setMyAds] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyAds = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:3000/ads/my', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setMyAds(data);
                } else {
                    setError(data.error || 'Не удалось загрузить ваши объявления');
                }
            } catch (err) {
                setError('Ошибка при получении данных');
                console.error(err);
            }
        };

        fetchMyAds();
    }, []);

    return (
        <>

            <h2>Мои объявления</h2>
            <div className='myAds'>

                {error && <p className="error">{error}</p>}
                {myAds.length > 0 ? (
                    myAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
                ) : (
                    <p>У вас пока нет объявлений</p>
                )}
            </div>

        </>

    );
}