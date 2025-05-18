import React, { useEffect, useState } from 'react';

export default function ChatList({ onSelectChat }) {
    const [chats, setChats] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        // Извлечь userId из токена
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setUserId(decoded.userId);
        } catch (e) {
            console.error('Ошибка при декодировании токена', e);
        }

        fetch("http://localhost:3000/chats/my", {
            headers: {
                Authorization: `Bearer ${token}`
            }
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

                return (
                    <div
                        key={`${chat.ad_id}-${otherUser?.id}`}
                        onClick={() => onSelectChat({ ...chat, currentUserId: userId })}
                        className="chat-list-item"
                    >
                        <p><strong>{chat.ads?.title || 'Без названия'}</strong></p>
                        <p>{otherUser?.username || 'Неизвестный пользователь'}</p>
                    </div>
                );
            })}
        </div>
    );
}
