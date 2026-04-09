import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Check.css";

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
        setError("");
        setSuccessMsg("");
    };

    const handleCheckTypeChange = (e) => {
        setCheckType(e.target.value);
        setFormData({ studentName: "", studentId: "" });
        setError("");
        setSuccessMsg("");
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
                    setSuccessMsg("✅ Student found! Redirecting...");
                    setTimeout(() => {
                        navigate("/AfterLogin/Info", {
                            state: {
                                studentInfo: result.studentInfo,
                                feeDetails: result.feeDetails,
                                paymentHistory: result.paymentHistory
                            }
                        });
                    }, 800);
                } else {
                    setError(result.error || "Student not found");
                }
            } else if (checkType === "mocktest") {
                const response = await fetch("/api/mocktest/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    const resultResponse = await fetch(
                        `/api/mocktest/results/${formData.studentId}/latest`
                    );

                    const resultData = await resultResponse.json();

                    if (resultResponse.ok && resultData.success && resultData.data) {
                        setSuccessMsg("✅ Results found! Redirecting...");
                        setTimeout(() => {
                            navigate("/MockTestResults", {
                                state: {
                                    studentInfo: result.student,
                                    resultData: resultData.data
                                }
                            });
                        }, 800);
                    } else {
                        setError("No mock test results found for this student");
                    }
                } else {
                    setError(result.message || "Student not found");
                }
            }
        } catch (err) {
            console.error("❌ Error:", err);
            setError("Connection error. Please check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    const isFeesMode = checkType === "fees";

    return (
        <div className="unified-check-section">
            <div className="unified-check-container">
                {/* HEADER - Exact as local host */}
                <div className="check-header">
                    <div className="header-icon">
                        {isFeesMode ? "💰" : "📄"}
                    </div>
                    <h1>{isFeesMode ? "Check Fee Status" : "Check Mock Test Results"}</h1>
                    <p>
                        {isFeesMode
                            ? "Enter your details to view fee information"
                            : "Enter your details to view mock test results"
                        }
                    </p>
                </div>

                {/* SEARCH CARD */}
                <div className="search-card">
                    <div className="selector-bar">
                        <div className="selector-label">CHECK TYPE:</div>
                        <div className="selector-options">
                            <label className={`selector-option ${checkType === "fees" ? "active" : ""}`}>
                                <input
                                    type="radio"
                                    name="checkType"
                                    value="fees"
                                    checked={checkType === "fees"}
                                    onChange={handleCheckTypeChange}
                                />
                                <span className="option-text">💰 Fee Status</span>
                            </label>
                            <label className={`selector-option ${checkType === "mocktest" ? "active" : ""}`}>
                                <input
                                    type="radio"
                                    name="checkType"
                                    value="mocktest"
                                    checked={checkType === "mocktest"}
                                    onChange={handleCheckTypeChange}
                                />
                                <span className="option-text">📝 Mock Test Results</span>
                            </label>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>
                                    <span className="label-icon">👤</span>
                                    STUDENT NAME
                                </label>
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
                                <label>
                                    <span className="label-icon">🆔</span>
                                    STUDENT ID
                                </label>
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
                                {loading ? (
                                    <>
                                        <span className="btn-icon spinning">🔍</span>
                                        <span>Searching...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="btn-icon">🔍</span>
                                        <span>
                                            {isFeesMode ? "CHECK FEE STATUS" : "CHECK RESULTS"}
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* INFO CARDS - Exact as local host */}
                <div className="info-cards">
                    <div className="info-card">
                        <div className="info-icon">💡</div>
                        <h3>{isFeesMode ? "Fee Information" : "Test Results"}</h3>
                        <p>
                            {isFeesMode
                                ? "View your total fees, paid amount, and pending balance"
                                : "Check your mock test scores, correct answers, and performance"
                            }
                        </p>
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
