import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdCard from '../components/AdCard';
import './FilteredAdsPage.css';

export default function FilteredAdsPage() {
    const { type, value } = useParams();
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    useEffect(() => {
        if (!ads.length) return;

        if (type === 'category') {
            setFilteredAds(ads.filter(ad => ad.categories?.name === value));
        } else if (type === 'brand') {
            setFilteredAds(ads.filter(ad => ad.brand?.name === value));
        } else if (type === 'search') {
            setFilteredAds(
                ads.filter(ad =>
                    ad.title.toLowerCase().includes(value.toLowerCase()) ||
                    ad.description.toLowerCase().includes(value.toLowerCase()) ||
                    ad.brand?.name?.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else if (type === 'collection') {
            const collection = collectionMap[value];

            if (collection?.brands) {
                setFilteredAds(
                    ads.filter(ad => collection.brands.includes(ad.brand?.name))
                );
            } else if (collection?.categories) {
                setFilteredAds(
                    ads.filter(ad => collection.categories.includes(ad.categories?.name))
                );
            } else {
                setFilteredAds([]);
            }
        }
        else {
            setFilteredAds(ads);
        }
    }, [ads, type, value]);

    const titleMap = {
        category: 'Категория',
        brand: 'Бренд',
        search: 'Поиск',
        collection: 'Подборка'
    };
    const collectionMap = {
        'sport-outdoor': { brands: ['Nike', 'Adidas', 'Reebok', 'Under Armour', 'The North Face'] },
        'italian-fashion': { brands: ['Gucci', 'Dolce & Gabbana', 'Valentino', 'Versace', 'Fendi'] },
        'streetwear-fans': { brands: ['Supreme', 'Off-White', 'Stüssy', 'Stone Island'] },
        'winter-style': { categories: ['Пуховики', 'Куртки', 'Пальто'] },
        'summer-shorts': { categories: ['Шорты'] },
    };



    return (
        <div className="filtered-page">
            <div className="filtered-header">
                <h1>{titleMap[type] || 'Результаты'}: {decodeURIComponent(value)}</h1>
            </div>

            {loading ? (
                <div className="loading">Загрузка объявлений...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : filteredAds.length === 0 ? (
                <div className="no-results">Ничего не найдено</div>
            ) : (
                <div className="ads-grid">
                    {filteredAds.map(ad => (
                        <AdCard key={ad.id} ad={ad} />
                    ))}
                </div>
            )}
        </div>
    );
}
