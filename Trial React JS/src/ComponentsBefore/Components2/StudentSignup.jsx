import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentSignup.css";

// ✅ Vite mate correct Environment Variable access
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const StudentSignup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Password visibility states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(""); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Sudharelu Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed. Please try again.");
            }

            console.log("✅ Signup successful");

            // ✅ Success pachi login par redirect
            navigate("/login", {
                state: {
                    message: "Account created successfully! Please login.",
                    email: formData.email
                }
            });
        } catch (err) {
            console.error("❌ Signup Error:", err);
            // ✅ CORS ke Network error handle karva mate
            setError(err.message === "Failed to fetch" 
                ? "Server connect nathi thai rahyu. Please check internet or backend status." 
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="school-badge">
                <svg className="school-icon-inline" width="24" height="24" viewBox="0 0 32 32" fill="white">
                    <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                    <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                </svg>
                <h1>InspireEdge School</h1>
            </div>

            <div className="signup-container">
                <h2>Student Signup</h2>
                <p className="signup-subtitle">Create your account to get started</p>

                {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '15px' }}>⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label>👤 FULL NAME</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <label>📧 EMAIL ADDRESS</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label>📞 PHONE NUMBER</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            autoComplete="tel"
                        />
                    </div>

                    <div className="form-group">
                        <label>🔐 PASSWORD</label>
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                style={{ width: '100%', paddingRight: '40px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>🛡️ CONFIRM PASSWORD</label>
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                style={{ width: '100%', paddingRight: '40px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading} style={{ width: '100%', padding: '12px', cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? "PROCESSING..." : "SIGNUP"}
                    </button>

                    <p className="login-link" style={{ textAlign: 'center', marginTop: '15px' }}>
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}>Login here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default StudentSignup;
