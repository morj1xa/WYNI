import TextPressure from "./TextPressure";
export default function Hero() {
    return (
        <section className="hero">
            <div className="overlay"></div>
            <video autoPlay muted loop className="hero-bg">
                <source src="/hero_video.mp4" type="video/mp4" />
            </video>
            <div className="hero-content">
                <TextPressure text="WYNI" minFontSize={500} />
            </div>
        </section>
    );
}