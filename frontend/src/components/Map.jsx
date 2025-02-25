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


const Map = () => {
  // User geolocation
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CSV / Polyline Data
  const [polylineData, setPolylineData] = useState([]);
  // State for selected date in ISO format (yyyy-mm-dd)
  const [selectedDateISO, setSelectedDateISO] = useState("2024-02-26");
  const [csvFileName, setCsvFileName] = useState("26_feb_location.csv");

  // Effect to load CSV file whenever the file name changes.
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(`/${csvFileName}`); // Assumes CSV files are in the public folder
        if (!response.ok) {
          throw new Error(`Failed to fetch ${csvFileName}`);
        }
        const text = await response.text();
        console.log('CSV Data:', text);
        const result = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
        });

        // Extract valid latitude and longitude points
        const data = result.data
          .map(row => [row.latitude, row.longitude])
          .filter(point => point[0] !== undefined && point[1] !== undefined);
        console.log('Parsed Polyline Data:', data);
        setPolylineData(data);
      } catch (err) {
        console.error('Error loading CSV file:', err);
        setError(err.message);
      }
    };

    loadCSV();
  }, [csvFileName]);

  // Effect to get the user's current location (runs only once)
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

  // Handle date change from the date input
  const handleDateChange = (e) => {
    const newDate = e.target.value; // Expecting format "yyyy-mm-dd"
    setSelectedDateISO(newDate);

    // Convert date into the file name format "D_mmm_location.csv"
    // For example, "2023-02-26" becomes "26_feb_location.csv"
    const dateObj = new Date(newDate);
    const day = dateObj.getDate(); // e.g., 26
    // Get short month name and convert to lowercase, e.g., "Feb" -> "feb"
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    const fileName = `${day}_${month}_location.csv`;
    setCsvFileName(fileName);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-gray-50 py-12 p-6'>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="datePicker" style={{ marginRight: '10px' }}>Select Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDateISO}
          onChange={handleDateChange}
        />
      </div>
      
      <div>
        {/* Map Section */}
        <div style={{ padding: '20px' }}>
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
            {/* Draw the polyline if data is available */}
            {polylineData.length > 0 && (
              <Polyline positions={polylineData} color="blue" />
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
