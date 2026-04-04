import React, { useState, useEffect } from "react";
import "./AdmissionDashboard.css";

const AdmissionDashboard = () => {
    const [admissions, setAdmissions] = useState([]);
    const [filteredAdmissions, setFilteredAdmissions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const filterLastWeek = (data) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return data.filter(admission => new Date(admission.createdAt) >= oneWeekAgo);
    };

    const applyStatusFilter = (data, filter) => {
        if (filter === "approved") return data.filter(adm => adm.approved || adm.isApproved);
        if (filter === "pending") return data.filter(adm => !adm.approved && !adm.isApproved);
        return data;
    };

    const fetchAdmissions = async (searchQuery = "") => {
        try {
            setLoading(true);
            const trimmedSearch = searchQuery.trim();
            const response = await fetch(`${API_BASE_URL}/api/addDash?search=${encodeURIComponent(trimmedSearch)}`);
            
            if (!response.ok) throw new Error("Failed to fetch admissions");
            
            const result = await response.json();
            const finalData = trimmedSearch === "" ? filterLastWeek(result.admissions || result) : (result.admissions || result);
            
            setAdmissions(finalData);
            setFilteredAdmissions(applyStatusFilter(finalData, activeFilter));
        } catch (err) {
            console.error("❌ Fetch Error:", err);
            setAdmissions([]);
            setFilteredAdmissions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setFilteredAdmissions(applyStatusFilter(admissions, filter));
    };

    useEffect(() => { fetchAdmissions(); }, []);
    useEffect(() => { setFilteredAdmissions(applyStatusFilter(admissions, activeFilter)); }, [activeFilter, admissions]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const totalCount = admissions.length;
    const approvedCount = admissions.filter(adm => adm.approved || adm.isApproved).length;
    const pendingCount = admissions.filter(adm => !adm.approved && !adm.isApproved).length;

    return (
        <section className="admissions-dashboard-main">
            <div className="admissions-dashboard-container">
                {/* Header */}
                <div className="admissions-header-section">
                    <div className="admissions-header-content">
                        <div className="admissions-school-badge">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
                                <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z"/>
                                <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z"/>
                            </svg>
                            <span>InspireEdge School</span>
                        </div>
                        <h1 className="admissions-main-title">Admission Dashboard</h1>
                    </div>
                </div>

                {/* Stats */}
                <div className="admissions-stats-container">
                    <div className={`admissions-stat-card admissions-stat-total ${activeFilter === 'all' ? 'admissions-stat-selected' : ''}`}
                         onClick={() => handleFilterChange('all')}>
                        <div className="admissions-stat-icon admissions-icon-blue">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                        </div>
                        <div className="admissions-stat-details">
                            <p className="admissions-stat-label">Total Admissions</p>
                            <p className="admissions-stat-value">{totalCount}</p>
                        </div>
                    </div>

                    <div className={`admissions-stat-card admissions-stat-approved ${activeFilter === 'approved' ? 'admissions-stat-selected' : ''}`}
                         onClick={() => handleFilterChange('approved')}>
                        <div className="admissions-stat-icon admissions-icon-green">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <div className="admissions-stat-details">
                            <p className="admissions-stat-label">Approved</p>
                            <p className="admissions-stat-value">{approvedCount}</p>
                        </div>
                    </div>

                    <div className={`admissions-stat-card admissions-stat-pending ${activeFilter === 'pending' ? 'admissions-stat-selected' : ''}`}
                         onClick={() => handleFilterChange('pending')}>
                        <div className="admissions-stat-icon admissions-icon-orange">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                        </div>
                        <div className="admissions-stat-details">
                            <p className="admissions-stat-label">Pending Approval</p>
                            <p className="admissions-stat-value">{pendingCount}</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="admissions-search-wrapper">
                    <form className="admissions-search-form" onSubmit={(e) => { e.preventDefault(); fetchAdmissions(search); }}>
                        <div className="admissions-search-field">
                            <svg className="admissions-search-svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            <input type="text" placeholder="Search by Student ID or Name..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                        <button type="submit" className="admissions-search-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="admissions-loading-state">
                        <div className="admissions-loading-spinner"></div>
                        <p>Loading admissions...</p>
                    </div>
                ) : (
                    <div className="admissions-table-container">
                        <table className="admissions-table">
                            <thead>
                                <tr>
                                    <th>Student ID</th><th>Student Name</th><th>Parent</th><th>Phone</th>
                                    <th>Email</th><th>Class</th><th>Medium</th><th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAdmissions.length === 0 ? (
                                    <tr><td colSpan="8" className="admissions-empty-state">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                        </svg>
                                        <p>No admissions found</p>
                                    </td></tr>
                                ) : (
                                    filteredAdmissions.map((adm) => (
                                        <tr key={adm._id}>
                                            <td className="admissions-student-id">{adm.studentId || "N/A"}</td>
                                            <td>{adm.studentName}</td>
                                            <td>{adm.fatherName}</td>
                                            <td>{adm.parentPhone}</td>
                                            <td className="admissions-email-field">{adm.parentEmail}</td>
                                            <td><span className="admissions-class-chip">{adm.applyClass}</span></td>
                                            <td>
                                                {adm.language ? (
                                                    <span className={`admissions-medium-chip ${adm.language === 'English Medium' ? 'admissions-english' : 'admissions-gujarati'}`}>
                                                        {adm.language === 'English Medium' ? 'English' : 'ગુજરાતી'}
                                                    </span>
                                                ) : (
                                                    <span className="admissions-na-chip">N/A</span>
                                                )}
                                            </td>
                                            <td>{formatDate(adm.createdAt)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdmissionDashboard;
