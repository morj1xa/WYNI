import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './CategoryDropdown.css';

export default function CategoryDropdown() {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Построение дерева из списка категорий
    const buildCategoryTree = (items) => {
        const map = {};
        const tree = [];

        items.forEach(item => {
            map[item.id] = { ...item, children: [] };
        });

        items.forEach(item => {
            if (item.parent_id) {
                map[item.parent_id]?.children.push(map[item.id]);
            } else {
                tree.push(map[item.id]);
            }
        });

        return tree;
    };

    useEffect(() => {
        // Подгрузка категорий
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => {
                const tree = buildCategoryTree(data);
                const male = tree.find(cat => cat.name === 'Мужской');
                const female = tree.find(cat => cat.name === 'Женский');
                setCategories([
                    { name: 'Бренды', type: 'brand' },
                    male,
                    female
                ]);
            });

        fetch('http://localhost:3000/brands')
            .then(res => res.json())
            .then(data => setBrands(data));
    }, []);

    const toggleCategory = (catName) => {
        setActiveCategory(prev => (prev === catName ? null : catName));
    };

    const handleItemClick = (type, value) => {
        navigate(`/filter/${type}/${encodeURIComponent(value)}`);
        setActiveCategory(null);
    };

    return (
        <nav className="category-nav" ref={menuRef}>
            <ul className="category-menu">
                {categories.map((cat) => (
                    <li key={cat.name}>
                        <span
                            className={`category-link ${activeCategory === cat.name ? 'active' : ''}`}
                            onClick={() => toggleCategory(cat.name)}
                        >
                            {cat.name}
                        </span>

                        {activeCategory === cat.name && (
                            <ul className="dropdown">
                                {cat.name === 'Бренды' ? (
                                    brands.map((brand) => (
                                        <li
                                            key={brand.id}
                                            className="dropdown-item"
                                            onClick={() => handleItemClick('brand', brand.name)}
                                        >
                                            {brand.name}
                                        </li>
                                    ))
                                ) : (
                                    cat.children?.map(sub => (
                                        <li key={sub.id} className="dropdown-item">
                                            <span>{sub.name}</span>
                                            {sub.children?.length > 0 && (
                                                <ul className="sub-dropdown">
                                                    {sub.children.map(child => (
                                                        <li
                                                            key={child.id}
                                                            className="dropdown-item"
                                                            onClick={() => handleItemClick('category', child.name)}
                                                        >
                                                            {child.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
