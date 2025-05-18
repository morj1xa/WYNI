import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AdDetails.css';

export default function AdDetails() {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/ads/${id}`)
            .then(res => res.json())
            .then(data => {
                setAd(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!ad) return <div>Объявление не найдено</div>;

    return (
        <div className="ad-container">
            <div className="ad-main">
                <div className="ad-left">
                    <div className="image-gallery">
                        {ad.images.map((img, index) => (
                            <img key={index} src={img.image_url} alt={`ad-img-${index}`} />
                        ))}
                    </div>

                    <div className="ad-characteristics">
                        <h3>Характеристики</h3>
                        <p><strong>Категория:</strong> {ad.categories?.name}</p>
                        <p><strong>Локация:</strong> {ad.location}</p>
                        <p><strong>Создано:</strong> {new Date(ad.created_at).toLocaleDateString()}</p>
                    </div>

                    <div className="ad-description">
                        <h3>Описание</h3>
                        <p>{ad.description}</p>
                    </div>

                    <div className="ad-suggestions">
                        <h3>Похожие объявления</h3>
                        {/* Тут потом будет компонент с похожими товарами */}
                        <p>Здесь</p>
                    </div>
                </div>

                <div className="ad-right">
                    <div className="sticky-box">
                        <h1>{ad.title}</h1>
                        <h2>{ad.price} ₽</h2>
                        <button className="buy-button">Купить</button>
                        <div className="seller-info">
                            <p><strong>Продавец:</strong> {ad.users.username}</p>
                            <button className="message-button">Написать</button>
                            <button className="follow-button">Подписаться</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
