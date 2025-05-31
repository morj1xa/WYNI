import './HomeSection.css';

export default function HomeSection({ title, items = [], onMoreClick }) {
    console.log('items:', items); // <== Проверка
    if (!items.length) return null;

    return (
        <div className="home-section">
            <h2 className="section-title">{title}</h2>
            <div className="ad-grid">
                {items.slice(0, 4).map((ad, index) => (
                    <div
                        key={ad.id}
                        className={`ad-card-section ${index === 3 ? 'ad-card-section--overlay' : ''}`}
                        onClick={() => index === 3 && onMoreClick()}
                    >
                        <img src={ad.images?.[0]?.image_url || 'placeholder.jpg'} alt={ad.title} />
                        {index === 3 && <div className="overlay">+ Смотреть ещё</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
