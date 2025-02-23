import React, { useState } from "react";
import Header from "./Header2";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ admin_id: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            let response = await fetch("http://localhost:5000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data = await response.json();

            if (response.ok) {
                navigate(`/dashboard/${data.constituency}/profile`);
            } else {
                setError(data.error || "Invalid Admin ID or Password (Or you haven't filled the form yet)");
            }

            setFormData({ admin_id: "", password: "" });
        } catch (error) {
            setError("Server error. Please try again later.");
            console.error("Server error:", error);
        }
    };

    return (
        <div style={{ overflowX: "hidden" }}> {/* Prevent horizontal scrolling */}
            <Header />
            <div className="container-fluid px-3"
                style={{ backgroundColor: "#C5D3E8", color: "#000", minHeight: "75vh" }}>
                <p className="main-text-two text-center">
                    <b>Admin Login Form</b>
                </p>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form className="pt-2" onSubmit={handleSubmit}>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <div className="mb-3">
                                <label className="form-label">Admin ID</label>
                                <input
                                    type="text"
                                    name="admin_id"
                                    className="form-control"
                                    placeholder="Enter Admin ID"
                                    autoComplete="off"
                                    value={formData.admin_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="header-button mt-3 w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
