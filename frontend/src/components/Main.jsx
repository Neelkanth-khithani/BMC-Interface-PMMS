import React from "react";
import "./Home.css";

function Main() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center pb-4"
            style={{ minHeight: "75vh", backgroundColor: "#C5D3E8", color: "#000" }}
        >
            <div className="text-center w-75">
                <p className="main-text-two" style={{ fontSize: "1.25rem" }}>
                    <strong>Guidelines:</strong>
                </p>
                <ol className="guidelines-list text-start" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                    <li>Register by creating an account with a username and password using the button below.</li>
                    <li>Provide accurate details for your area to ensure correct pavement monitoring information.</li>
                    <li>Log in using the button above to access the monitoring system and manage your details.</li>
                    <li>All activities are logged for security and audit purposes. Misuse of the system may result in legal consequences.</li>
                </ol>

                <div className="mt-4">
                    <a href="/register" className="header-button px-4 py-2" style={{ fontSize: "1.1rem", textDecoration: "none" }}>
                        Register
                    </a>
                </div>

                <div className="mt-3">
                    <a href="/form" style={{ fontSize: "1.1rem", textDecoration: "none", color: "#0056b3" }}>
                        Complete Form
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Main;
