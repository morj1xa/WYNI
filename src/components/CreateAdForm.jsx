import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAdForm() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState(null); // Для хранения выбранных изображений
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !categoryId || !price || !location) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Пожалуйста, войдите в систему');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', categoryId);
        formData.append('location', location);

        // Добавляем изображения
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        try {
            const response = await fetch('http://localhost:3000/ads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Объявление успешно создано');
                setTimeout(() => navigate('/profile'), 2000); // Перенаправление на профиль через 2 секунды
            } else {
                setError(data.error || 'Ошибка при создании объявления');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            setError('Ошибка при отправке данных');
        }
    };

    return (
        <div className="create-ad-container">
            <h2>Создать объявление</h2>
            <form onSubmit={handleSubmit} className="create-ad-form">
                <div>
                    <label>Заголовок:</label>
                    <input
                        type="text"
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Категория:</label>
                    <input
                        type="text"
                        placeholder="Категория"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Цена:</label>
                    <input
                        type="number"
                        placeholder="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Локация:</label>
                    <input
                        type="text"
                        placeholder="Локация"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Изображения:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}

                <button type="submit">Опубликовать</button>
            </form>
        </div>
    );
};

