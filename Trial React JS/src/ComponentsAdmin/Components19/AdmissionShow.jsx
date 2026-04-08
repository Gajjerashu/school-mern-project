import React, { useState, useEffect } from "react";
import "./AdmissionShow.css";

const AdmissionShow = () => {
    const [activeSection, setActiveSection] = useState("all");
    const [activeClass, setActiveClass] = useState("all");
    const [activeLanguage, setActiveLanguage] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [admissions, setAdmissions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const sections = {
        primary: { name: "Primary School", classes: ["1th", "2th", "3th", "4th", "5th"], icon: "🎒" },
        middle: { name: "Middle School", classes: ["6th", "7th", "8th"], icon: "📚" },
        high: { name: "High School", classes: ["9th", "10th", "11th Science", "11th Commerce", "12th Science", "12th Commerce"], icon: "🎓" }
    };

    // ✅ Use relative path (works on Vercel with vercel.json)
    const API_BASE_URL = "/api/admission-dash";

    useEffect(() => {
        fetchStats();
        fetchAdmissions();
    }, [activeSection, activeClass, activeLanguage, searchTerm]);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            const data = await response.json();
            if (data.success) setStats(data.statistics);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchAdmissions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                section: activeSection,
                applyClass: activeClass === "all" ? "" : activeClass,
                language: activeLanguage === "all" ? "" : activeLanguage,
                search: searchTerm
            });

            const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setAdmissions(data.admissions || []);
            }
        } catch (error) {
            console.error("Error fetching admissions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setActiveClass("all");
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getClassesForSection = () => {
        if (activeSection === "all") return [];
        return sections[activeSection]?.classes || [];
    };

    return (
        <div className="admission-show-main">
            <div className="admission-show-content">
                {/* Header */}
                <div className="admission-show-header">
                    <div className="admission-show-header-inner">
                        <div className="admission-show-school-badge">
                            <span>InspireEdge School</span>
                        </div>
                        <h1 className="admission-show-title">📊 Admission Dashboard</h1>
                        <p className="admission-show-subtitle">Manage student admissions across all sections</p>
                    </div>
                </div>

                {/* Statistics Cards */}
                {stats && (
                    <div className="admission-show-stats">
                        <div className="admission-stat-box admission-stat-total">
                            <div className="admission-stat-icon-box">👥</div>
                            <div className="admission-stat-info">
                                <h3>{stats.total || 0}</h3>
                                <p>Total Students</p>
                            </div>
                        </div>
                        <div className="admission-stat-box admission-stat-primary">
                            <div className="admission-stat-icon-box">🎒</div>
                            <div className="admission-stat-info">
                                <h3>{stats.sections?.primary || 0}</h3>
                                <p>Primary School</p>
                            </div>
                        </div>
                        <div className="admission-stat-box admission-stat-middle">
                            <div className="admission-stat-icon-box">📚</div>
                            <div className="admission-stat-info">
                                <h3>{stats.sections?.middle || 0}</h3>
                                <p>Middle School</p>
                            </div>
                        </div>
                        <div className="admission-stat-box admission-stat-high">
                            <div className="admission-stat-icon-box">🎓</div>
                            <div className="admission-stat-info">
                                <h3>{stats.sections?.high || 0}</h3>
                                <p>High School</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Tabs */}
                <div className="admission-section-tabs">
                    <button
                        className={`admission-tab-button ${activeSection === "all" ? "admission-tab-active" : ""}`}
                        onClick={() => handleSectionChange("all")}
                    >
                        🏫 All Sections
                    </button>
                    {Object.entries(sections).map(([key, section]) => (
                        <button
                            key={key}
                            className={`admission-tab-button ${activeSection === key ? "admission-tab-active" : ""}`}
                            onClick={() => handleSectionChange(key)}
                        >
                            {section.icon} {section.name}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="admission-filters-container">
                    <div className="admission-search-wrapper">
                        <span className="admission-search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by name, ID, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="admission-filter-controls">
                        {activeSection !== "all" && getClassesForSection().length > 0 && (
                            <select
                                value={activeClass}
                                onChange={(e) => setActiveClass(e.target.value)}
                                className="admission-select-box"
                            >
                                <option value="all">All Classes</option>
                                {getClassesForSection().map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        )}

                        <select
                            value={activeLanguage}
                            onChange={(e) => setActiveLanguage(e.target.value)}
                            className="admission-select-box"
                        >
                            <option value="all">All Languages</option>
                            <option value="English">English</option>
                            <option value="Gujarati">Gujarati</option>
                        </select>
                    </div>
                </div>

                {/* Students Grid */}
                <div className="admission-students-section">
                    <div className="admission-students-header">
                        <h2>
                            {activeSection === "all" ? "All Students" : sections[activeSection]?.name}
                        </h2>
                        <span className="admission-count-pill">{admissions.length} Students</span>
                    </div>

                    {loading ? (
                        <div className="admission-loading-box">
                            <div className="admission-loading-spinner"></div>
                            <p>Loading students...</p>
                        </div>
                    ) : admissions.length === 0 ? (
                        <div className="admission-empty-box">
                            <div className="admission-empty-emoji">📭</div>
                            <h3>No Students Found</h3>
                            <p>Try adjusting your filters or search criteria</p>
                        </div>
                    ) : (
                        <div className="admission-students-grid">
                            {admissions.map((student) => (
                                <div key={student._id} className="admission-student-card">
                                    <div className="admission-card-top">
                                        <div className="admission-avatar-circle">
                                            {student.gender === "Male" ? "👦" : "👧"}
                                        </div>
                                        <div className="admission-id-badge">
                                            <span className="admission-id-label">ID</span>
                                            <span className="admission-id-number">{student.studentId}</span>
                                        </div>
                                    </div>

                                    <div className="admission-card-middle">
                                        <h3 className="admission-student-name">{student.studentName}</h3>

                                        <div className="admission-detail-row">
                                            <span className="admission-detail-icon">🎓</span>
                                            <span>Class: <strong>{student.applyClass}</strong></span>
                                        </div>

                                        <div className="admission-detail-row">
                                            <span className="admission-detail-icon">🗣️</span>
                                            <span>Medium: <strong>{student.language}</strong></span>
                                        </div>

                                        <div className="admission-detail-row">
                                            <span className="admission-detail-icon">👨</span>
                                            <span>Father: <strong>{student.fatherName}</strong></span>
                                        </div>

                                        <div className="admission-detail-row">
                                            <span className="admission-detail-icon">📞</span>
                                            <span>{student.parentPhone}</span>
                                        </div>

                                        <div className="admission-detail-row">
                                            <span className="admission-detail-icon">📧</span>
                                            <span className="admission-email">{student.parentEmail}</span>
                                        </div>

                                        <div className="admission-detail-row">
                                            <span className="admission-detail-icon">📅</span>
                                            <span>Admitted: {formatDate(student.createdAt)}</span>
                                        </div>
                                    </div>

                                    <div className="admission-card-bottom">
                                        <button
                                            className="admission-view-button"
                                            onClick={() => setSelectedStudent(student)}
                                        >
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div className="admission-modal-backdrop" onClick={() => setSelectedStudent(null)}>
                    <div className="admission-modal-box" onClick={e => e.stopPropagation()}>
                        <div className="admission-modal-top">
                            <h2>Student Details</h2>
                            <button className="admission-modal-close" onClick={() => setSelectedStudent(null)}>✕</button>
                        </div>
                        <div className="admission-modal-content">
                            <div className="admission-details-grid">
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Student ID</span>
                                    <span className="admission-detail-val">{selectedStudent.studentId}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Student Name</span>
                                    <span className="admission-detail-val">{selectedStudent.studentName}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Father Name</span>
                                    <span className="admission-detail-val">{selectedStudent.fatherName}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Mother Name</span>
                                    <span className="admission-detail-val">{selectedStudent.motherName}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Date of Birth</span>
                                    <span className="admission-detail-val">{formatDate(selectedStudent.dateOfBirth)}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Gender</span>
                                    <span className="admission-detail-val">{selectedStudent.gender}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Class</span>
                                    <span className="admission-detail-val">{selectedStudent.applyClass}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Medium</span>
                                    <span className="admission-detail-val">{selectedStudent.language}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Phone</span>
                                    <span className="admission-detail-val">{selectedStudent.parentPhone}</span>
                                </div>
                                <div className="admission-detail-item">
                                    <span className="admission-detail-key">Email</span>
                                    <span className="admission-detail-val">{selectedStudent.parentEmail}</span>
                                </div>
                                <div className="admission-detail-item admission-full-width">
                                    <span className="admission-detail-key">Address</span>
                                    <span className="admission-detail-val">
                                        {selectedStudent.address}, {selectedStudent.city}, {selectedStudent.state} - {selectedStudent.pincode}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdmissionShow;
