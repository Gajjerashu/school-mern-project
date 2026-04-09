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
                    medium: language || "English"
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
                    setError(err.response?.data?.message || "Server error. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabus();
        return () => source.cancel("Operation canceled by the user.");
    }, [applyClass, language, stream, studentName]);

    if (!studentName || !applyClass) {
        return (
            <div className="prime-error-container">
                <div className="prime-error-card">
                    <h2>🚫 Access Denied</h2>
                    <p>Please login from the Syllabus portal.</p>
                    <button className="prime-back-btn" onClick={() => navigate("/AfterLogin/Syllabus")}>
                        Go to Syllabus Portal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="prime-bg">
            <div className="prime-banner">
                <div className="prime-banner-content">
                    <h1>🎓 Higher Secondary School Syllabus</h1>
                    <p>Standard {applyClass} — {stream || "General"} — {language} Medium</p>
                    <div className="student-badge">
                        👤 {studentName}
                    </div>
                </div>
            </div>

            <div className="prime-container">
                {loading ? (
                    <div className="prime-loading">
                        <div className="prime-spinner"></div>
                        <p>Fetching your syllabus...</p>
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
                            {syllabusData?.subjects?.map((subj, idx) => (
                                <div
                                    className="prime-subject-card"
                                    key={subj.subjectName}
                                    style={{ "--accent": SUBJECT_COLORS[idx % SUBJECT_COLORS.length] }}
                                >
                                    <div className="prime-subject-header">
                                        <span className="subject-icon">{getIcon(subj.subjectName)}</span>
                                        <h3>{subj.subjectName}</h3>
                                    </div>
                                    <ul className="prime-topic-list">
                                        {subj.topics.map((topic, i) => (
                                            <li key={i}>
                                                <span className="bullet">•</span> {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="prime-footer">
                            <button 
                                className="prime-back-btn"
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
