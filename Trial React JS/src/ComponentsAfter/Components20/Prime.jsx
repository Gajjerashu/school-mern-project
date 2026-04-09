import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Prime.css";

const API_BASE_URL = "/api";

const SUBJECT_COLORS = [
    "#16a34a", "#0284c7", "#7c3aed", "#dc2626", "#d97706",
    "#0891b2", "#be185d", "#65a30d", "#9333ea", "#ea580c"
];

const ICON_MAP = {
    Mathematics: "🔢", Ganit: "🔢", English: "📖", Gujarati: "📖",
    EVS: "🌿", Paryavaran: "🌿", Hindi: "🇮🇳", Science: "🔬", 
    Vigyan: "🔬", "Social Science": "🌍", "Samajik Vigyan": "🌍",
    Art: "🎨", Kala: "🎨", Physics: "⚡", Bhautikshaastr: "⚡",
    Chemistry: "🧪", Rasayanshaastr: "🧪", Biology: "🧬", Jivvigyan: "🧬",
    Accountancy: "📊", "Hisabi Vidya": "📊", "Business Studies": "💼", 
    "Vanijya Vyavasaay": "💼", Economics: "📈", Arthashastr: "📈",
};

const Prime = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { studentName, applyClass, language, stream } = location.state || {};

    const [syllabusData, setSyllabusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Memoize the icon function to avoid recalculation
    const getIcon = (subject) => ICON_MAP[subject] || "📚";

    // Memoize Level Label
    const levelLabel = useMemo(() => {
        const cls = parseInt(applyClass);
        if (cls <= 5) return "Primary School";
        if (cls <= 8) return "Middle School";
        if (cls <= 10) return "High School";
        return "Higher Secondary School";
    }, [applyClass]);

    useEffect(() => {
        // Redirect if direct access
        if (!studentName || !applyClass) {
            return;
        }

        const source = axios.CancelToken.source();

        const fetchSyllabus = async () => {
            setLoading(true);
            setError("");
            try {
                const params = {
                    standard: applyClass,
                    medium: language || "English"
                };

                // Add stream only for higher secondary
                if (parseInt(applyClass) >= 11 && stream && stream !== "NA") {
                    params.stream = stream;
                }

                const res = await axios.get(`${API_BASE_URL}/api/syllabus-data`, {
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
                    setError(err.response?.data?.message || "Server error. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabus();
        return () => source.cancel("Operation canceled by the user.");
    }, [applyClass, language, stream, studentName]);

    // Access Denied View
    if (!studentName || !applyClass) {
        return (
            <div className="prime-error-container">
                <div className="prime-error-card">
                    <h2>🚫 Access Denied</h2>
                    <p>Please login from the Syllabus portal to view your content.</p>
                    <button className="prime-back-btn" onClick={() => navigate("/AfterLogin/Syllabus")}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="prime-bg">
            <div className="prime-banner">
                <div className="prime-banner-content">
                    <span className="prime-badge-top">{levelLabel}</span>
                    <h1>Syllabus Dashboard</h1>
                    <p>Standard {applyClass} {stream && stream !== "NA" ? `— ${stream}` : ""} | {language} Medium</p>
                    <div className="prime-student-info">
                        <span className="avatar">👤</span>
                        <span>Welcome, <strong>{studentName}</strong></span>
                    </div>
                </div>
            </div>

            <div className="prime-container">
                {loading ? (
                    <div className="prime-loading">
                        <div className="prime-spinner"></div>
                        <p>Fetching your topics...</p>
                    </div>
                ) : error ? (
                    <div className="prime-error-box">
                        <p>⚠️ {error}</p>
                        <button className="prime-back-btn" onClick={() => navigate("/AfterLogin/Syllabus")}>
                            ← Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="prime-grid">
                            {syllabusData?.subjects.map((subj, idx) => (
                                <div 
                                    className="prime-subject-card" 
                                    key={subj.subjectName}
                                    style={{ "--accent": SUBJECT_COLORS[idx % SUBJECT_COLORS.length] }}
                                >
                                    <div className="prime-card-inner">
                                        <div className="prime-subject-header">
                                            <div className="icon-wrapper">
                                                {getIcon(subj.subjectName)}
                                            </div>
                                            <h3>{subj.subjectName}</h3>
                                        </div>
                                        <div className="prime-divider"></div>
                                        <ul className="prime-topic-list">
                                            {subj.topics.map((topic, i) => (
                                                <li key={i}>
                                                    <span className="prime-topic-num">{i + 1}</span>
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="prime-footer-actions">
                             <button className="prime-back-link" onClick={() => navigate("/AfterLogin/Syllabus")}>
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
