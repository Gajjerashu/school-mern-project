import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Prime.css";

const API_BASE_URL = "/api";

const ICON_MAP = {
    "Ganit": "📐", "Mathematics": "📐",
    "Gujarati": "📖", "English": "📖",
    "Vigyan": "🔬", "Science": "🔬",
    "Samajik Vigyan": "🌍", "Social Science": "🌍",
    "Hindi": "🇮🇳"
};

const Prime = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { studentName, applyClass, language, stream } = location.state || {};

    const [syllabusData, setSyllabusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getIcon = (subject) => ICON_MAP[subject] || "📚";

    const levelLabel = useMemo(() => {
        const cls = parseInt(applyClass);
        if (cls <= 5) return "Primary School";
        if (cls <= 8) return "Middle School";
        if (cls <= 10) return "High School";
        return "Higher Secondary School";
    }, [applyClass]);

    useEffect(() => {
        if (!studentName || !applyClass) return;

        const source = axios.CancelToken.source();

        const fetchSyllabus = async () => {
            setLoading(true);
            setError("");
            try {
                const params = {
                    standard: applyClass,
                    medium: language || "Gujarati"
                };

                if (parseInt(applyClass) >= 11 && stream && stream !== "NA") {
                    params.stream = stream;
                }

                const res = await axios.get(`${API_BASE_URL}/syllabus-data`, {
                    params,
                    cancelToken: source.token
                });

                if (res.data.success) {
                    setSyllabusData(res.data.data);
                } else {
                    setError("Syllabus not found for your class.");
                }
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError("Server error. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabus();
        return () => source.cancel();
    }, [applyClass, language, stream, studentName]);

    if (!studentName || !applyClass) {
        return <div className="prime-error">Access Denied. Go back to Syllabus Portal.</div>;
    }

    return (
        <div className="prime-bg">
            <div className="prime-banner">
                <h1>📚 High School Syllabus</h1>
                <p>Standard {applyClass} — Gujarati Medium</p>
                <div className="student-badge">👤 {studentName}</div>
            </div>

            <div className="prime-container">
                {loading ? (
                    <div className="loading">Loading syllabus...</div>
                ) : error ? (
                    <div className="error-box">
                        <p>⚠️ {error}</p>
                        <button onClick={() => navigate("/AfterLogin/Syllabus")}>Try Again</button>
                    </div>
                ) : (
                    <>
                        <div className="prime-grid">
                            {syllabusData?.subjects?.map((subj, idx) => (
                                <div className="prime-subject-card" key={subj.subjectName}>
                                    <div className="prime-subject-header">
                                        <span className="subject-icon">{getIcon(subj.subjectName)}</span>
                                        <h3>{subj.subjectName}</h3>
                                    </div>
                                    <ul className="prime-topic-list">
                                        {subj.topics.map((topic, i) => (
                                            <li key={i}>• {topic}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="prime-footer">
                            <button 
                                className="back-btn"
                                onClick={() => navigate("/AfterLogin/Syllabus")}
                            >
                                ← Back to Syllabus Portal
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Prime;
