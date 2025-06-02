import React, { useState } from 'react';
import './ProfileEditModal.css';

export default function ProfileEditModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const token = localStorage.getItem('token');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let updatedUser = null;
            if (username) {
                const res = await fetch('http://localhost:3000/users/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ username }),
                });
                if (!res.ok) throw new Error('Ошибка обновления имени');
                updatedUser = await res.json();
            }

            if (avatar) {
                const formData = new FormData();
                formData.append('avatar', avatar);

                const avatarRes = await fetch('http://localhost:3000/users/avatar', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
                if (!avatarRes.ok) throw new Error('Ошибка загрузки аватара');
                updatedUser = await avatarRes.json();
            }

            if (updatedUser) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                alert('Профиль обновлён');
                onClose();
                window.location.reload(); // или вызывай setUser(updatedUser) если есть
            }

        } catch (err) {
            console.error('Ошибка обновления профиля:', err);
            alert('Ошибка');
        }
    };

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>Редактировать профиль</h2>
                <form onSubmit={handleSubmit}>
                    <label>Новое имя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введите имя"
                    />

                    <label>Аватар:</label>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    {preview && <img src={preview} alt="Превью" className="avatarPreview" />}

                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        </div>
    );
}
