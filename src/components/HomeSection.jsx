import { useNavigate } from 'react-router-dom';
import './HomeSection.css';

export default function HomeSection({ title, items = [], linkTarget }) {
    const navigate = useNavigate();

    if (!items.length) return null;

    const handleMoreClick = () => {
        if (linkTarget) {
            navigate(linkTarget);
        }
    };

    return (
        <div className="home-section">
            <h2 className="section-title">{title}</h2>
            <div className="ad-grid">
                {items.slice(0, 4).map((ad, index) => (
                    <div
                        key={ad.id}
                        className={`ad-card-section ${index === 3 ? 'ad-card-section--overlay' : ''}`}
                        onClick={() => index === 3 && handleMoreClick()}
                    >
                        <img src={ad.images?.[0]?.image_url || 'placeholder.jpg'} alt={ad.title} />
                        {index === 3 && <div className="overlay">+ Смотреть ещё</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
