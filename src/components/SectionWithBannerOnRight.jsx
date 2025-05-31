import React from 'react';
import './SectionWithBannerOnRight.css';

export default function SectionWithBannerOnRight({ section, bannerImage }) {
    return (
        <div className="section-banner-wrapper">
            <div className="left-section">
                {section}
            </div>
            <div className="right-banner">
                <img src={bannerImage} alt="Banner" className="banner-img" />
            </div>
        </div>
    );
}
