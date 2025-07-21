import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Register() {
    const [formData, setFormData] = useState({ email: "", password: "", captcha: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0, answer: 0 });
    const navigate = useNavigate();

    // Function to generate a new CAPTCHA
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
        setFormData((prev) => ({ ...prev, captcha: "" })); // Reset captcha input
    };

    useEffect(() => {
        generateCaptcha(); // Generate a CAPTCHA when the component loads
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before request

        // CAPTCHA validation
        if (parseInt(formData.captcha) !== captchaQuestion.answer) {
            setError("Incorrect CAPTCHA. Please try again.");
            generateCaptcha();
            return;
        }

        try {
            let response = await fetch("http://localhost:5000/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormData({ email: "", password: "", captcha: "" });
                navigate("/form");
            } else {
                setError(data.message || "Registration failed. Please try again.");
                generateCaptcha(); // Refresh CAPTCHA on failure
            }
        } catch (error) {
            console.error("Server error:", error);
            setError("Server error. Please try again later.");
            generateCaptcha();
        }
    };

    return (
        <div>
            <Header />
            <div className="d-flex flex-column align-items-center" style={{ minHeight: "75vh", backgroundColor: "#C5D3E8", color: "#000" }}>
                <p className="main-text-two text-center mt-4">
                    <b>Admin Registration Form</b>
                </p>
                <div className="row justify-content-center pb-4 w-100">
                    <div className="col-md-4">
                        <form className="pt-2" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password*</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Solve this CAPTCHA*</label>
                                <div className="input-group">
                                    <span className="input-group-text">{captchaQuestion.num1} + {captchaQuestion.num2} = ?</span>
                                    <input
                                        type="number"
                                        name="captcha"
                                        className="form-control"
                                        placeholder="Enter answer"
                                        value={formData.captcha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={generateCaptcha}>⟳</button>
                                </div>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
                            <button type="submit" className="header-button mt-3 w-100">Register</button>
                        </form>
                    </div>
                </div>
                <small style={{ color: "red" }}>Note: The email you provide will be used to send the Admin ID.</small>
            </div>
            <Footer />
        </div>
    );
}

export default Register;