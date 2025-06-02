import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Для навигации
import ProfileCard from '../components/ProfileCard';
import UsersAds from '../components/UsersAds';
import ProfileTabs from '../components/ProfileTabs';


export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Для перенаправления

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/authorization');
            return;
        }

        try {
            const user = JSON.parse(userData);
            setUser(user);
        } catch (error) {
            console.error('Ошибка при парсинге данных пользователя:', error);
            navigate('/authorization');
        }
    }, [navigate]);


    if (!user) {
        return <div>Загрузка...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/authorization');
    }

    const navigateToAdCreation = () => {
        navigate('/createad');
    }

    return (

        <div className='main'>
            <ProfileCard
                username={user.username}
                avatarUrl={user.avatar_url}
                handleLogout={handleLogout}
                navigateToAdCreation={navigateToAdCreation} />
            <ProfileTabs userId={user.id} btn={<button onClick={navigateToAdCreation}>
                + Создать объявление
            </button>} />

        </div>
    );
};
