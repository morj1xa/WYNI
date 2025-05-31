import React, { useState, useEffect } from 'react';

export default function BrandSelector({ onBrandSelect }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (inputValue.length < 1) return setSuggestions([]);

        const timer = setTimeout(() => {
            fetch(`http://localhost:3000/brands?search=${inputValue}`)
                .then(res => res.json())
                .then(data => setSuggestions(data))
                .catch(err => console.error(err));
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [inputValue]);

    const handleSelect = (brand) => {
        setInputValue(brand.name);
        onBrandSelect(brand.id); // передаем id в родительский компонент
        setShowSuggestions(false);
    };

    return (
        <div className="form-group" style={{ position: 'relative' }}>
            <label>Бренд</label>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowSuggestions(true);
                }}
                placeholder="Название бренда"
                autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((brand) => (
                        <li key={brand.id} onClick={() => handleSelect(brand)}>
                            {brand.name}
                        </li>
                    ))}
                </ul>
            )}
            <style jsx>{`
                .suggestions-list {
                    position: absolute;
                    top: 100%; /* появится сразу под input */
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #ccc;
                    max-height: 150px;
                    overflow-y: auto;
                    z-index: 3; /* выше input */
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                .suggestions-list li {
                    padding: 8px;
                    cursor: pointer;
                }
                .suggestions-list li:hover {
                    background-color: #f0f0f0;
                }
            `}</style>
        </div>
    );
}
