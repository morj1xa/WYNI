import React from 'react';
import './ThreeHomeSections.css';

export default function ThreeHomeSections({ sections }) {
    return (
        <div className="three-sections-row">
            {sections.map((section, idx) => (
                <div key={idx} className="section-wrapper">
                    {section}
                </div>
            ))}
        </div>
    );
}
