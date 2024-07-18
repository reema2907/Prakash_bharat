import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

const StreetLightComplaintForm = () => {
    const [complaint, setComplaint] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const initMap = () => {
            if (mapRef.current === null) {
                mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
            }
        };

        initMap();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        if (mapRef.current) {
            mapRef.current.setView([position.coords.latitude, position.coords.longitude], 13);
            L.marker([position.coords.latitude, position.coords.longitude]).addTo(mapRef.current);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Complaint: " + complaint);
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
    };

    return (
        <div className="container">
            <h1>Street Light Complaint Form</h1>
            <form id="complaintForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="complaint">Complaint Description:</label>
                    <textarea
                        className="form-control"
                        id="complaint"
                        name="complaint"
                        rows="4"
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-attach">
                    <label htmlFor="fileInput">Choose an Image:</label>
                    <input type="file" id="fileInput" name="fileInput" />
                    <input type="submit" value="Upload" />
                </div>
                <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="latitude"
                        name="latitude"
                        readOnly
                        value={latitude}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="longitude"
                        name="longitude"
                        readOnly
                        value={longitude}
                    />
                </div>
                <div id="map" ref={mapContainerRef} style={{ height: '300px' }}></div>
                <button type="button" className="btn btn-primary" onClick={getLocation}>
                    Get My Location
                </button>
                <button type="submit" className="btn btn-success">
                    Submit Complaint
                </button>
            </form>
        </div>
    );
};

export default StreetLightComplaintForm;
