import React, { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './ChatPage.css';

export default function ChatPage({ userId }) {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="chatPage">
            <ChatList userId={userId} onSelectChat={setSelectedChat} />
            {selectedChat && (
                <ChatWindow userId={userId} chat={selectedChat} />
            )}
        </div>
    );
}
