import React, { useState, useEffect } from "react";
import "./FeeManagementDash.css";

const FeeManagementDash = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        paymentType: "all",
        sortBy: "newest"
    });

    // Use relative path (best for Vercel + Render)
    const API_BASE_URL = "/api/fee-management";

    useEffect(() => {
        fetchPayments();
        fetchStatistics();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, payments]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_BASE_URL);
            const data = await res.json();

            if (data.success) {
                setPayments(data.payments || []);
                setFilteredPayments(data.payments || []);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to load payments");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/stats`);
            const data = await res.json();
            if (data.success) setStats(data.statistics);
        } catch (err) {
            console.error("Stats error:", err);
        }
    };

    const applyFilters = () => {
        let result = [...payments];

        if (filters.search) {
            const term = filters.search.toLowerCase();
            result = result.filter(p =>
                p.studentName?.toLowerCase().includes(term) ||
                p.studentId?.toLowerCase().includes(term) ||
                p.transactionId?.toLowerCase().includes(term)
            );
        }

        if (filters.status !== "all") {
            result = result.filter(p => p.status === filters.status);
        }

        if (filters.paymentType !== "all") {
            result = result.filter(p => p.paymentType === filters.paymentType);
        }

        if (filters.sortBy === "newest") {
            result.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
        } else if (filters.sortBy === "oldest") {
            result.sort((a, b) => new Date(a.paidAt) - new Date(b.paidAt));
        } else if (filters.sortBy === "amount_high") {
            result.sort((a, b) => (b.paidAmount || 0) - (a.paidAmount || 0));
        } else if (filters.sortBy === "amount_low") {
            result.sort((a, b) => (a.paidAmount || 0) - (b.paidAmount || 0));
        }

        setFilteredPayments(result);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusClass = (status) => {
        if (status === "Paid") return "status-paid";
        if (status === "Partial") return "status-partial";
        return "status-pending";
    };

    if (loading) {
        return <div className="loading-spinner">Loading Fee Dashboard...</div>;
    }

    return (
        <div className="admin-fee-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <div className="header-icon">💰</div>
                    <div>
                        <h1>Fee Management Dashboard</h1>
                        <p>Monitor and manage all student fee payments</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="stats-grid">
                    <div className="stat-card total-collected">
                        <div className="stat-icon">💵</div>
                        <div className="stat-content">
                            <p className="stat-label">TOTAL COLLECTED</p>
                            <h2>₹{(stats.total?.totalCollected || 0).toLocaleString("en-IN")}</h2>
                            <p className="stat-detail">{stats.total?.count || 0} payments</p>
                        </div>
                    </div>

                    <div className="stat-card total-pending">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-content">
                            <p className="stat-label">TOTAL PENDING</p>
                            <h2>₹{(stats.total?.totalPending || 0).toLocaleString("en-IN")}</h2>
                            <p className="stat-detail">Outstanding balance</p>
                        </div>
                    </div>

                    <div className="stat-card fully-paid">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <p className="stat-label">FULLY PAID</p>
                            <h2>{stats.byStatus?.find(s => s._id === "Paid")?.count || 0}</h2>
                            <p className="stat-detail">Complete payments</p>
                        </div>
                    </div>

                    <div className="stat-card partial-paid">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <p className="stat-label">PARTIAL PAID</p>
                            <h2>{stats.byStatus?.find(s => s._id === "Partial")?.count || 0}</h2>
                            <p className="stat-detail">Incomplete payments</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by Student ID, Name, or Transaction ID..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                </div>

                <div className="filter-controls">
                    <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Partial">Partial</option>
                        <option value="Pending">Pending</option>
                    </select>

                    <select value={filters.paymentType} onChange={(e) => handleFilterChange("paymentType", e.target.value)}>
                        <option value="all">All Payment Methods</option>
                        <option value="GPay">GPay</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>

                    <select value={filters.sortBy} onChange={(e) => handleFilterChange("sortBy", e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="amount_high">Amount High → Low</option>
                        <option value="amount_low">Amount Low → High</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <div className="table-header">
                    <h3>PAYMENT RECORDS ({filteredPayments.length})</h3>
                </div>

                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Student Details</th>
                            <th>Class</th>
                            <th>Fees Breakdown</th>
                            <th>Payment Info</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-data">No payment records found</td>
                            </tr>
                        ) : (
                            filteredPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td className="txn-id">{payment.transactionId}</td>
                                    <td>
                                        <strong>{payment.studentName}</strong><br />
                                        <small>{payment.studentId}</small><br />
                                        <small>{payment.email}</small>
                                    </td>
                                    <td>
                                        <span className="class-badge">{payment.applyClass}</span>
                                    </td>
                                    <td>
                                        <div className="fee-breakdown">
                                            <div><span>Total:</span> ₹{Number(payment.totalFees || 0).toLocaleString("en-IN")}</div>
                                            <div className="paid"><span>Paid:</span> ₹{Number(payment.paidAmount || 0).toLocaleString("en-IN")}</div>
                                            <div className="pending"><span>Pending:</span> ₹{Number(payment.pendingAmount || 0).toLocaleString("en-IN")}</div>
                                        </div>
                                    </td>
                                    <td>{payment.paymentType || payment.paymentMethod}</td>
                                    <td>{formatDate(payment.paidAt)}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeeManagementDash;
