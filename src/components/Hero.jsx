export default function Hero() {
    return (
        <section className="hero">
            <div className="overlay"></div>
            <video autoPlay muted loop className="hero-bg">
                <source src="/hero_video.mp4" type="video/mp4" />
            </video>
            <div className="hero-content">
                <h1>Добро пожаловать!</h1>
                <p>Это текст на фоне фото или видео. Нужно сюда что-то вписать</p>
                <div className="hero-buttons">
                    <a href="#" className="hero-btn">Читать</a>
                </div>
            </div>
        </section>
    );
}