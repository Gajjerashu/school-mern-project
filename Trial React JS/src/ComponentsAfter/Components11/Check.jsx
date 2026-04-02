import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Check.css";

const Check = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentName: "",
        studentId: ""
    });

    const [checkType, setCheckType] = useState("fees"); // 'fees' or 'mocktest'
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
                // ── FEE STATUS CHECK ──
                console.log("📤 Sending fee check request:", formData);

                const response = await fetch("http://localhost:5000/api/check/student-fee", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                console.log("📥 Fee check response:", result);

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
                // ── MOCK TEST RESULT CHECK ──
                console.log("📤 Sending mock test verification request:", formData);

                const response = await fetch("http://localhost:5000/api/mocktest/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                console.log("📥 Mock test verify response:", result);

                if (response.ok && result.success) {
                    // ✅ FIXED: Fetch latest result for this student
                    console.log("📤 Fetching latest mock test result for student:", formData.studentId);
                    
                    const resultResponse = await fetch(
                        `http://localhost:5000/api/mocktest/results/${formData.studentId}/latest`
                    );

                    const resultData = await resultResponse.json();
                    console.log("📥 Latest result response:", resultData);

                    if (resultResponse.ok && resultData.success && resultData.data) {
                        // ✅ Results found - display them
                        console.log("✅ Results found - navigating to MockTestResults");
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
                        // ✅ No results - offer to take test
                        console.log("⚠️ No results found - offering to take new test");
                        setError("No mock test results found for this student");
                        
                        // ✅ FIXED: Add option to take new test
                        setTimeout(() => {
                            const takeTest = window.confirm(
                                "📝 No previous results found.\n\nWould you like to take a new mock test now?"
                            );
                            if (takeTest) {
                                console.log("✅ Student wants to take new test");
                                navigate("/MockTest", {
                                    state: {
                                        studentInfo: result.student,
                                        isNewTest: true
                                    }
                                });
                            }
                        }, 500);
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
                {/* ── HEADER ── */}
                <div className="check-header">
                    <div className="header-icon">
                        {isFeesMode ? "💰" : "📝"}
                    </div>
                    <h1>{isFeesMode ? "Check Fee Status" : "Check Mock Test Results"}</h1>
                    <p>
                        {isFeesMode
                            ? "Enter your details to view fee information"
                            : "Enter your details to view mock test results"
                        }
                    </p>
                </div>

                {/* ── SEARCH CARD ── */}
                <div className="search-card">
                    {/* ── DROPDOWN SELECTOR ── */}
                    <div className="selector-bar">
                        <div className="selector-label">Check Type:</div>
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
                        {/* ── FORM GRID ── */}
                        <div className="form-grid">
                            <div className="form-group">
                                <label>
                                    <span className="label-icon">👤</span>
                                    Student Name
                                </label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    placeholder="Enter Student Name"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <span className="label-icon">🆔</span>
                                    Student ID
                                </label>
                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    placeholder="Enter Student ID"
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>

                        {/* ── ERROR MESSAGE ── */}
                        {error && (
                            <div className="error-message">
                                ⚠️ {error}
                            </div>
                        )}

                        {/* ── SUCCESS MESSAGE ── */}
                        {successMsg && (
                            <div className="success-message">
                                {successMsg}
                            </div>
                        )}

                        {/* ── SUBMIT BUTTON ── */}
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
                                            {isFeesMode ? "Check Fee Status" : "Check Results"}
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* ── INFO CARDS ── */}
                <div className="info-cards">
                    <div className="info-card info-card-1">
                        <div className="info-icon">💡</div>
                        <h3>{isFeesMode ? "Fee Information" : "Test Results"}</h3>
                        <p>
                            {isFeesMode
                                ? "View your total fees, paid amount, and pending balance"
                                : "Check your mock test scores, correct answers, and performance"
                            }
                        </p>
                    </div>
                    <div className="info-card info-card-2">
                        <div className="info-icon">🔒</div>
                        <h3>Secure Access</h3>
                        <p>Your information is encrypted and protected with secure authentication</p>
                    </div>
                    <div className="info-card info-card-3">
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