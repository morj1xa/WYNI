import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import AdCard from '../components/AdCard'
import CategoryDropdown from '../components/CategoryDropdown'
import HomeSection from '../components/HomeSection'
import ThreeHomeSections from '../components/ThreeHomeSections'
import SectionWithBannerOnLeft from '../components/SectionWithBannerOnLeft'
import '../App.css'
import React, { useEffect } from "react";
import SectionWithBannerOnRight from '../components/SectionWithBannerOnRight'


export default function HomePage() {
    const [ads, setAds] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Загружаем объявления с сервера
        const fetchAds = async () => {
            try {
                const response = await fetch('http://localhost:3000/ads');
                const data = await response.json();

                if (response.ok) {
                    console.log('Все категории:', data.map(ad => ad.categories?.name));
                    setAds(data); // Если запрос успешен, сохраняем объявления в стейт
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
    return (
        <>
            <CategoryDropdown />
            <div className="full-width-block">
                <Hero />
            </div>



            <SectionWithBannerOnRight
                section={<HomeSection title="Спорт вне зала" items={ads.filter(ad => ['Nike', 'Adidas', 'Reebok', 'Under Armour', 'The North Face'].includes(ad.brand?.name))} />}
                bannerImage="banner1.jpg"
            />
            <ThreeHomeSections
                sections={[
                    <HomeSection title="Для streetwear фанатов" items={ads.filter(ad => ['Supreme', 'Off-White', 'Stüssy', 'Stone Island'].includes(ad.brand?.name))} />,
                    <HomeSection title="Итальянская мода" items={ads.filter(ad => ['Gucci', 'Dolce & Gabbana', 'Valentino', 'Versace', 'Fendi'].includes(ad.brand?.name))} />,
                    <HomeSection title="Тепло по моде" items={ads.filter(ad => ['Пуховики', 'Куртки', 'Пальто'].includes(ad.categories?.name))} />,
                ]}
            />
            <SectionWithBannerOnLeft
                section={<HomeSection title="Лето в шортах" items={ads.filter(ad => ['Шорты'].includes(ad.categories?.name))} />}
                bannerImage="banner2.jpg"
            />



            {/* <div className="home-page">
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
            </div> */}
        </>
    )
}

