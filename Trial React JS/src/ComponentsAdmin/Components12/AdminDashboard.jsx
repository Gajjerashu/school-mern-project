const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [processingId, setProcessingId] = useState(null);

    const filterLastWeek = (data) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return data.filter(inquiry => new Date(inquiry.createdAt) >= oneWeekAgo);
    };

    const applyStatusFilter = (data, filter) => {
        if (filter === "approved") return data.filter(inq => inq.approved || inq.isApproved);
        if (filter === "pending") return data.filter(inq => !inq.approved && !inq.isApproved);
        return data;
    };

    const fetchInquiries = async (searchQuery = "") => {
        try {
            setLoading(true);
            const trimmedSearch = searchQuery.trim();
            const response = await fetch(`${API_URL}/api/admin?search=${encodeURIComponent(trimmedSearch)}`);
            if (!response.ok) throw new Error("Failed to fetch inquiries");
            
            const data = await response.json();
            const finalData = trimmedSearch === "" ? filterLastWeek(data) : data;
            
            setInquiries(finalData);
            setFilteredInquiries(applyStatusFilter(finalData, activeFilter));
        } catch (err) {
            console.error("❌ Fetch Error:", err);
            setInquiries([]);
            setFilteredInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (inquiryId, currentStatus) => {
        try {
            setProcessingId(inquiryId);
            const response = await fetch(`${API_URL}/api/admin/approve/${inquiryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isApproved: !currentStatus }),
            });

            if (!response.ok) throw new Error("Failed to update approval status");
            const result = await response.json();

            if (result.success) {
                const updatedInquiries = inquiries.map(inq =>
                    inq._id === inquiryId ? { ...inq, approved: result.inquiry.approved, isApproved: result.inquiry.isApproved } : inq
                );
                setInquiries(updatedInquiries);
                setFilteredInquiries(applyStatusFilter(updatedInquiries, activeFilter));
            }
        } catch (err) {
            console.error("❌ Approval Error:", err);
            alert(`Failed to update: ${err.message}`);
        } finally {
            setProcessingId(null);
        }
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setFilteredInquiries(applyStatusFilter(inquiries, filter));
    };

    useEffect(() => { fetchInquiries(); }, []);
    useEffect(() => { setFilteredInquiries(applyStatusFilter(inquiries, activeFilter)); }, [activeFilter, inquiries]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const totalCount = inquiries.length;
    const approvedCount = inquiries.filter(inq => inq.approved || inq.isApproved).length;
    const pendingCount = inquiries.filter(inq => !inq.approved && !inq.isApproved).length;

    return (
        <section className="inquiry-dashboard-wrapper">
            <div className="inquiry-dashboard-content">
                {/* Header */}
                <div className="inquiry-header-box">
                    <div className="inquiry-header-inner">
                        <div className="school-name-pill">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
                                <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z"/>
                                <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z"/>
                            </svg>
                            <span>InspireEdge School</span>
                        </div>
                        <h1 className="inquiry-page-title">Inquiry Dashboard</h1>
                    </div>
                </div>

                {/* Stats */}
                <div className="inquiry-stats-grid">
                    <div className={`inquiry-stat-box inquiry-stat-total ${activeFilter === 'all' ? 'inquiry-stat-active' : ''}`}
                         onClick={() => handleFilterChange('all')}>
                        <div className="inquiry-stat-icon-wrapper inquiry-stat-icon-blue">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                        </div>
                        <div className="inquiry-stat-text">
                            <p className="inquiry-stat-title">Total Inquiries</p>
                            <p className="inquiry-stat-number">{totalCount}</p>
                        </div>
                    </div>

                    <div className={`inquiry-stat-box inquiry-stat-approved ${activeFilter === 'approved' ? 'inquiry-stat-active' : ''}`}
                         onClick={() => handleFilterChange('approved')}>
                        <div className="inquiry-stat-icon-wrapper inquiry-stat-icon-green">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <div className="inquiry-stat-text">
                            <p className="inquiry-stat-title">Approved</p>
                            <p className="inquiry-stat-number">{approvedCount}</p>
                        </div>
                    </div>

                    <div className={`inquiry-stat-box inquiry-stat-pending ${activeFilter === 'pending' ? 'inquiry-stat-active' : ''}`}
                         onClick={() => handleFilterChange('pending')}>
                        <div className="inquiry-stat-icon-wrapper inquiry-stat-icon-orange">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                        </div>
                        <div className="inquiry-stat-text">
                            <p className="inquiry-stat-title">Pending Approval</p>
                            <p className="inquiry-stat-number">{pendingCount}</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="inquiry-search-container">
                    <form className="inquiry-search-form" onSubmit={(e) => { e.preventDefault(); fetchInquiries(search); }}>
                        <div className="inquiry-search-input-box">
                            <svg className="inquiry-search-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            <input type="text" placeholder="Search by Inquiry ID or Name..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                        <button type="submit" className="inquiry-search-button">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="inquiry-loading-box">
                        <div className="inquiry-spinner"></div>
                        <p>Loading inquiries...</p>
                    </div>
                ) : (
                    <div className="inquiry-table-wrapper">
                        <table className="inquiry-data-table">
                            <thead>
                                <tr>
                                    <th>Inquiry ID</th><th>Student Name</th><th>Parent</th><th>Phone</th>
                                    <th>Email</th><th>Class</th><th>Medium</th><th>Date</th><th>Status</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInquiries.length === 0 ? (
                                    <tr><td colSpan="10" className="inquiry-no-data">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                        </svg>
                                        <p>No inquiries found</p>
                                    </td></tr>
                                ) : (
                                    filteredInquiries.map((inq) => (
                                        <tr key={inq._id}>
                                            <td className="inquiry-id-cell">{inq.inquiryId}</td>
                                            <td>{inq.studentName}</td>
                                            <td>{inq.parentName}</td>
                                            <td>{inq.parentPhone}</td>
                                            <td className="inquiry-email-cell">{inq.parentEmail}</td>
                                            <td><span className="inquiry-class-tag">{inq.applyClass}</span></td>
                                            <td>
                                                <span className={`inquiry-medium-tag ${inq.language === 'English Medium' ? 'inquiry-medium-english' : 'inquiry-medium-gujarati'}`}>
                                                    {inq.language === 'English Medium' ? 'English' : 'ગુજરાતી'}
                                                </span>
                                            </td>
                                            <td>{formatDate(inq.createdAt)}</td>
                                            <td>
                                                <span className={`inquiry-status-tag ${(inq.approved || inq.isApproved) ? 'inquiry-status-approved' : 'inquiry-status-pending'}`}>
                                                    {(inq.approved || inq.isApproved) ? "Approved" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="inquiry-action-cell">
                                                <button className={`inquiry-action-btn ${(inq.approved || inq.isApproved) ? 'inquiry-btn-revoke' : 'inquiry-btn-approve'}`}
                                                        onClick={() => handleApproval(inq._id, inq.approved || inq.isApproved)}
                                                        disabled={processingId === inq._id}>
                                                    {(inq.approved || inq.isApproved) ? (
                                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                                        </svg>
                                                    ) : (
                                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                                        </svg>
                                                    )}
                                                </button>
                                            </td>
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

export default AdminDashboard;
