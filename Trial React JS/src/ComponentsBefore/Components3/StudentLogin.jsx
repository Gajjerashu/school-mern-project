import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentLogin.css";

// ✅ Vite mate correct Environment Variable access
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const StudentLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: location.state?.email || "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(location.state?.message || "");

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);

    // ✅ Success message ne 5 second pachi automatic hide karo
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // ✅ API Base URL environment variable mathi lo
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed. Invalid credentials.");
                return;
            }

            // ✅ Login success: Token save karo
            localStorage.setItem("token", data.token);
            console.log("✅ Student login successful");
            
            // Dashboard par redirect karo
            navigate("/AfterLogin/Home1");

        } catch (err) {
            console.error("❌ Login Error:", err);
            // ✅ Network ke CORS issue handle karo
            setError(err.message === "Failed to fetch" 
                ? "Server sathe connection nathi thai rahyu. Please check if Backend is live." 
                : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="school-badge">
                <svg className="school-icon-inline" width="24" height="24" viewBox="0 0 32 32" fill="white">
                    <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                    <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                </svg>
                <h1>InspireEdge School</h1>
            </div>

            <div className="login-container">
                <h2>Student Login</h2>
                <p className="login-subtitle">Welcome back! Please login to continue</p>

                {successMessage && (
                    <div className="success-message" style={{ color: '#2ecc71', backgroundColor: '#eafaf1', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
                        ✅ {successMessage}
                    </div>
                )}

                {error && (
                    <div className="error-message" style={{ color: '#e74c3c', backgroundColor: '#fdedec', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
                        ⚠️ {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            EMAIL
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                            PASSWORD
                        </label>
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                style={{ width: '100%', paddingRight: '40px' }}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-login" disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer', width: '100%' }}>
                        {loading ? "LOGGING IN..." : "LOGIN"}
                    </button>

                    <p className="signup-link" style={{ textAlign: 'center', marginTop: '15px' }}>
                        Don't have an account?{" "}
                        <span 
                            onClick={() => navigate("/signup")} 
                            style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
                        >
                            Signup
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
