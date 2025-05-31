import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAdForm.css';
import CustomDropDown from './CustomDropDown';
import CategorySelector from './CategorySelector';
import BrandSelector from './BrandSelector';
import LocationPicker from './LocationPicker';
import ImageUploader from './ImageUploader';

export default function CreateAdForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [step, setStep] = useState(1);
    const [selectedMain, setSelectedMain] = useState('');
    const [selectedSub, setSelectedSub] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [brand, setBrand] = useState('')
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Загружаем категории
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Ошибка загрузки категорий:', err));
    }, []);

    // const topLevel = categories.filter(cat => !cat.parent_id); // Мужское, Женское

    // const currentMainGroup = categories.find(cat => cat.id === Number(selectedMain));
    // const subGroups = categories.filter(cat => cat.parent_id === Number(selectedMain));
    // const subGroupIds = subGroups.map(sub => sub.id);

    // const secondLevelOptions = categories.filter(cat =>
    //     selectedMain &&
    //     cat.parent_id &&
    //     subGroupIds.includes(cat.parent_id)
    // );

    const genderGroups = categories.filter(cat => !cat.parent_id);

    // Категории уровня 2 (одежда, обувь и т.д.)
    const secondLevel = categories.filter(cat => cat.parent_id === Number(selectedMain));

    // Категории уровня 3 (конкретные виды одежды)
    const thirdLevel = categories.filter(cat => secondLevel.map(c => c.id).includes(cat.parent_id));


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !categoryId || !price || !location || !brand || images.length === 0) {
            setError('Пожалуйста, заполните все поля и загрузите хотя бы одно фото');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Пожалуйста, войдите в систему');
            return;
        }

        const formData = new FormData();
        formData.append('brandId', brand);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', categoryId);
        formData.append('location', location);

        images.forEach(img => formData.append('images', img));

        try {
            const response = await fetch('http://localhost:3000/ads', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Объявление успешно создано!');
                setTimeout(() => navigate('/profile'), 2000);
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
            <h2 className="form-title">Создать объявление</h2>
            <form onSubmit={handleSubmit} className="create-ad-form">
                <CategorySelector onFinalCategorySelect={(id) => setCategoryId(id)} />

                {/* <div className="form-group">
                    <label>Бренд</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Название бренда"
                    />
                </div> */}

                <BrandSelector onBrandSelect={(id) => setBrand(id)} />

                <div className="form-group">
                    <label>Заголовок</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Заголовок"
                    />
                </div>

                <div className="form-group">
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Подробное описание"
                    />
                </div>

                <div className="form-row">
                    {/* <div className="form-group">
                        <label>Категория</label>
                        <select
                            value={step === 1 ? selectedMain : selectedSub}
                            onChange={(e) => {
                                if (step === 1) {
                                    setSelectedMain(e.target.value);
                                    setStep(2);
                                } else {
                                    setSelectedSub(e.target.value);
                                    setCategoryId(e.target.value); // Заполняем финальный category_id
                                }
                            }}
                        >
                            <option value="">{step === 1 ? 'Выберите пол' : 'Выберите тип'}</option>
                            {(step === 1 ? genderGroups : secondLevel).map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                style={{ marginTop: '5px', fontSize: '12px', color: '#555' }}
                            >
                                ← Назад к выбору пола
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Тип вещи</label>
                        <select
                            value={selectedSub}
                            onChange={(e) => {
                                setSelectedSub(e.target.value);
                                setCategoryId(e.target.value); // Финальная категория
                            }}
                            disabled={secondLevel.length === 0}
                        >
                            <option value="">{secondLevel.length === 0 ? 'Выберите категорию выше' : 'Выберите тип'}</option>
                            {thirdLevel.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div> */}


                    <div className="form-group">
                        <label>Цена</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="₽"
                        />
                    </div>
                </div>


                <div className="form-group">
                    <label>Локация</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Город, район"
                    />
                </div>

                {/* <div className="form-group">
                    <label>Изображения</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <div className="image-preview-list">
                        {imagePreviews.map((src, idx) => (
                            <img key={idx} src={src} alt={`preview-${idx}`} className="image-preview" />
                        ))}
                    </div>
                </div> */}

                <ImageUploader images={images} setImages={setImages} />


                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}

                <button type="submit" className="submit-btn">Опубликовать</button>
            </form>
        </div>
    );
}
