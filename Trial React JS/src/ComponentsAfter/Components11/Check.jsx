import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Check.css";

const Check = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentName: "",
        studentId: ""
    });

    const [checkType, setCheckType] = useState("fees"); // "fees" or "mocktest"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Clear messages when switching type
    useEffect(() => {
        setError("");
        setSuccessMsg("");
    }, [checkType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleTypeChange = (type) => {
        setCheckType(type);
        setFormData({ studentName: "", studentId: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.studentName.trim() || !formData.studentId.trim()) {
            setError("Please enter both Student Name and Student ID");
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            if (checkType === "fees") {
                const response = await fetch("/api/check/student-fee", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    setSuccessMsg("✅ Records found! Redirecting...");
                    setTimeout(() => {
                        navigate("/AfterLogin/Info", { 
                            state: { 
                                studentInfo: result.studentInfo,
                                feeDetails: result.feeDetails,
                                paymentHistory: result.paymentHistory 
                            } 
                        });
                    }, 1000);
                } else {
                    setError(result.error || "No records found for this student.");
                }
            } else {
                // Mock Test
                const response = await fetch("/api/mocktest/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    const resultRes = await fetch(`/api/mocktest/results/${formData.studentId}/latest`);
                    const resultData = await resultRes.json();

                    if (resultRes.ok && resultData.success) {
                        setSuccessMsg("✅ Results found! Opening...");
                        setTimeout(() => {
                            navigate("/MockTestResults", {
                                state: {
                                    studentInfo: result.student,
                                    resultData: resultData.data
                                }
                            });
                        }, 1000);
                    } else {
                        setError("No test results found for this student.");
                    }
                } else {
                    setError(result.message || "Student not found.");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Server connection failed. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="unified-check-section">
            <div className="unified-check-container">

                {/* Header */}
                <div className="check-header">
                    <div className="header-icon">💰</div>
                    <h1>Check Fee Status</h1>
                    <p>Enter your details to view fee information</p>
                </div>

                {/* Search Card */}
                <div className="search-card">
                    <div className="selector-bar">
                        <span className="selector-label">CHECK TYPE:</span>
                        <div className="selector-options">
                            <button
                                type="button"
                                className={`selector-btn ${checkType === "fees" ? "active" : ""}`}
                                onClick={() => handleTypeChange("fees")}
                            >
                                Fee Status
                            </button>
                            <button
                                type="button"
                                className={`selector-btn ${checkType === "mocktest" ? "active" : ""}`}
                                onClick={() => handleTypeChange("mocktest")}
                            >
                                Mock Test Results
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>👤 STUDENT NAME</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    placeholder="Enter Student Name"
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label>🆔 STUDENT ID</label>
                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    placeholder="Enter Student ID"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {error && <div className="error-message">⚠️ {error}</div>}
                        {successMsg && <div className="success-message">{successMsg}</div>}

                        <div className="search-btn-container">
                            <button type="submit" className="search-btn" disabled={loading}>
                                {loading ? "Checking..." : "CHECK FEE STATUS"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="info-cards">
                    <div className="info-card">
                        <div className="info-icon">💡</div>
                        <h3>Fee Information</h3>
                        <p>View your total fees, paid amount, and pending balance</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">🔒</div>
                        <h3>Secure Access</h3>
                        <p>Your information is encrypted and protected with secure authentication</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">⚡</div>
                        <h3>Instant Results</h3>
                        <p>Get immediate access to your data without any delays or waiting time</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Check;
