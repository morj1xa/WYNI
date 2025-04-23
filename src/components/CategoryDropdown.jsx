import { useState, useEffect, useRef } from "react";
import './CategoryDropdown.css';

const categories = {
    'Одежда': ['Футболки', 'Куртки', 'Худи', 'Джинсы'],
    'Обувь': ['Кроссовки', 'Ботинки', 'Сандалии'],
    'Аксессуары': ['Сумки', 'Очки', 'Часы']
};

export default function CategoryDropdown() {
    const [activeCategory, setActiveCategory] = useState(null);
    const menuRef = useRef(null);

    // Закрытие по клику вне меню
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveCategory(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleCategory = (cat) => {
        setActiveCategory((prev) => (prev === cat ? null : cat));
    };

    return (
        <nav className="category-nav" ref={menuRef}>
            <ul className="category-menu">
                {Object.keys(categories).map((cat) => (
                    <li key={cat}>
                        <span
                            className={`category-link ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => toggleCategory(cat)}
                        >
                            {cat}
                        </span>

                        {activeCategory === cat && (
                            <ul className="dropdown">
                                {categories[cat].map((item) => (
                                    <li key={item} className="dropdown-item">{item}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
