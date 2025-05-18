import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';

export default function ChatWindow({ chat }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const user2 = chat.sender_id === chat.currentUserId
            ? chat.receiver_id
            : chat.sender_id;

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
    }, [chat]);

    const token = localStorage.getItem('token');
    const currentUserId = chat.currentUserId;

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
            />
        </div>
    );
}
