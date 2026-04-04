import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Check.css";

// API Base URL - Future-proof logic
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError("");
        if (successMsg) setSuccessMsg("");
    };

    const handleCheckTypeChange = (e) => {
        setCheckType(e.target.value);
        setFormData({ studentName: "", studentId: "" });
        setError("");
        setSuccessMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.studentName.trim() || !formData.studentId.trim()) {
            setError("Please enter both Student Name and Student ID");
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMsg("");

        // Clean data before sending
        const payload = {
            studentName: formData.studentName.trim(),
            studentId: formData.studentId.trim()
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
                    setSuccessMsg("✅ Student records found! Redirecting...");
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
                    // Result fetch karva mate
                    const resultRes = await fetch(`${API_BASE_URL}/mocktest/results/${payload.studentId}/latest`);
                    const resultData = await resultRes.json();

                    if (resultRes.ok && resultData.success && resultData.data) {
                        setSuccessMsg("✅ Results found! Opening dashboard...");
                        setTimeout(() => {
                            navigate("/MockTestResults", {
                                state: { studentInfo: result.student, resultData: resultData.data }
                            });
                        }, 1000);
                    } else {
                        // Agar student chhe pan test nathi api
                        setError("Student verified, but no mock test results found.");
                        setTimeout(() => {
                            if (window.confirm("📝 No results found. Would you like to start a New Mock Test?")) {
                                navigate("/MockTest", {
                                    state: { studentInfo: result.student, isNewTest: true }
                                });
                            }
                        }, 500);
                    }
                } else {
                    setError(result.message || "Student identity not verified.");
                }
            }
        } catch (err) {
            console.error("Connection Error:", err);
            setError("Cannot connect to server. Please ensure the backend is running.");
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
                            <label className={`selector-option ${checkType === "fees" ? "active" : ""}`}>
                                <input type="radio" name="type" value="fees" checked={checkType === "fees"} onChange={handleCheckTypeChange} />
                                <span className="option-text">Fees</span>
                            </label>
                            <label className={`selector-option ${checkType === "mocktest" ? "active" : ""}`}>
                                <input type="radio" name="type" value="mocktest" checked={checkType === "mocktest"} onChange={handleCheckTypeChange} />
                                <span className="option-text">Mock Test</span>
                            </label>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label><span className="label-icon">👤</span> Full Name</label>
                                <input 
                                    type="text" 
                                    name="studentName" 
                                    value={formData.studentName} 
                                    onChange={handleChange} 
                                    placeholder="e.g. Rahul Sharma" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label><span className="label-icon">🆔</span> Student ID</label>
                                <input 
                                    type="text" 
                                    name="studentId" 
                                    value={formData.studentId} 
                                    onChange={handleChange} 
                                    placeholder="e.g. ST10234" 
                                    required 
                                />
                            </div>
                        </div>

                        {error && <div className="error-message">⚠️ {error}</div>}
                        {successMsg && <div className="success-message">{successMsg}</div>}

                        <div className="search-btn-container">
                            <button type="submit" className={`search-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? "Searching..." : `Check ${checkType === "fees" ? "Status" : "Results"}`}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="info-cards">
                    <div className="info-card">
                        <div className="info-icon">⚡</div>
                        <h3>Real-time Data</h3>
                        <p>Access the latest updates directly from our servers.</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">🔒</div>
                        <h3>Secure</h3>
                        <p>Your data is encrypted and visible only to authorized users.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Check;
