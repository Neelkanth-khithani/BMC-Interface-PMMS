import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "./Header2";
import "./Home.css";
import Footer from "./Footer";

function Form() {
    const navigate = useNavigate(); 
    const [areas, setAreas] = useState([]);
    const [formData, setFormData] = useState({
        admin_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        designation: "",
        area_id: "",
        contact: "",
        email: "",
        employee_code: "",
        aadhaar_no: "",
        office_address: ""
    });

    useEffect(() => {
        fetch("http://localhost:5000/admin/constituency")
            .then(response => response.json())
            .then(data => setAreas(data))
            .catch(error => console.error("Error fetching areas:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/admin/form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setFormData({
                    admin_id: "", first_name: "", middle_name: "", last_name: "",
                    designation: "", area_id: "", contact: "", email: "",
                    employee_code: "", aadhaar_no: "", office_address: ""
                });

                navigate("/");
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Header />
            <div className="p-4" style={{ backgroundColor: "#C5D3E8" }}>
                <p className="text-center fw-bold">Admin Details Form (Please fill the form carefully)</p>
                <small className="text-danger">*required</small>
                <form className="mt-3" onSubmit={handleSubmit}>

                    <div className="mb-3 col-md-6">
                        <label className="form-label">Admin ID*</label>
                        <div className="d-flex align-items-center">
                            <input type="text" className="form-control form-control-sm me-2" name="admin_id" value={formData.admin_id} autoComplete="off" onChange={handleChange} placeholder="BMCADXXXXX" required />
                            <small className="text-danger ms-2 text-nowrap">(Admin ID has been mailed to you during registration)</small>
                        </div>
                    </div>

                    <div className="d-flex gap-4 mb-3">
                        <div className="col-md-3">
                            <label className="form-label" >First Name*</label>
                            <input type="text" className="form-control form-control-sm" name="first_name" value={formData.first_name} autoComplete="off" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Middle Name</label>
                            <input type="text" className="form-control form-control-sm" name="middle_name" value={formData.middle_name} autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Last Name*</label>
                            <input type="text" className="form-control form-control-sm" name="last_name" value={formData.last_name} autoComplete="off" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Designation*</label>
                            <input type="text" className="form-control form-control-sm" name="designation" value={formData.designation} autoComplete="off" onChange={handleChange} placeholder="Senior Engineer, Junior Engineer etc." required />
                        </div>
                        <div className="col-md-7">
                            <label className="form-label">Constituency*</label>
                            <div className="d-flex align-items-center">
                                <select className="form-control form-control-sm me-2" name="area_id" value={formData.area_id} autoComplete="off" onChange={handleChange} required>
                                    <option value="">Select Constituency</option>
                                    {areas.map(area => (
                                        <option key={area.area_id} value={area.area_id}>
                                            {area.constituency}
                                        </option>
                                    ))}
                                </select>
                                <small className="text-danger ms-2 text-nowrap">(Please select this correctly for proper monitoring)</small>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div className="col-md-3">
                            <label className="form-label">Contact*</label>
                            <input type="text" className="form-control form-control-sm" name="contact" value={formData.contact} autoComplete="off" onChange={handleChange} placeholder="+91XXXXXXXXXX" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Other Email</label>
                            <input type="email" className="form-control form-control-sm" name="email" value={formData.email} autoComplete="off" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Employee Code*</label>
                            <input type="text" className="form-control form-control-sm" name="employee_code" value={formData.employee_code} autoComplete="off" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Aadhaar No*</label>
                            <input type="text" className="form-control form-control-sm" name="aadhaar_no" value={formData.aadhaar_no} autoComplete="off" onChange={handleChange} placeholder="12 digit number" required />
                        </div>
                    </div>

                    <div className="mb-3 col-md-10">
                        <label className="form-label">Office Address*</label>
                        <textarea className="form-control form-control-sm" name="office_address" rows="2" value={formData.office_address} autoComplete="off" onChange={handleChange} placeholder="Enter your office address (used for communication)" required></textarea>
                    </div>

                    <div className="mt-3 p-3 border border-danger rounded">
                        <p className="text-black">
                            Before proceeding, please read and accept our
                            <span className="text-danger"> Terms and Conditions</span>. By checking the box below, you agree to comply with all guidelines, policies, and regulations set forth by the administration.
                        </p>
                        <div className="form-check">
                            <input className="form-check-input border-2 border-danger" type="checkbox" id="terms" required />
                            <label className="form-check-label ms-2 text-black">
                                I accept the <span className="text-danger">Terms and Conditions</span>
                            </label>
                        </div>
                    </div>
                    <br />

                    <button type="submit" className="header-button">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Form;