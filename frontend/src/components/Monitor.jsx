import React, { useState } from "react";
import sample_img from "../Images/frame_00502.jpg";

function Monitor() {
    const [filters, setFilters] = useState({
        type: "",
        date: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        console.log("Filters applied:", filters);
    };

    return (
        <div className="container">
            <div className="mt-3">
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Type of Pavement Object</label>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Select Type</option>
                            <option value="streetVendor">Street Vendor</option>
                            <option value="tree">Tree</option>
                            <option value="garbageBin">Garbage Bin</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Please Select Date</label>
                        <input
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-4 d-flex align-items-end">
                        <button onClick={handleSearch} className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Below Search - Pavement Image and Details */}
            <div className="mt-4">
                <div className="row">
                    {/* Image Section */}
                    <div className="col-md-6">
                        <div
                            className="p-3"
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                height: "250px",
                            }}
                        >
                            {/* Image with Clickable Modal Trigger */}
                            <img
                                src={sample_img}
                                alt="Pavement"
                                data-bs-toggle="modal"
                                data-bs-target="#imageModal"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div
                            className="p-3"
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                height: "250px",
                            }}
                        >
                            <h5>Description</h5>
                            <p><strong>Longitude:</strong> 40.7128</p>
                            <p><strong>Latitude:</strong> -74.0060</p>
                            <p><strong>Type of Pavement Issue:</strong> Cracked Surface</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="imageModal"
                tabIndex="-1"
                aria-labelledby="imageModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imageModalLabel">Pavement Image</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <img
                                src={sample_img}
                                alt="Pavement"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Monitor;
