import React, { useState } from 'react';

export default function MessageInput({ ad_id, sender_id, receiver_id, onNewMessage }) {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (!message.trim()) return;

        fetch('http://localhost:3000/chats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ad_id, sender_id, receiver_id, message }),
        })
            .then(res => res.json())
            .then(data => {
                onNewMessage(data); // добавляем в список сообщений
                setMessage('');
            })
            .catch(err => console.error('Ошибка отправки сообщения', err));
    };

    return (
        <div className="messageInput">
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
}
