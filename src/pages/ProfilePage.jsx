import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Для навигации
import ProfileCard from '../components/ProfileCard';
import UsersAds from '../components/UsersAds';

const ProfilePage = () => {
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
            const user = JSON.parse(userData);  // Преобразуем строку JSON обратно в объект
            setUser(user);
        } catch (error) {
            console.error('Ошибка при парсинге данных пользователя:', error);
            navigate('/authorization');  // Если данные не валидны, перенаправляем на логин
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
        <div>
            <ProfileCard
                username={user.username}
                handleLogout={handleLogout}
                navigateToAdCreation={navigateToAdCreation} />
            <UsersAds />
        </div>
    );
};

export default ProfilePage;
