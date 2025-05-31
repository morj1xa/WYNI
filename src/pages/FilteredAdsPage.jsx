import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AdCard from '../components/AdCard';

export default function FilteredAdsPage() {
    const { type, value } = useParams();
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);

    useEffect(() => {
        // Загружаем объявления с сервера
        const fetchAds = async () => {
            try {
                const response = await fetch('http://localhost:3000/ads');
                const data = await response.json();

                if (response.ok) {
                    setAds(data);
                } else {
                    setError('Не удалось загрузить объявления');
                }
            } catch (error) {
                setError('Ошибка при загрузке данных');
                console.error('Ошибка загрузки объявлений:', error);
            }
        };

        fetchAds();
    }, []);

    useEffect(() => {
        if (!ads.length) return;
        console.log('ad sample:', ads[0]);

        if (type === 'category') {
            setFilteredAds(ads.filter(ad => ad.categories?.name === value));
        } else if (type === 'brand') {
            setFilteredAds(ads.filter(ad => ad.brand?.name === value));
        } else if (type === 'search') {
            setFilteredAds(
                ads.filter(ad =>
                    ad.title.toLowerCase().includes(value.toLowerCase()) ||
                    ad.description.toLowerCase().includes(value.toLowerCase()) ||
                    ad.brand.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredAds(ads);
        }
    }, [ads, type, value]);

    const titleMap = {
        category: 'Категория',
        brand: 'Бренд',
        search: 'Поиск',
    };

    return (
        <div className="results-page">
            <h1 className="results-title">{titleMap[type]}: {decodeURIComponent(value)}</h1>
            <div className="results-grid">
                {filteredAds.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>
        </div>
    );
}
