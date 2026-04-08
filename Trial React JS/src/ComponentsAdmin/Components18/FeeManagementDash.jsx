import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FeeManagementDash.css";

const FeeManagementDash = () => {
    const navigate = useNavigate();

    // ✅ FIXED: Use relative /api path (works with vercel.json proxy)
    const API_BASE_URL = "/api/fee-management";

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

    useEffect(() => {
        fetchStatistics();
        fetchPayments();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, payments]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(API_BASE_URL);   // ← Fixed here

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            if (data.success) {
                setPayments(data.payments || []);
                setFilteredPayments(data.payments || []);
            } else {
                setError(data.error || "Failed to load payments");
            }
        } catch (err) {
            console.error("Fetch Payments Error:", err);
            setError("Failed to connect to server. Is backend running?");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/stats`);   // ← Fixed here
            const data = await res.json();
            if (data.success) {
                setStats(data.statistics);
            }
        } catch (err) {
            console.error("Stats Error:", err);
        }
    };

    const applyFilters = () => {
        let result = [...payments];

        if (filters.search) {
            const term = filters.search.toLowerCase();
            result = result.filter(p =>
                p.studentId?.toLowerCase().includes(term) ||
                p.studentName?.toLowerCase().includes(term) ||
                p.transactionId?.toLowerCase().includes(term)
            );
        }

        if (filters.status !== "all") {
            result = result.filter(p => p.status === filters.status);
        }

        if (filters.paymentType !== "all") {
            result = result.filter(p => p.paymentType === filters.paymentType);
        }

        // Sorting
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
        return <div className="admin-fee-dashboard"><div className="loading-spinner">⏳ Loading payment records...</div></div>;
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

            {/* Error Message */}
            {error && <div className="error-message">⚠️ {error}</div>}

            {/* Statistics Cards - remains same */}
            {stats && (
                <div className="stats-grid">
                    {/* ... your existing stats cards ... */}
                </div>
            )}

            {/* Filters Section - remains same */}
            <div className="filters-section">
                {/* ... your existing filters ... */}
            </div>

            {/* Table */}
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
                                        <small>Try changing filters or check if payments exist in database</small>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredPayments.map((payment) => (
                                <tr key={payment._id || payment.transactionId}>
                                    <td><strong>{payment.transactionId}</strong></td>
                                    <td>
                                        <strong>{payment.studentName}</strong><br />
                                        <small>🆔 {payment.studentId}</small><br />
                                        <small>📧 {payment.email}</small>
                                    </td>
                                    <td><span className="class-badge">{payment.applyClass}</span></td>
                                    <td>
                                        <div className="fee-breakdown">
                                            <div>Total: ₹{Number(payment.totalFees || 0).toLocaleString("en-IN")}</div>
                                            <div className="paid">Paid: ₹{Number(payment.paidAmount || 0).toLocaleString("en-IN")}</div>
                                            <div className="pending">Pending: ₹{Number(payment.pendingAmount || 0).toLocaleString("en-IN")}</div>
                                        </div>
                                    </td>
                                    <td><span className="payment-method">{payment.paymentType || payment.paymentMethod}</span></td>
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
