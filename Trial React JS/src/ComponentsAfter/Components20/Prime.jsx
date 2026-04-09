import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Prime.css";

const SUBJECT_COLORS = [
    "#16a34a", "#0284c7", "#7c3aed", "#dc2626", "#d97706",
    "#0891b2", "#be185d", "#65a30d", "#9333ea", "#ea580c"
];

function getIcon(subject) {
    const map = {
        Mathematics: "🔢", Ganit: "🔢",
        English: "📖", Gujarati: "📖",
        EVS: "🌿", Paryavaran: "🌿",
        Hindi: "🇮🇳",
        Science: "🔬", Vigyan: "🔬",
        "Social Science": "🌍", "Samajik Vigyan": "🌍",
        Art: "🎨", Kala: "🎨",
        Physics: "⚡", Bhautikshaastr: "⚡",
        Chemistry: "🧪", Rasayanshaastr: "🧪",
        Biology: "🧬", Jivvigyan: "🧬",
        Accountancy: "📊", "Hisabi Vidya": "📊",
        "Business Studies": "💼", "Vanijya Vyavasaay": "💼",
        Economics: "📈", Arthashastr: "📈",
    };
    return map[subject] || "📚";
}

const Prime = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { studentName, applyClass, language, stream } = location.state || {};

    const [syllabusData, setSyllabusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!studentName || !applyClass) return;

        const fetchSyllabus = async () => {
            setLoading(true);
            setError("");
            try {
                let url = `/api/syllabus-data?standard=${applyClass}&medium=${language || "English"}`;
                if (applyClass >= 11 && stream) {
                    url += `&stream=${stream}`;
                }
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok || !data.success) {
                    setError("Syllabus not found for your class.");
                } else {
                    setSyllabusData(data.data);
                }
            } catch (err) {
                setError("Server error. Please try again.");
            }
            setLoading(false);
        };

        fetchSyllabus();
    }, [applyClass, language, stream]);

    if (!studentName || !applyClass) {
        return (
            <div style={{ textAlign: "center", marginTop: "80px" }}>
                <p>Access denied. Please login from Syllabus page.</p>
                <button
                    className="prime-back-btn"
                    style={{ marginTop: "16px" }}
                    onClick={() => navigate("/AfterLogin/Syllabus")}
                >
                    Go Back
                </button>
            </div>
        );
    }

    const levelLabel =
        applyClass <= 5 ? "Primary School" :
            applyClass <= 8 ? "Middle School" :
                applyClass <= 10 ? "High School" :
                    "Higher Secondary School";

    return (
        <div className="prime-bg">
            {/* Banner */}
            <div className="prime-banner">
                <div className="prime-banner-content">
                    <h1>📚 {levelLabel} Syllabus</h1>
                    <p>
                        Standard {applyClass}
                        {stream && stream !== "NA" ? ` — ${stream}` : ""}
                        {" "}— {language} Medium
                    </p>
                    <div className="prime-student-badge">👤 {studentName}</div>
                </div>
            </div>

            {/* Content */}
            <div className="prime-container">

                {/* Loading */}
                {loading && (
                    <div className="prime-loading">
                        <div className="prime-spinner"></div>
                        <p>Loading Syllabus...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="prime-error-box">
                        <p>⚠️ {error}</p>
                        <button
                            className="prime-back-btn"
                            onClick={() => navigate("/AfterLogin/Syllabus")}
                        >
                            ← Go Back
                        </button>
                    </div>
                )}

                {/* Syllabus Grid */}
                {!loading && !error && syllabusData && (
                    <>
                        <div className="prime-grid">
                            {syllabusData.subjects.map((subj, idx) => (
                                <div
                                    className="prime-subject-card"
                                    key={subj.subjectName}
                                    style={{ "--accent": SUBJECT_COLORS[idx % SUBJECT_COLORS.length] }}
                                >
                                    <div className="prime-subject-header">
                                        <span className="prime-subject-icon">
                                            {getIcon(subj.subjectName)}
                                        </span>
                                        <h3>{subj.subjectName}</h3>
                                    </div>
                                    <ul className="prime-topic-list">
                                        {subj.topics.map((topic, i) => (
                                            <li key={i}>
                                                <span className="prime-dot" />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <button
                            className="prime-back-btn"
                            onClick={() => navigate("/AfterLogin/Syllabus")}
                        >
                            ← Back to Syllabus Portal
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Prime;
