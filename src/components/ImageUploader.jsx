import React, { useRef } from 'react';
import './ImageUploader.css';

export default function ImageUploader({ images, setImages }) {
    const inputRefs = [useRef(), useRef(), useRef()];

    const handleImageChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    };

    const handleClick = (index) => {
        inputRefs[index].current.click();
    };

    const renderImageSlot = (index, isMain = false) => (
        <div
            className={isMain ? 'main-image-slot' : 'side-image-slot'}
            onClick={() => handleClick(index)}
        >
            {images[index] ? (
                <>
                    <img
                        src={URL.createObjectURL(images[index])}
                        alt={`preview-${index}`}
                        className="image-preview"
                    />
                    <button
                        type="button"
                        className="remove-button"
                        onClick={(e) => {
                            e.stopPropagation(); // <== главное!
                            handleRemoveImage(index);
                        }}
                    >
                        &times;
                    </button>
                </>
            ) : (
                <span className="upload-placeholder">+</span>
            )}
            <input
                type="file"
                accept="image/*"
                ref={inputRefs[index]}
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                hidden
            />
        </div>
    );

    return (
        <div className="image-upload-wrapper">
            {renderImageSlot(0, true)}
            <div className="side-image-slots">
                {renderImageSlot(1)}
                {renderImageSlot(2)}
            </div>
        </div>
    );
}
