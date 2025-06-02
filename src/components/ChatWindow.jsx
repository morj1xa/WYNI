import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';

export default function ChatWindow({ chat }) {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('token');
    const currentUserId = chat.currentUserId;

    // определяем собеседника (user2) и его имя
    const isSender = chat.sender_id === currentUserId;
    const user2 = isSender ? chat.receiver_id : chat.sender_id;
    const user2Name = isSender ? chat.receiver_name : chat.sender_name;

    const fetchMessages = () => {
        fetch('http://localhost:3000/chats/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                ad_id: chat.ad_id,
                user2,
            }),
        })
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error('Ошибка при загрузке сообщений', err));
    };

    useEffect(() => {
        const userData = localStorage.getItem('user');
        try {
            const user = JSON.parse(userData);
            setUser(user);
        } catch (error) {
            console.error('Ошибка при парсинге данных пользователя:', error);
        }
        if (!token) return;

        fetchMessages();
        const id = setInterval(fetchMessages, 2000);
        return () => clearInterval(id);

    }, [chat, token]);

    const handleNewMessage = (msg) => {
        setMessages(prev => [...prev, msg]);
    };

    return (
        <div className="chatWindow">
            <div className="messages">
                {messages.map((msg, index) => {
                    const isMine = msg.sender_id === currentUserId;
                    const prevMsg = messages[index - 1];
                    const isSameSenderAsPrev = prevMsg?.sender_id === msg.sender_id;

                    const senderName = isMine ? 'Вы' : (msg.sender_id === chat.sender_id ? chat.sender_name : chat.receiver_name);
                    const senderAvatar = isMine
                        ? user?.avatar_url
                        : (msg.sender_id === chat.sender_id ? chat.sender_avatar : chat.receiver_avatar);

                    return (
                        <div key={index} className={isMine ? 'myMsg' : 'otherMsg'}>
                            {!isSameSenderAsPrev && (
                                <div className={`msgHeader ${isMine ? 'right' : 'left'}`}>
                                    <img
                                        className="avatar"
                                        src={senderAvatar || '/default.png'}
                                        alt="avatar"
                                    />
                                    <span className="msgAuthor">{senderName}</span>
                                </div>
                            )}

                            <p>{msg.message}</p>
                        </div>

                    );
                })}
            </div>


            <MessageInput
                ad_id={chat.ad_id}
                sender_id={currentUserId}
                receiver_id={user2}
                onNewMessage={handleNewMessage}
            />
        </div>
    );
}
