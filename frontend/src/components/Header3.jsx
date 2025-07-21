import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bmc from "../Images/bmc.png";
import "./Home.css";

function Header() {
    const { constituency } = useParams();
    const navigate = useNavigate();
    const [lastLogin, setLastLogin] = useState("");

    useEffect(() => {
        const fetchLastLogin = async () => {
            try {
                const response = await fetch(`http://localhost:5000/admin/dashboard/${constituency}`);
                const data = await response.json();
                if (data.last_login_timestamp) {
                    setLastLogin(new Date(data.last_login_timestamp).toLocaleString());
                } else {
                    setLastLogin("No data available");
                }
            } catch (error) {
                console.error("Error fetching last login time:", error);
                setLastLogin("Error fetching data");
            }
        };

        if (constituency) {
            fetchLastLogin();
        }
    }, [constituency]);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="header" style={{ backgroundColor: "#3B6790", color: "#fff" }}>
            <img src={bmc} className="header-img" alt="BMC Logo" />
            <div className="header-text-container">
                <p className="header-text">Brihanmumbai Municipal Corporation</p>
                <p className="header-text">बृहन्मुंबई महानगरपालिका</p>
            </div>
            <p className="header-text">Pavement Monitoring & Management System (Dummy)</p>
            <div className="header-text-container">
                <p className="time-date">LAST LOGIN: {lastLogin}</p>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Header;