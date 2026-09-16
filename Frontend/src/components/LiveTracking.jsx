import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

const center = {
    lat: -3.745,
    lng: -38.523
};

const geoapifyApiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

const RecenterOnMove = ({ position }) => {
    const map = useMap()
    useEffect(() => {
        map.setView(position)
    }, [ position, map ])
    return null
}

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <MapContainer
            center={[ currentPosition.lat, currentPosition.lng ]}
            zoom={15}
            zoomControl={false}
            style={{ width: '100%', height: '100%' }}
        >
            <TileLayer
                url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${geoapifyApiKey}`}
                attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ZoomControl position='bottomright' />
            <Marker position={[ currentPosition.lat, currentPosition.lng ]} />
            <RecenterOnMove position={[ currentPosition.lat, currentPosition.lng ]} />
        </MapContainer>
    )
}

export default LiveTracking
