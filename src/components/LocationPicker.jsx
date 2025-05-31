import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function LocationMarker({ setLocation }) {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setLocation(`${e.latlng.lat},${e.latlng.lng}`);
        },
    });

    return position === null ? null : <Marker position={position} />;
}

export default function LocationPicker({ onLocationChange }) {
    const [location, setLocation] = useState('');

    return (
        <div className="form-group">
            <label>Выберите место на карте:</label>
            <MapContainer center={[55.751244, 37.618423]} zoom={10} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker setLocation={(loc) => {
                    setLocation(loc);
                    onLocationChange(loc);
                }} />
            </MapContainer>
            {location && <small>Вы выбрали: {location}</small>}
        </div>
    );
}
