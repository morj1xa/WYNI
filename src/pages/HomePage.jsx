import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import AdCard from '../components/AdCard'
import CategoryDropdown from '../components/CategoryDropdown'
import '../App.css'
import React, { useEffect } from "react";


export default function HomePage() {
    const [ads, setAds] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        // Загружаем объявления с сервера
        const fetchAds = async () => {
            try {
                const response = await fetch('http://localhost:3000/ads');
                const data = await response.json();

                if (response.ok) {
                    setAds(data); // Если запрос успешен, сохраняем объявления в стейт
                } else {
                    setError('Не удалось загрузить объявления');
                }
            } catch (error) {
                setError('Ошибка при загрузке данных');
                console.error('Ошибка загрузки объявлений:', error);
            }
        };

        fetchAds(); // Вызываем функцию загрузки данных
    }, []);

    return (
        <>
            <CategoryDropdown />
            <Hero />
            <div className="home-page">
                {error && <div className="error">{error}</div>}

                <div className="ad-list">
                    {ads.length > 0 ? (
                        ads.map((ad) => (
                            <AdCard key={ad.id} ad={ad} />
                        ))
                    ) : (
                        <div>Загрузка...</div>
                    )}
                </div>
            </div>
        </>
    )
}

