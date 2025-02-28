import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import DateSelector from './DateSelector';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = () => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [polylineData, setPolylineData] = useState([]);
  const [selectedDateISO, setSelectedDateISO] = useState("2024-02-26");
  const [csvFileName, setCsvFileName] = useState("26_feb_location.csv");

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(`/${csvFileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${csvFileName}`);
        }
        const text = await response.text();
        const result = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
        });
        const data = result.data
          .map(row => [row.latitude, row.longitude])
          .filter(point => point[0] !== undefined && point[1] !== undefined);
        setPolylineData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCSV();
  }, [csvFileName]);

  useEffect(() => {
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

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDateISO(newDate);
    const dateObj = new Date(newDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    const fileName = `${day}_${month}_location.csv`;
    setCsvFileName(fileName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-gray-50 py-12 p-6'>
      <DateSelector selectedDate={selectedDateISO} onDateChange={handleDateChange} />
      <div>
        <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%', minHeight: '600px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {position && (
            <Marker position={position}>
              <Popup>You are here!</Popup>
            </Marker>
          )}
          {polylineData.length > 0 && (
            <Polyline positions={polylineData} color="blue" />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;