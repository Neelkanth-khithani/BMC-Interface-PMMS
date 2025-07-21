import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header3";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Dashboard() {
    return (
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flexGrow: 1, backgroundColor: "#C5D3E8", padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;