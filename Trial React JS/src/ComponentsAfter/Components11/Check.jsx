import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Check.css";

const API_BASE_URL = "http://localhost:5000/api";

const Check = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentName: "",
        studentId: ""
    });

    const [checkType, setCheckType] = useState("fees");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Cleanup success/error messages when switching types
    useEffect(() => {
        setError("");
        setSuccessMsg("");
    }, [checkType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleCheckTypeChange = (type) => {
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

        const payload = {
            studentName: formData.studentName.trim(),
            studentId: formData.studentId.trim().toUpperCase() // Standardizing ID format
        };

        try {
            if (checkType === "fees") {
                const response = await fetch(`${API_BASE_URL}/check/student-fee`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    setSuccessMsg("✅ Records found! Redirecting...");
                    setTimeout(() => {
                        navigate("/AfterLogin/Info", { state: { ...result } });
                    }, 1200);
                } else {
                    setError(result.error || "No fee records found for this student.");
                }

            } else {
                // MOCK TEST LOGIC
                const response = await fetch(`${API_BASE_URL}/mocktest/verify`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    const resultRes = await fetch(`${API_BASE_URL}/mocktest/results/${payload.studentId}/latest`);
                    const resultData = await resultRes.json();

                    if (resultRes.ok && resultData.success && resultData.data) {
                        setSuccessMsg("✅ Results found! Opening dashboard...");
                        setTimeout(() => {
                            navigate("/MockTestResults", {
                                state: { studentInfo: result.student, resultData: resultData.data }
                            });
                        }, 1200);
                    } else {
                        setError("Identity verified, but no test results found.");
                        // Optional: Show "Start Test" button logic here
                    }
                } else {
                    setError(result.message || "Student identity not verified.");
                }
            }
        } catch (err) {
            setError("Server connection failed. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="unified-check-section">
            <div className="unified-check-container">
                <div className="check-header">
                    <div className="header-icon">{checkType === "fees" ? "💰" : "📝"}</div>
                    <h1>{checkType === "fees" ? "Fee Portal" : "Assessment Center"}</h1>
                    <p>Enter Student Credentials to proceed</p>
                </div>

                <div className="search-card">
                    <div className="selector-bar">
                        <span className="selector-label">I want to check:</span>
                        <div className="selector-options">
                            <button 
                                type="button"
                                className={`selector-btn ${checkType === "fees" ? "active" : ""}`}
                                onClick={() => handleCheckTypeChange("fees")}
                            > Fees </button>
                            <button 
                                type="button"
                                className={`selector-btn ${checkType === "mocktest" ? "active" : ""}`}
                                onClick={() => handleCheckTypeChange("mocktest")}
                            > Mock Test </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>👤 Full Name</label>
                                <input 
                                    type="text" 
                                    name="studentName" 
                                    value={formData.studentName} 
                                    onChange={handleChange} 
                                    placeholder="e.g. Rahul Sharma" 
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>🆔 Student ID</label>
                                <input 
                                    type="text" 
                                    name="studentId" 
                                    value={formData.studentId} 
                                    onChange={handleChange} 
                                    placeholder="e.g. ST10234" 
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                        </div>

                        {error && <div className="status-box error-box">⚠️ {error}</div>}
                        {successMsg && <div className="status-box success-box">{successMsg}</div>}

                        <div className="search-btn-container">
                            <button type="submit" className={`search-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? <span className="spinner"></span> : `Check ${checkType === "fees" ? "Status" : "Results"}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Check;
