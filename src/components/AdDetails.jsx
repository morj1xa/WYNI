import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AdDetails.css';

export default function AdDetails() {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [currentUserId, setCurrentUserId] = useState(null);



    useEffect(() => {
        fetch(`http://localhost:3000/ads/${id}`)
            .then(res => res.json())
            .then(data => {
                setAd(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1])); // декодируем JWT
                setCurrentUserId(decoded.userId); // ✅ правильно сохраняем userId
            } catch (error) {
                console.error('Ошибка при декодировании токена', error);
            }
        }
    }, [id]);

    const handleSendMessage = () => {
        const token = localStorage.getItem('token');
        if (!token || !messageText.trim()) return;

        const decoded = JSON.parse(atob(token.split('.')[1]));
        const senderId = decoded.userId;

        fetch('http://localhost:3000/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ad_id: ad.id,
                sender_id: senderId,
                receiver_id: ad.users.id,
                message: messageText.trim()
            })
        })
            .then(res => res.json())
            .then(() => {
                setMessageText('');
                setShowMessageModal(false);
            })
            .catch(err => console.error('Ошибка отправки сообщения:', err));
    };


    if (loading) return <div>Загрузка...</div>;
    if (!ad) return <div>Объявление не найдено</div>;

    return (
        <div className="ad-container">
            <div className="ad-main">
                <div className="ad-left">
                    <div className="image-gallery">
                        <div className="main-image">
                            <button
                                className="arrow-button left"
                                onClick={() =>
                                    setSelectedImageIndex((prev) => (prev === 0 ? ad.images.length - 1 : prev - 1))
                                }
                            >
                                ‹
                            </button>
                            <img src={ad.images[selectedImageIndex]?.image_url} alt="main" />
                            <button
                                className="arrow-button right"
                                onClick={() =>
                                    setSelectedImageIndex((prev) => (prev === ad.images.length - 1 ? 0 : prev + 1))
                                }
                            >
                                ›
                            </button>
                        </div>

                        <div className="thumbnail-list">
                            {ad.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.image_url}
                                    alt={`thumb-${index}`}
                                    className={index === selectedImageIndex ? 'active' : ''}
                                    onClick={() => setSelectedImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>


                    <div className="ad-characteristics">
                        <h3>Характеристики</h3>
                        <p><strong>Категория:</strong> {ad.categories?.name}</p>
                        <p><strong>Локация:</strong> {ad.location}</p>
                        <p><strong>Бренд:</strong> {ad.brand?.name}</p>
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
                        <h3 className='h3-brand'>{ad.brand?.name}</h3>
                        <h2>{ad.price} ₽</h2>
                        <button className="buy-button">Купить</button>
                        {ad.users.id === currentUserId ? (
                            <div className="seller-card owner-card">
                                <p className="owner-label">Это ваше объявление</p>
                                <div className="owner-actions">
                                    <button className="message-button">Редактировать</button>
                                    <button className="follow-button">Удалить</button>
                                </div>
                            </div>
                        ) : (
                            <div className="seller-card">
                                <div className="seller-header">
                                    <img
                                        className="seller-avatar"
                                        src={ad.users.avatar_url || 'default_profile_image.png'}
                                        alt={`${ad.users.username} avatar`}
                                    />
                                    <div className="seller-name-location">
                                        <p className="seller-name">{ad.users.username}</p>
                                        <p className="seller-location">{ad.location}</p>
                                    </div>
                                </div>
                                <div className="seller-actions">
                                    <button className="message-button" onClick={() => setShowMessageModal(true)}>Написать</button>
                                    <button className="follow-button">Подписаться</button>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
            {showMessageModal && (
                <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Сообщение продавцу</h3>
                            <button className="close-button" onClick={() => setShowMessageModal(false)}><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.8943 1.16637L12.8336 0.105713L7 5.93934L1.16637 0.105713L0.105713 1.16637L5.93934 7L0.105713 12.8336L1.16637 13.8943L7 8.06066L12.8336 13.8943L13.8943 12.8336L8.06066 7L13.8943 1.16637Z"></path></svg>
                            </button>
                        </div>
                        <hr />
                        <div className="modal-body">
                            <textarea
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Введите сообщение..."
                                rows={5}
                            />
                            <div className="modal-footer">
                                <p className="modal-guidelines">
                                    Пожалуйста, соблюдайте правила общения: уважайте собеседника, не используйте оскорблений и не публикуйте спам.
                                </p>
                                <button onClick={handleSendMessage} disabled={!messageText.trim()}>
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}
