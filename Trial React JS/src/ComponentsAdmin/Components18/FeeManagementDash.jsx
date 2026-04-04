import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FeeManagementDash.css";

const FeeManagementDash = () => {
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        paymentType: "all",
        sortBy: "newest"
    });

    const API_URL = "http://localhost:5000/api/fee-management";

    useEffect(() => {
        fetchStatistics();
        fetchPayments();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, payments]);

    const fetchStatistics = async () => {
        try {
            const res = await fetch(`${API_URL}/stats`);
            const data = await res.json();
            if (data.success) {
                setStats(data.statistics);
            }
        } catch (err) {
            console.error("Stats Error:", err);
        }
    };

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/fee-management");
            const data = await res.json();
            if (data.success) {
                setPayments(data.payments);
                setFilteredPayments(data.payments);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...payments];

        // Search filter
        if (filters.search) {
            result = result.filter(p =>
                p.studentId.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.transactionId.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Status filter
        if (filters.status !== "all") {
            result = result.filter(p => p.status === filters.status);
        }

        // Payment type filter
        if (filters.paymentType !== "all") {
            result = result.filter(p => p.paymentType === filters.paymentType);
        }

        // Sorting
        if (filters.sortBy === "newest") {
            result.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
        } else if (filters.sortBy === "oldest") {
            result.sort((a, b) => new Date(a.paidAt) - new Date(b.paidAt));
        } else if (filters.sortBy === "amount_high") {
            result.sort((a, b) => b.paidAmount - a.paidAmount);
        } else if (filters.sortBy === "amount_low") {
            result.sort((a, b) => a.paidAmount - b.paidAmount);
        }

        setFilteredPayments(result);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Paid": return "status-paid";
            case "Partial": return "status-partial";
            case "Pending": return "status-pending";
            default: return "";
        }
    };

    if (loading) {
        return (
            <div className="admin-fee-dashboard">
                <div className="loading-spinner">⏳ Loading...</div>
            </div>
        );
    }

    return (
        <div className="admin-fee-dashboard">
            <div className="dashboard-header">
                <div className="header-left">
                    <div className="header-icon">💰</div>
                    <div>
                        <h1>Fee Management Dashboard</h1>
                        <p>Monitor and manage all student fee payments</p>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            {stats && (
                <div className="stats-grid">
                    <div className="stat-card total-collected">
                        <div className="stat-icon">💵</div>
                        <div className="stat-content">
                            <p className="stat-label">Total Collected</p>
                            <h2 className="stat-value">
                                ₹{(stats.total.totalCollected || 0).toLocaleString("en-IN")}
                            </h2>
                            <p className="stat-detail">{stats.total.count || 0} payments</p>
                        </div>
                    </div>

                    <div className="stat-card total-pending">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-content">
                            <p className="stat-label">Total Pending</p>
                            <h2 className="stat-value">
                                ₹{(stats.total.totalPending || 0).toLocaleString("en-IN")}
                            </h2>
                            <p className="stat-detail">Outstanding balance</p>
                        </div>
                    </div>

                    <div className="stat-card paid-count">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <p className="stat-label">Fully Paid</p>
                            <h2 className="stat-value">
                                {stats.byStatus.find(s => s._id === "Paid")?.count || 0}
                            </h2>
                            <p className="stat-detail">Complete payments</p>
                        </div>
                    </div>

                    <div className="stat-card partial-count">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <p className="stat-label">Partial Paid</p>
                            <h2 className="stat-value">
                                {stats.byStatus.find(s => s._id === "Partial")?.count || 0}
                            </h2>
                            <p className="stat-detail">Incomplete payments</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters Section */}
            <div className="filters-section">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by Student ID, Name, or Transaction ID..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                </div>

                <div className="filter-controls">
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="Paid">✅ Paid</option>
                        <option value="Partial">⚠️ Partial</option>
                        <option value="Pending">⏳ Pending</option>
                    </select>

                    <select
                        value={filters.paymentType}
                        onChange={(e) => handleFilterChange("paymentType", e.target.value)}
                    >
                        <option value="all">All Payment Methods</option>
                        <option value="GPay">🟢 Google Pay</option>
                        <option value="PhonePe">🟣 PhonePe</option>
                        <option value="Paytm">🔵 Paytm</option>
                        <option value="UPI">💠 UPI</option>
                        <option value="Net Banking">🏦 Net Banking</option>
                        <option value="Cash">💵 Cash</option>
                        <option value="Cheque">📝 Cheque</option>
                    </select>

                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    >
                        <option value="newest">📅 Newest First</option>
                        <option value="oldest">📅 Oldest First</option>
                        <option value="amount_high">💰 Amount: High to Low</option>
                        <option value="amount_low">💰 Amount: Low to High</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="table-container">
                <div className="table-header">
                    <h3>💳 Payment Records ({filteredPayments.length})</h3>
                </div>

                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>🆔 Transaction ID</th>
                            <th>👤 Student Details</th>
                            <th>🎓 Class</th>
                            <th>💰 Fees Breakdown</th>
                            <th>💳 Payment Info</th>
                            <th>📅 Date</th>
                            <th>✓ Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-data">
                                    <div className="no-data-content">
                                        <span className="no-data-icon">📭</span>
                                        <p>No payment records found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>
                                        <div className="transaction-id">
                                            <strong>{payment.transactionId}</strong>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="student-details">
                                            <strong>{payment.studentName}</strong>
                                            <small>🆔 {payment.studentId}</small>
                                            <small>📧 {payment.email}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="class-badge">{payment.applyClass}</span>
                                    </td>
                                    <td>
                                        <div className="fee-breakdown">
                                            <div className="fee-row">
                                                <span>Total:</span>
                                                <strong>
                                                    ₹{Number(payment.totalFees || 0).toLocaleString("en-IN")}
                                                </strong>
                                            </div>

                                            <div className="fee-row paid">
                                                <span>Paid:</span>
                                                <strong>
                                                    ₹{Number(payment.paidAmount || 0).toLocaleString("en-IN")}
                                                </strong>
                                            </div>

                                            <div className="fee-row pending">
                                                <span>Pending:</span>
                                                <strong>
                                                    ₹{Number(payment.pendingAmount || 0).toLocaleString("en-IN")}
                                                </strong>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="payment-info">
                                            <span className="payment-method">{payment.paymentType}</span>
                                        </div>
                                    </td>
                                    <td>{formatDate(payment.paidAt)}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(payment.status)}`}>
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
