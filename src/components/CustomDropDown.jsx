import React, { useState } from 'react';

// Иконки для примера (можно расширить или импортировать из иконок)
const icons = {
    tops: (
        <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 6.25H13.9L14.12 5.916L15.81 3.38L21.25 5.05V10.75H18.5H17.75V11.5V20.75H12.25H7.5H6.25V11.5V10.75H5.5H2.75V5.05L8.18 3.38L9.87 5.91L10.1 6.25H10.5H13.5Z" />
        </svg>
    ),
    bottoms: (
        <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.75 3.75L17.25 1.5H14.75H6.75L6.25 3.75M17.75 3.75L18.25 6L19.25 22.5H13.5L12.75 8.5H11.25L10.5 22.5H4.75L5.75 6L6.25 3.75M17.75 3.75H14.75H6.25" />
        </svg>
    ),
    outerwear: (
        <svg height="24" width="24" viewBox="0 0 24 24" fill="#737373" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.19 1.25L8.25 2.19V2.49L6.07 3.36L2.25 7.19V18.81L3.62 20.18L5.25 20.58V21.31L6.69 22.75H17.31L18.75 21.31V20.58L20.38 20.18L21.75 18.81V7.19L17.92 3.36L15.75 2.49V2.19L14.81 1.25H9.19ZM9.81 2.75L9.75 2.81V4.19L12 6.44L14.25 4.19V2.81L14.19 2.75H9.81ZM12.75 7.81V8.75H17.25V4.81L17.08 4.64L15.75 4.11V4.81L12.75 7.81ZM12.75 10.25V12.75H17.25V10.25H12.75ZM12.75 14.25V16.75H17.25V14.25H12.75ZM12.75 18.25V21.25H16.69L17.25 20.69V18.25H12.75ZM11.25 7.81L8.25 4.81V4.11L6.92 4.64L6.75 4.81V8.75H11.25V7.81ZM11.25 10.25H6.75V12.75H11.25V10.25ZM11.25 14.25H6.75V16.75H11.25V14.25ZM11.25 18.25H6.75V20.69L7.31 21.25H11.25V18.25ZM5.25 18.04V19.03L4.38 18.82L3.75 18.19V17.54L5.25 18.04ZM5.25 16.46L3.75 15.96V14.04L5.25 14.54V16.46ZM5.25 12.96L3.75 12.46V10.04L5.25 10.54V12.96ZM5.25 8.96L3.75 8.46V7.81L5.25 6.31V8.96ZM18.75 18.04V19.03L19.61 18.82L20.25 18.19V17.54L18.75 18.04ZM18.75 16.46L20.25 15.96V14.04L18.75 14.54V16.46ZM18.75 12.96L20.25 12.46V10.04L18.75 10.54V12.96ZM18.75 8.96L20.25 8.46V7.81L18.75 6.31V8.96Z" />
        </svg>
    ),
    footwear: (
        <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 13.5V12L17 10.5L12.5 7.5H11.5L9.5 9.25H7.5L6 7.5L4.5 7.25L3 11.98V12.5M22 13.5L21 15L18 16.75H12L9.5 15.75L8 16.75H4.5L2 15V13.98L3 12.5M22 13.5L17 14.25L13 12.75L11 13.75L6.5 12.25L3 12.5" />
        </svg>
    ),
};

const categories = [
    { id: 'tops', label: 'Tops', icon: icons.tops },
    { id: 'bottoms', label: 'Bottoms', icon: icons.bottoms },
    { id: 'outerwear', label: 'Outerwear', icon: icons.outerwear },
    { id: 'footwear', label: 'Footwear', icon: icons.footwear },
];

function CustomDropDown() {
    const [open, setOpen] = useState(false);
    const [selectedPath, setSelectedPath] = useState(['Menswear']); // массив для возможной вложенности
    const [currentOptions, setCurrentOptions] = useState(categories);

    // Обработка клика по опции
    const handleSelect = (option) => {
        // В этом примере нет вложенности, но можно добавить
        setSelectedPath([...selectedPath, option.label]);
        setOpen(false);
    };

    // Назад к предыдущему уровню (если вложенность будет)
    const handleBack = () => {
        if (selectedPath.length > 1) {
            setSelectedPath(selectedPath.slice(0, -1));
            // Вернуть опции для предыдущего уровня, если есть вложенность
            setCurrentOptions(categories);
        }
    };

    return (
        <div className="custom-dropdown" style={{ position: 'relative', width: 220 }}>
            <div
                role="textbox"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="dropdown-input"
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setOpen(!open);
                    }
                }}
                style={{
                    border: '1px solid #ccc',
                    padding: '8px 12px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    userSelect: 'none',
                    backgroundColor: '#fff',
                }}
            >
                {selectedPath.join(' / ')}
            </div>

            {open && (
                <div
                    role="listbox"
                    tabIndex={-1}
                    className="dropdown-menu"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        maxHeight: 250,
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        backgroundColor: '#fff',
                        marginTop: 4,
                        zIndex: 1000,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    {selectedPath.length > 1 && (
                        <div
                            role="button"
                            tabIndex={0}
                            className="dropdown-back"
                            onClick={handleBack}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleBack();
                            }}
                            style={{
                                padding: '8px 12px',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#333',
                                fontWeight: 'bold',
                            }}
                        >
                            ← Back
                        </div>
                    )}

                    {currentOptions.map((option) => (
                        <div
                            key={option.id}
                            role="option"
                            tabIndex={0}
                            aria-selected={selectedPath.includes(option.label)}
                            className="dropdown-option"
                            onClick={() => handleSelect(option)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleSelect(option);
                                }
                            }}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                backgroundColor: selectedPath.includes(option.label) ? '#f0f0f0' : '#fff',
                            }}
                        >
                            <div style={{ width: 24, height: 24 }}>{option.icon}</div>
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomDropDown;
