import React, { useEffect, useState } from 'react';
import './ChatList.css'; // Добавим стили

export default function ChatList({ onSelectChat }) {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setUserId(decoded.userId);
        } catch (e) {
            console.error('Ошибка при декодировании токена', e);
        }

        fetch("http://localhost:3000/chats/my", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setChats(data))
            .catch(err => console.error('Ошибка при загрузке чатов', err));
    }, []);

    if (userId === null) return <p>Загрузка...</p>;

    return (
        <div className="chatList">
            <h2>Мои чаты</h2>
            {chats.map(chat => {
                const otherUser = chat.sender_id === userId
                    ? chat.users_messages_receiver_idTousers
                    : chat.users_messages_sender_idTousers;

                const adTitle = chat.ads?.title || 'Без названия';
                const adImage = chat.ads.images[0].image_url || 'placeholderImage.jpg';
                console.log(chat.ads.images);

                return (
                    <div
                        key={`${chat.ad_id}-${otherUser?.id}`}
                        onClick={() => onSelectChat({
                            ...chat,
                            currentUserId: userId,
                            sender_name: chat.users_messages_sender_idTousers?.username,
                            receiver_name: chat.users_messages_receiver_idTousers?.username,
                            sender_avatar: chat.users_messages_sender_idTousers?.avatar_url,
                            receiver_avatar: chat.users_messages_receiver_idTousers?.avatar_url,
                        })}
                        className="chat-list-item"
                    >
                        <img src={adImage} alt="Ad" className="chat-ad-thumb" />
                        <div className="chat-info">
                            <p className="chat-username">{otherUser?.username || 'Пользователь'}</p>
                            <p className="chat-title">{adTitle}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
