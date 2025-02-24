import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const locations = [
    { lat: 19.0587, lng: 72.8997, name: 'Chembur Railway Station' },
    { lat: 19.0660, lng: 72.8885, name: 'Amchi Shala' },
    { lat: 19.0718, lng: 72.8879, name: 'Kalachauki, Mahul' },
  ];

  const Map = () => {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [polylineData, setPolylineData] = useState([]); // State to store polyline data
  
    
  
    useEffect(() => {
      // Load and parse the CSV file
      const loadCSV = async () => {
        try {
          const response = await fetch('/Data_ride_4_location.csv'); // Replace with your CSV file path
          const text = await response.text();
          console.log('CSV Data:', text); // Debugging: Inspect the loaded CSV data
          const result = Papa.parse(text, {
            header: true,
            dynamicTyping: true,
          });
  
          // Extract latitude and longitude columns and filter out invalid rows
          const data = result.data
            .map(row => [row.latitude, row.longitude])
            .filter(point => point[0] !== undefined && point[1] !== undefined);
  
          console.log('Parsed Polyline Data:', data); // Debugging: Inspect the parsed data
          setPolylineData(data); // Set polyline data
        } catch (err) {
          console.error('Error loading CSV file:', err);
        }
      };
  
      loadCSV();
  
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className='bg-gray-50 py-12 p-6'>
        <div>
            Date Choose
        </div>
        <div>
          <div>
            {/* Map Section */}
            <div style={{padding: '20px'}}>
            <MapContainer center={position} zoom={13} style={{width: '100%', height: '100%', minHeight: '600px'}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {position && (
                <Marker position={position}>
                  <Popup>You are here!</Popup>
                </Marker>
              )}
              {locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
              {/* Draw the polyline only if data is available */}
              {polylineData.length > 0 && (
                <Polyline positions={polylineData} color="blue" />
              )}
            </MapContainer>
  
            </div>
          </div>
        </div>
      </div>
  
    );
  };
  
  export default Map;