import React, { useEffect, useState } from 'react';

export default function CategorySelector({ onFinalCategorySelect = () => { } }) {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Ошибка загрузки категорий:', err));
    }, []);

    useEffect(() => {
        if (selectedItem) {
            onFinalCategorySelect(selectedItem);
        }
    }, [selectedItem]);

    const genderOptions = categories.filter(cat => cat.level === 1);
    const groupOptions = categories.filter(cat => cat.parent_id === Number(selectedGender));
    const itemOptions = categories.filter(cat => cat.parent_id === Number(selectedGroup));

    return (
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
            <div>
                <label htmlFor="gender">Пол</label>
                <select
                    id="gender"
                    value={selectedGender}
                    onChange={(e) => {
                        setSelectedGender(e.target.value);
                        setSelectedGroup('');
                        setSelectedItem('');
                    }}
                >
                    <option value="">Выберите пол</option>
                    {genderOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="group">Категория</label>
                <select
                    id="group"
                    value={selectedGroup}
                    onChange={(e) => {
                        setSelectedGroup(e.target.value);
                        setSelectedItem('');
                    }}
                    disabled={!selectedGender}
                >
                    <option value="">Выберите категорию</option>
                    {groupOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="item">Тип вещи</label>
                <select
                    id="item"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    disabled={!selectedGroup}
                >
                    <option value="">Выберите тип</option>
                    {itemOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
