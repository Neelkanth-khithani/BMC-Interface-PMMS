import React, { useState } from "react";

function Report() {
    const [reportType, setReportType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [ward, setWard] = useState("");
    const [issueType, setIssueType] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");

    const handleGenerateReport = (e) => {
        e.preventDefault();
        console.log({ reportType, startDate, endDate, ward, issueType, status, sortBy });
    };

    const handleSendReport = (e) => {
        e.preventDefault();
        if (!adminEmail || !recipientEmail) {
            alert("Please enter both admin and recipient email addresses.");
            return;
        }
        console.log(`Report sent from ${adminEmail} to ${recipientEmail}`);
    };

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <p className="mb-4" style={{ color: "blue", fontWeight: "bold" }}>Generate Report</p>
                <form onSubmit={handleGenerateReport}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Report Type</label>
                            <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                <option value="">Select</option>
                                <option value="summary">Summary</option>
                                <option value="detailed">Detailed</option>
                                <option value="statistics">Statistics</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Start Date</label>
                            <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">End Date</label>
                            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Ward Number</label>
                            <input type="text" className="form-control" value={ward} onChange={(e) => setWard(e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Issue Type</label>
                            <select className="form-select" value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                                <option value="">Select</option>
                                <option value="pothole">Potholes</option>
                                <option value="cracks">Cracks</option>
                                <option value="waterlogging">Waterlogging</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Sort By</label>
                            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="">Select</option>
                                <option value="severity">Severity</option>
                                <option value="date-reported">Date Reported</option>
                                <option value="resolution-time">Resolution Time</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Generate Report</button>
                    </div>
                </form>
            </div>

            <div className="card p-4 mt-4">
                <p className="mb-4" style={{ color: "blue", fontWeight: "bold" }}>Send Report for Futher Action</p>
                <form onSubmit={handleSendReport}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Admin Email</label>
                            <input type="email" className="form-control" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Recipient Email</label>
                            <input type="email" className="form-control" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Send Report</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Report;