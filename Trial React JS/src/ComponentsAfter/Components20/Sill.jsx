import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sill.css";

// API Base URL define karo
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Sill = () => {
    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");

        if (!studentName.trim() || !studentId.trim()) {
            setError("Please fill in both Student Name and Student ID.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/admissions/student/${studentId.trim()}`
            );
            const data = await res.json();

            if (!res.ok || !data.success) {
                setError("Student ID not found. Please check your ID.");
                setLoading(false);
                return;
            }

            // ✅ Safe access with optional chaining
            const dbName = data.data?.studentName?.toLowerCase().trim();
            const enteredName = studentName.toLowerCase().trim();

            if (dbName !== enteredName) {
                setError("Student Name does not match our records.");
                setLoading(false);
                return;
            }

            // ✅ Clean up class string (e.g., "10th" -> 10)
            const rawClass = data.data?.applyClass?.toString().replace(/\D/g, "");
            const applyClass = parseInt(rawClass);
            const language = data.data?.language || "English";
            const stream = data.data?.stream || "NA";

            if (isNaN(applyClass)) {
                setError("Invalid class data. Please contact admin.");
                setLoading(false);
                return;
            }

            // ✅ Helper to dry up navigation code
            const commonState = { 
                studentName: data.data.studentName, 
                applyClass, 
                language 
            };

            if (applyClass >= 1 && applyClass <= 5) {
                navigate("/AfterLogin/Syllabus/Primary", { state: { ...commonState, stream: "NA" } });
            } else if (applyClass >= 6 && applyClass <= 8) {
                navigate("/AfterLogin/Syllabus/Middle", { state: { ...commonState, stream: "NA" } });
            } else if (applyClass >= 9 && applyClass <= 10) {
                navigate("/AfterLogin/Syllabus/High", { state: { ...commonState, stream: "NA" } });
            } else if (applyClass >= 11 && applyClass <= 12) {
                navigate("/AfterLogin/Syllabus/High", { 
                    state: { 
                        ...commonState, 
                        stream: stream !== "NA" ? stream : "Science" 
                    } 
                });
            } else {
                setError("Class not recognized. Please contact admin.");
            }

        } catch (err) {
            console.error("❌ Error:", err);
            setError("Server error. Please try again.");
        } finally {
            // ✅ Always stop loading
            setLoading(false);
        }
    };

    return (
        <div className="sill-bg">
            <div className="sill-card">
                <div className="sill-header">
                    <h2>📚 Syllabus Portal</h2>
                    <p>InspireEdge School</p>
                </div>
                <div className="sill-body">
                    <div className="sill-field">
                        <label>👤 STUDENT NAME</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={studentName}
                            autoComplete="off"
                            onChange={(e) => setStudentName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
                        />
                    </div>
                    <div className="sill-field">
                        <label>🪪 STUDENT ID</label>
                        <input
                            type="text"
                            placeholder="Enter your ID"
                            value={studentId}
                            autoComplete="off"
                            onChange={(e) => setStudentId(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
                        />
                    </div>
                    {error && <p className="sill-error">⚠️ {error}</p>}
                    <button
                        className="sill-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="sill-btn-loading">
                                <span className="sill-spinner"></span>
                                Verifying...
                            </span>
                        ) : (
                            "LOGIN & CONTINUE"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sill;
