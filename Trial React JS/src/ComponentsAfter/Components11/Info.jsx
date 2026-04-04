import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaUserGraduate, FaMoneyBillWave, FaHistory, FaFileInvoice } from 'react-icons/fa';
import './Info.css';

const Info = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructuring with safety check
    const { studentInfo, feeDetails, paymentHistory } = location.state || {};

    // Redirect if no data is found (Security check)
    if (!studentInfo || !feeDetails) {
        return (
            <div className="info-page">
                <div className="info-container">
                    <div className="error-card">
                        <h2>⚠️ Data Not Accessible</h2>
                        <p>Student session has expired or no data was provided.</p>
                        <button onClick={() => navigate('/AfterLogin/Check')} className="primary-btn">
                            Go Back to Search
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const handleViewReceipt = (txnId) => {
        navigate(`/AfterLogin/PayReceive/${txnId}`);
    };

    return (
        <div className="info-page">
            <div className="info-container">
                {/* Dashboard Header */}
                <div className="info-header no-print">
                    <div className="header-nav">
                        <button onClick={() => navigate(-1)} className="back-nav-btn">
                            <FaArrowLeft /> Back
                        </button>
                        <h1>Student Fee Dashboard</h1>
                    </div>
                    <button onClick={() => window.print()} className="print-action-btn">
                        <FaPrint /> Print Report
                    </button>
                </div>

                {/* Print Only Header (Visible only when printing) */}
                <div className="only-print school-print-header">
                    <h2>InspireEdge School - Fee Statement</h2>
                    <p>Generated on: {new Date().toLocaleString()}</p>
                    <hr />
                </div>

                {/* 1. Student Identity Section */}
                <div className="info-section-card profile-card">
                    <div className="section-title">
                        <FaUserGraduate className="icon" />
                        <h3>Student Profile</h3>
                    </div>
                    <div className="profile-details-grid">
                        <div className="detail-item">
                            <span className="label">Full Name</span>
                            <span className="value high-light">{studentInfo.studentName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Student ID</span>
                            <span className="value">#{studentInfo.studentId}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Class & Medium</span>
                            <span className="value">{studentInfo.applyClass} ({studentInfo.language})</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Contact</span>
                            <span className="value">{studentInfo.parentPhone}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Financial Overview */}
                <div className="info-section-card financial-card">
                    <div className="section-title">
                        <FaMoneyBillWave className="icon" />
                        <h3>Financial Summary</h3>
                    </div>
                    <div className="finance-summary-boxes">
                        <div className="finance-box">
                            <span className="label">Total Course Fee</span>
                            <span className="value">{formatCurrency(feeDetails.totalFees)}</span>
                        </div>
                        <div className="finance-box paid">
                            <span className="label">Total Amount Paid</span>
                            <span className="value">{formatCurrency(feeDetails.totalPaid)}</span>
                        </div>
                        <div className={`finance-box pending ${feeDetails.pendingAmount > 0 ? 'alert' : 'clear'}`}>
                            <span className="label">Balance Due</span>
                            <span className="value">{formatCurrency(feeDetails.pendingAmount)}</span>
                        </div>
                    </div>

                    {feeDetails.pendingAmount > 0 ? (
                        <div className="payment-alert-action no-print">
                            <p>Payment is currently outstanding for this student.</p>
                            <button
                                onClick={() => navigate('/AfterLogin/Fees', { state: { ...studentInfo, feeDetails } })}
                                className="pay-now-btn"
                            >
                                💳 Make a Payment
                            </button>
                        </div>
                    ) : (
                        <div className="success-badge">✅ No Dues Pending</div>
                    )}
                </div>

                {/* 3. Transaction History */}
                <div className="info-section-card history-card">
                    <div className="section-title">
                        <FaHistory className="icon" />
                        <h3>Recent Transactions</h3>
                    </div>
                    {paymentHistory?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="styled-history-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Transaction ID</th>
                                        <th>Amount</th>
                                        <th className="no-print">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.map((payment, index) => (
                                        <tr key={payment.transactionId || index}>
                                            <td>{formatDate(payment.paidAt)}</td>
                                            <td className="txn-id-text">{payment.transactionId}</td>
                                            <td className="amount-text">{formatCurrency(payment.paidAmount)}</td>
                                            <td className="no-print">
                                                <button 
                                                    className="btn-view-receipt"
                                                    onClick={() => handleViewReceipt(payment.transactionId)}
                                                >
                                                    <FaFileInvoice /> Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="no-data-text">No payment history found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Info;
