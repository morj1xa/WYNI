import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
    return (
        <div className="search-container">
            <FaSearch className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder="Искать здесь..."
            />
        </div>
    )
}