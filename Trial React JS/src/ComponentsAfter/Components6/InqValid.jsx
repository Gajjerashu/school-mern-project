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
        if (error) setError(""); // ✅ Clear error when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setError("Please Login to your account first.");
            return;
        }

        if (!formData.studentName.trim() || !formData.parentEmail.trim()) {
            setError("Both Student Name and Parent Email are required.");
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

            const data = await res.json(); // ✅ FIXED: changed 'response' to 'res'

            if (!res.ok) {
                throw new Error(data.error || "No inquiry found with these details.");
            }

            setInquiry(data);
        } catch (err) {
            console.error("❌ Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToAdmission = () => {
        if (inquiry?.inquiryId && inquiry?.approved) {
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

            // Navigate with smooth transition
            navigate("/AfterLogin/Home1", {
                state: { scrollToAdmission: true }
            });
        }
    };

    return (
        <section className="inqvalid-section fade-in">
            <div className="inqvalid-container">
                <div className="inqvalid-header">
                    <h2 className="inqvalid-title">🔍 Inquiry Verification</h2>
                    <p className="inqvalid-subtitle">Check your status to proceed with admission</p>
                </div>

                {!isLoggedIn && (
                    <div className="login-warning-card">
                        <p>⚠️ Login required to access this service.</p>
                        <button className="login-link-btn" onClick={() => navigate("/login")}>Go to Login</button>
                    </div>
                )}

                {isLoggedIn && !inquiry && (
                    <form className="inqvalid-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                             <label>👤 STUDENT FULL NAME</label>
                            <input
                                name="studentName"
                                type="text"
                                placeholder="Enter registered student name"
                                value={formData.studentName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>📧 PARENT EMAIL ID</label>
                            <input
                                name="parentEmail"
                                type="email"
                                placeholder="Enter registered email"
                                value={formData.parentEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <div className="error-box">❌ {error}</div>}

                        <button type="submit" className="verify-btn" disabled={loading}>
                            {loading ? "⌛ Verifying..." : "Verify Status"}
                        </button>
                    </form>
                )}

                {inquiry && (
                    <div className="result-card scale-up">
                        {inquiry.approved ? (
                            <div className="status-success">
                                <div className="icon-circle">✓</div>
                                <h3>Approved!</h3>
                                <div className="info-list">
                                    <p><strong>Inquiry ID:</strong> {inquiry.inquiryId}</p>
                                    <p><strong>Student:</strong> {inquiry.studentName}</p>
                                    <p><strong>Standard:</strong> {inquiry.applyClass}</p>
                                </div>
                                <button className="proceed-btn" onClick={handleProceedToAdmission}>
                                    🎓 Start Admission Process
                                </button>
                            </div>
                        ) : (
                            <div className="status-pending">
                                <div className="icon-circle-pending">⌛</div>
                                <h3>Under Review</h3>
                                <p>Your application is being verified by the admin office. Please check back in 24-48 hours.</p>
                            </div>
                        )}
                        
                        <button className="check-again-btn" onClick={() => setInquiry(null)}>
                            🔄 Check Another
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InqValid;
