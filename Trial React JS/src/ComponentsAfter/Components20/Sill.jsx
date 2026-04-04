import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios વાપરવું વધુ હિતાવહ છે
import "./Sill.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Sill = () => {
    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault(); // Form submit રોકવા માટે
        setError("");

        const nameInput = studentName.trim();
        const idInput = studentId.trim();

        if (!nameInput || !idInput) {
            setError("Please fill in both Student Name and Student ID.");
            return;
        }

        setLoading(true);
        try {
            // API Call using Axios
            const response = await axios.get(`${API_BASE_URL}/api/admissions/student/${idInput}`);
            const { success, data } = response.data;

            if (!success || !data) {
                setError("Student ID not found. Please check your ID.");
                setLoading(false);
                return;
            }

            // Name Verification
            const dbName = data.studentName?.toLowerCase().trim();
            const enteredName = nameInput.toLowerCase();

            if (dbName !== enteredName) {
                setError("Student Name does not match our records.");
                setLoading(false);
                return;
            }

            // Class Data Cleanup
            const rawClass = data.applyClass?.toString().replace(/\D/g, "");
            const applyClass = parseInt(rawClass);
            const language = data.language || "English";
            const stream = data.stream || "NA";

            if (isNaN(applyClass)) {
                setError("Invalid class data. Please contact admin.");
                setLoading(false);
                return;
            }

            // Navigation Logic
            const commonState = { 
                studentName: data.studentName, 
                applyClass, 
                language 
            };

            let targetPath = "";
            if (applyClass >= 1 && applyClass <= 5) targetPath = "/AfterLogin/Syllabus/Primary";
            else if (applyClass >= 6 && applyClass <= 8) targetPath = "/AfterLogin/Syllabus/Middle";
            else if (applyClass >= 9 && applyClass <= 12) targetPath = "/AfterLogin/Syllabus/High";

            if (targetPath) {
                navigate(targetPath, { 
                    state: { 
                        ...commonState, 
                        stream: (applyClass >= 11 && stream !== "NA") ? stream : "NA" 
                    } 
                });
            } else {
                setError("Class route not found.");
            }

        } catch (err) {
            console.error("❌ Login Error:", err);
            const msg = err.response?.data?.message || "Server error. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sill-bg">
            <div className="sill-card">
                <div className="sill-header">
                    <div className="sill-logo">🎓</div>
                    <h2>Syllabus Portal</h2>
                    <p>InspireEdge School Management</p>
                </div>
                
                <form className="sill-body" onSubmit={handleSubmit}>
                    <div className="sill-field">
                        <label>Student Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            value={studentName}
                            autoComplete="off"
                            onChange={(e) => setStudentName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="sill-field">
                        <label>Student Admission ID</label>
                        <input
                            type="text"
                            placeholder="Enter ID Number"
                            value={studentId}
                            autoComplete="off"
                            onChange={(e) => setStudentId(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {error && <div className="sill-error-box">⚠️ {error}</div>}

                    <button
                        type="submit"
                        className={`sill-btn ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="btn-content">
                                <i className="spinner"></i> Verifying...
                            </span>
                        ) : (
                            "LOGIN & CONTINUE"
                        )}
                    </button>
                </form>

                <div className="sill-footer">
                    <p>Facing issues? <a href="#">Contact Support</a></p>
                </div>
            </div>
        </div>
    );
};

export default Sill;
