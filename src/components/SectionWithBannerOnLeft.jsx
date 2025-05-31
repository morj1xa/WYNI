import React from 'react';
import './SectionWithBannerOnLeft.css';

export default function SectionWithBannerOnLeft({ section, bannerImage }) {
    return (
        <div className="section-banner-wrapper">

            <div className="left-banner">
                <img src={bannerImage} alt="Banner" className="banner-img" />
            </div>
            <div className="right-section">
                {section}
            </div>
        </div>
    );
}
