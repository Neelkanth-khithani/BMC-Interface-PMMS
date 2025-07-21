import React, { useState, useEffect } from "react";
import bmc from "../Images/bmc.png";
import "./Home.css"

function Header() {

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDate = dateTime.toLocaleDateString("en-GB").replace(/\//g, "-");
    const formattedTime = dateTime.toLocaleTimeString("en-US", { hour12: true });

    return (
        <div className="header" style={{backgroundColor: "#3B6790", color: "#fff"}}>
            <img src={bmc} className="header-img" alt="BMC Logo" />
            <div className="header-text-container">
                <p className="header-text">Brihanmumbai Municipal Corporation</p>
                <p className="header-text">बृहन्मुंबई महानगरपालिका</p>
            </div>
            <p className="header-text">Pavement Monitoring & Management System (Dummy)</p>
            <div className="header-text-container">
                <p className="time-date">DATE: {formattedDate}</p>
                <p className="time-date">TIME: {formattedTime}</p>
            </div>
        </div>
    );
}

export default Header;