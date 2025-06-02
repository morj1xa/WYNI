import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/filter/search/${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="search-container">

            <form onSubmit={handleSubmit} className="search-form">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Искать здесь..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className='search-button' onClick={() => {
                    if (query.trim()) {
                        navigate(`/filter/search/${encodeURIComponent(query.trim())}`);
                    }
                }}>Найти</button>
            </form>
        </div >
    )
}