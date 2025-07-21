import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function Monitor() {
    const [filters, setFilters] = useState({ type: "", date: "" });
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searched, setSearched] = useState(false);

    const fetchCSVData = async (date) => {
        if (!date) return;
        const formattedDate = date.split("-").reverse().join("_"); // Convert YYYY-MM-DD to DD-MM-YYYY
        const csvUrl = `https://pms-te-mp-review-1.s3.ap-south-1.amazonaws.com/daily-summary/${formattedDate}.csv`;

        try {
            const response = await fetch(csvUrl);
            const csvText = await response.text();
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    setData(result.data);
                },
            });
        } catch (error) {
            console.error("Error fetching CSV data:", error);
        }
    };

    useEffect(() => {
        if (filters.date) fetchCSVData(filters.date);
    }, [filters.date]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleSearch = () => {
        let filtered = data;
        setSearched(true);

        if (filters.type) {
            filtered = filtered.filter((item) => item.Object.toLowerCase() === filters.type.toLowerCase());
        }

        setFilteredData(filtered);
    };

    return (
        <div className="container">
            <div className="mt-3">
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Type of Pavement Object</label>
                        <select name="type" value={filters.type} onChange={handleFilterChange} className="form-select">
                            <option value="">Select Type</option>
                            <option value="construction-material">Construction Material</option>
                            <option value="street-vendor">Street Vendor</option>
                            <option value="tree">Tree</option>

                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Please Select Date</label>
                        <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="form-control" />
                    </div>

                    <div className="col-md-4 d-flex align-items-end">
                        <button onClick={handleSearch} className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {searched && (
                    filteredData.length === 0 ? (
                        <p>No results found.</p>
                    ) : (
                        filteredData.map((item, index) => {
                            const formattedDate = filters.date.split("-").reverse().join("_");
                            const imageUrl = `https://pms-te-mp-review-1.s3.ap-south-1.amazonaws.com/roadside-detections/detections_${formattedDate}/${item["Image Name"]}`;

                            return (
                                <div className="row mb-4" key={index}>
                                    <div className="col-md-6">
                                        <div className="p-3" style={{ backgroundColor: "#fff", border: "1px solid #ddd", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", height: "250px" }}>
                                            <img src={imageUrl} alt="Pavement" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="p-3" style={{ backgroundColor: "#fff", border: "1px solid #ddd", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", height: "250px" }}>
                                            <h5>Description</h5>
                                            <p><strong>Longitude:</strong> {item.Longitude}</p>
                                            <p><strong>Latitude:</strong> {item.Latitude}</p>
                                            <p><strong>Type of Pavement Issue:</strong> {item.Object}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )
                )}
            </div>
        </div>
    );
}

export default Monitor;
