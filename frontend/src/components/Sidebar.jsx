import React from "react";
import { Link, useParams } from "react-router-dom";

function Sidebar() {
    const { constituency } = useParams();

    return (
        <div className="d-flex flex-column p-3 vh-100"
            style={{ width: "250px", backgroundColor: "#F8F3D9" }}>
            <p className="text-center fw-bold" style={{ color: "#000" }}>Admin Navigation Panel</p>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <Link to={`/dashboard/${constituency}/profile`} className="nav-link fw-bold">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/dashboard/${constituency}/monitor`} className="nav-link fw-bold">
                        Monitor (Dashboard)
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/map" className="nav-link fw-bold">
                        Map View
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/report" className="nav-link fw-bold">
                        Report to Authorities
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link fw-bold">
                        Contact Issue
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;