import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

// ✅ Vite mate correct Environment Variable access
// .env file ma VITE_API_URL=https://your-backend.com hovuu joie
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // ✅ Session check: Admin logged in chhe ke nahi?
    useEffect(() => {
        const auth = localStorage.getItem("adminAuth");
        if (auth === "true") {
            navigate("/AfterAdmin/AdminDash");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // ✅ API Call
            const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid Admin Credentials");
            }

            // ✅ Success: Storage ma data save karo
            localStorage.setItem("adminToken", data.token); 
            localStorage.setItem("adminAuth", "true");
            
            console.log("✅ Admin login successful");
            navigate("/AfterAdmin/AdminDash");

        } catch (err) {
            console.error("❌ Login Error:", err);
            // ✅ CORS ke Connection error mate clear message
            setError(err.message === "Failed to fetch" 
                ? "Cannot connect to server. Is Backend running?" 
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="school-badge">
                <svg className="school-icon-inline" width="24" height="24" viewBox="0 0 32 32" fill="white">
                    <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                    <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                </svg>
                <h1>InspireEdge School</h1>
            </div>

            <div className="admin-login-container">
                <h2>Admin Login</h2>
                <p className="admin-login-subtitle">Enter your credentials to access admin panel</p>

                {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '15px' }}>⚠️ {error}</div>}

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">USERNAME</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter admin username"
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter admin password"
                                required
                                autoComplete="current-password"
                                style={{ width: '100%', paddingRight: '40px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '18px'
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={loading}
                    >
                        {loading ? "LOGGING IN..." : "LOGIN TO ADMIN PANEL"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
