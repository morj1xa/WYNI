import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <p className="footer-text">&copy; {new Date().getFullYear()} WYNI. Все права защищены.</p>
                <div className="footer-links">
                    <a href="/about">О нас</a>
                    <a href="/contact">Контакты</a>
                    <a href="/privacy">Политика конфиденциальности</a>
                </div>
            </div>
        </footer>
    );
}
