import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AdminProfile() {
    const { constituency } = useParams();
    const [adminDetails, setAdminDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/admin/${constituency}`);
                const data = await response.json();
                if (response.ok) {
                    setAdminDetails(data);
                } else {
                    setError(data.error || "Failed to fetch admin details.");
                }
            } catch (error) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        if (constituency) {
            fetchAdminDetails();
        }
    }, [constituency]);

    return (
        <div className="container mt-1">
            <div className="p-4 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
                <p className="fw-bold" style={{color: "blue"}}>Admin Profile</p>
                <hr />
                {loading ? (
                    <p>Loading admin details...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : adminDetails ? (
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="fw-bold">Admin ID</label>
                                    <div className="form-control">{adminDetails.admin_id}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-bold">Employee Code</label>
                                    <div className="form-control">{adminDetails.employee_code}</div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label className="fw-bold">First Name</label>
                                    <div className="form-control">{adminDetails.first_name}</div>
                                </div>
                                <div className="col-md-4">
                                    <label className="fw-bold">Middle Name</label>
                                    <div className="form-control">{adminDetails.middle_name}</div>
                                </div>
                                <div className="col-md-4">
                                    <label className="fw-bold">Last Name</label>
                                    <div className="form-control">{adminDetails.last_name}</div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="fw-bold">Designation</label>
                                    <div className="form-control">{adminDetails.designation}</div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="fw-bold">Contact</label>
                                    <div className="form-control">{adminDetails.contact}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-bold">Email</label>
                                    <div className="form-control">{adminDetails.email}</div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <label className="fw-bold">Office Address</label>
                                    <div className="form-control" style={{ height: "100px", overflowY: "auto" }}>
                                        {adminDetails.office_address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-warning">No admin details available.</p>
                )}
            </div>
        </div>
    );
}

export default AdminProfile;