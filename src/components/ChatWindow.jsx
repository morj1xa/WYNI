import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';

export default function ChatWindow({ chat }) {
    const [messages, setMessages] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const token = localStorage.getItem('token');
    const currentUserId = chat.currentUserId;

    const user2 = chat.sender_id === currentUserId
        ? chat.receiver_id
        : chat.sender_id;

    // загрузка сообщений
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
        if (!token) return;

        fetchMessages();

        const id = setInterval(fetchMessages, 2000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [chat, token]);

    const handleNewMessage = (msg) => {
        setMessages(prev => [...prev, msg]);
    };

    return (
        <div className="chatWindow">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender_id === currentUserId ? 'myMsg' : 'otherMsg'}>
                        <p>{msg.message}</p>
                    </div>
                ))}
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
