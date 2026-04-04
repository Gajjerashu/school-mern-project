import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InqValid.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const InqValid = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentName: "",
        parentEmail: "",
    });
    const [inquiry, setInquiry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setError("Please Login Your A/C");
            return;
        }

        if (!formData.studentName.trim() || !formData.parentEmail.trim()) {
            setError("Please enter both Student Name and Parent Email.");
            return;
        }

        setLoading(true);
        setError("");
        setInquiry(null);

        try {
               const res = await fetch(`${API_BASE_URL}/api/valid/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch inquiry details");
            }

            setInquiry(data);
        } catch (err) {
            console.error("❌ Error:", err);
            setError(err.message || "Failed to fetch inquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToAdmission = () => {
        if (inquiry?.inquiryId && inquiry?.approved) {
            // Store inquiry data for admission form auto-fill
            const admissionData = {
                inquiryId: inquiry.inquiryId,
                studentName: inquiry.studentName,
                parentEmail: inquiry.parentEmail,
                parentPhone: inquiry.parentPhone || "",
                applyClass: inquiry.applyClass || "",
                language: inquiry.language || "",
                previousSchool: inquiry.previousSchool || "",
                autoUnlock: true
            };

            sessionStorage.setItem('inquiryData', JSON.stringify(admissionData));

            // Scroll to admission form on home page
            navigate("/AfterLogin/Home1", {
                state: {
                    scrollToAdmission: true,
                    inquiryData: admissionData
                }
            });
        }
    };

    return (
        <section className="inqvalid-section">
            <div className="inqvalid-container">
                <div className="inqvalid-header">
                    <h2 className="inqvalid-title">🔍 Verify Inquiry ID</h2>
                    <p className="inqvalid-subtitle">
                        Enter your details to verify your inquiry status
                    </p>
                </div>

                {!isLoggedIn && (
                    <div className="warning-message">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        ⚠️ You must be logged in to check inquiry status
                    </div>
                )}

                {!inquiry ? (
                    <form className="inqvalid-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="studentName">👤 Student Name</label>
                            <input
                                id="studentName"
                                type="text"
                                name="studentName"
                                placeholder="Enter student name"
                                value={formData.studentName}
                                onChange={handleChange}
                                disabled={!isLoggedIn}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="parentEmail">📧 Parent Email</label>
                            <input
                                id="parentEmail"
                                type="email"
                                name="parentEmail"
                                placeholder="Enter parent email"
                                value={formData.parentEmail}
                                onChange={handleChange}
                                disabled={!isLoggedIn}
                            />
                        </div>

                        {error && <div className="error-message">❌ {error}</div>}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading || !isLoggedIn}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    ⏳ Checking...
                                </>
                            ) : (
                                "✅ Verify Inquiry"
                            )}
                        </button>

                        {!isLoggedIn && (
                            <button
                                type="button"
                                className="login-redirect-btn"
                                onClick={() => navigate("/login")}
                            >
                                🔐 Go to Login
                            </button>
                        )}
                    </form>
                ) : (
                    <div className="inquiry-result">
                        {inquiry.approved ? (
                            <>
                                <div className="success-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>

                                <h3 className="success-title">✅ Inquiry Approved!</h3>

                                <div className="inquiry-details">
                                    <div className="detail-item">
                                        <span className="detail-label">🆔 Inquiry ID:</span>
                                        <span className="detail-value inquiry-id">{inquiry.inquiryId}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">👤 Student Name:</span>
                                        <span className="detail-value">{inquiry.studentName}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">📧 Parent Email:</span>
                                        <span className="detail-value">{inquiry.parentEmail}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">📊 Status:</span>
                                        <span className="status-badge approved">
                                            ✓ Approved
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="proceed-btn"
                                    onClick={handleProceedToAdmission}
                                >
                                    🎓 Proceed to Admission Form
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="pending-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                    </svg>
                                </div>

                                <h3 className="pending-title">⏳ Inquiry Under Review</h3>

                                <div className="pending-message-box">
                                    <p className="pending-text">
                                        📋 Your inquiry has been received and is currently being reviewed by our admin team.
                                    </p>
                                    <p className="pending-subtext">
                                        📬 You will be notified once your inquiry is approved. Please check back later.
                                    </p>
                                </div>
                            </>
                        )}

                        <button
                            className="reset-btn"
                            onClick={() => {
                                setInquiry(null);
                                setFormData({ studentName: "", parentEmail: "" });
                                sessionStorage.removeItem('inquiryData');
                            }}
                        >
                            🔄 Check Another Inquiry
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InqValid;
