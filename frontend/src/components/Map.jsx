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

const S3_BASE_CSV_URL = "https://pms-te-mp-review-1.s3.ap-south-1.amazonaws.com/daily-summary/";
const S3_BASE_IMAGE_URL = "https://pms-te-mp-review-1.s3.ap-south-1.amazonaws.com/roadside-detections/";

const Map = () => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [polylineData, setPolylineData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedDateISO, setSelectedDateISO] = useState("2024-12-09");
  const [csvFileName, setCsvFileName] = useState("09_12_2024_location.csv");

  // 📌 Fetch Polyline Route from Local CSV File
  useEffect(() => {
    const loadPolylineCSV = async () => {
      try {
        const response = await fetch(`/${csvFileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch local CSV: ${csvFileName}`);
        }
        const text = await response.text();
        const result = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
        });

        const polylinePoints = result.data
          .map(row => [row.latitude, row.longitude])
          .filter(point => point[0] !== undefined && point[1] !== undefined);

        setPolylineData(polylinePoints);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPolylineCSV();
  }, [csvFileName]);

  // 📌 Fetch Object Markers from S3 CSV
  useEffect(() => {
    const formattedDate = selectedDateISO.split("-").reverse().join("_"); // Convert "YYYY-MM-DD" to "DD_MM_YYYY"
    const csvUrl = `${S3_BASE_CSV_URL}${formattedDate}.csv`;

    const loadS3CSV = async () => {
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch S3 CSV: ${csvUrl}`);
        }
        const text = await response.text();
        const result = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
        });

        const parsedMarkers = result.data
          .map(row => ({
            lat: row.Latitude,
            lng: row.Longitude,
            object: row.Object,
            imageUrl: `${S3_BASE_IMAGE_URL}detections_${formattedDate}/${row["Image Name"]}`
          }))
          .filter(point => point.lat !== undefined && point.lng !== undefined);

        setMarkers(parsedMarkers);
      } catch (err) {
        setError(err.message);
      }
    };

    loadS3CSV();
  }, [selectedDateISO]);

  // 📌 Fetch User's Current Location
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

  // 📌 Handle Date Change for Both S3 & Local CSV Files
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDateISO(newDate);
  
    // Convert "YYYY-MM-DD" to "DD_MM_YYYY_location.csv"
    const [year, month, day] = newDate.split("-");
    const newCsvFileName = `${day}_${month}_${year}_location.csv`;
  
    setCsvFileName(newCsvFileName);
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-gray-50 py-12 p-6'>
      <DateSelector selectedDate={selectedDateISO} onDateChange={handleDateChange} />
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%', minHeight: '600px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 📍 User's Current Location */}
      
        {/* 📍 Pavement Object Markers from S3 CSV */}
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <strong>Type:</strong> {marker.object} <br />
              <img src={marker.imageUrl} alt="Object" style={{ width: "100px", height: "100px" }} />
            </Popup>
          </Marker>
        ))}

        {/* 📍 Route Polyline from Local CSV */}
        {polylineData.length > 0 && <Polyline positions={polylineData} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default Map;
