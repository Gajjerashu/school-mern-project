import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Info.css';

const Info = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { studentInfo, feeDetails, paymentHistory } = location.state || {};

    if (!studentInfo || !feeDetails) {
        return (
            <div className="info-page">
                <div className="info-container">
                    <div className="error-card">
                        <h2>⚠️ No Data Found</h2>
                        <p>Please search for a student first.</p>
                        <button onClick={() => navigate('/AfterLogin/Fees')} className="back-btn">
                            Go Back
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
        }).format(amount);
    };

    // --- NAVIGATE TO RECEIPT ---
    const handleViewReceipt = (txnId) => {
        navigate(`/AfterLogin/PayReceive/${txnId}`);
    };

    return (
        <div className="info-page">
            <div className="info-container">
                {/* Header with Print Option */}
                <div className="info-header">
                    <div className="header-left">
                        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
                        <h1>Fee Dashboard</h1>
                    </div>
                    <button onClick={() => window.print()} className="print-btn">🖨️ Print Report</button>
                </div>

                {/* Student Info Card */}
                <div className="info-card">
                    <div className="card-header">
                        <div className="student-icon">👨‍🎓</div>
                        <div>
                            <h2>{studentInfo.studentName}</h2>
                            <p>ID: {studentInfo.studentId} | Class: {studentInfo.applyClass}</p>
                        </div>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Medium</span>
                            <span className="info-value">{studentInfo.language}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Parent Phone</span>
                            <span className="info-value">{studentInfo.parentPhone}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">{studentInfo.email}</span>
                        </div>
                    </div>
                </div>

                {/* Fee Summary Card */}
                <div className="info-card">
                    <div className="card-header">
                        <div className="fee-icon">💰</div>
                        <div>
                            <h2>Financial Summary</h2>
                            <p>Current balance and status</p>
                        </div>
                    </div>
                    <div className="fee-summary">
                        <div className="fee-row">
                            <span>Total Fees</span>
                            <span className="fee-value total">{formatCurrency(feeDetails.totalFees)}</span>
                        </div>
                        <div className="fee-row">
                            <span>Paid</span>
                            <span className="fee-value paid">{formatCurrency(feeDetails.totalPaid)}</span>
                        </div>
                        <div className="fee-row highlight">
                            <span>Pending</span>
                            <span className="fee-value pending">{formatCurrency(feeDetails.pendingAmount)}</span>
                        </div>
                    </div>

                    {/* Show button ONLY if balance is pending */}
                    {feeDetails.pendingAmount > 0 ? (
                        <div className="payment-action">
                            <button
                                onClick={() => navigate('/AfterLogin/Fees', { state: { ...studentInfo, feeDetails } })}
                                className="pay-now-btn"
                            >
                                💳 Pay Outstanding Balance
                            </button>
                        </div>
                    ) : (
                        <div className="status-complete">
                            ✅ All fees are cleared!
                        </div>
                    )}
                </div>

                {/* Payment History Card */}
                {paymentHistory && paymentHistory.length > 0 && (
                    <div className="info-card">
                        <div className="card-header">
                            <div className="history-icon">📋</div>
                            <h2>Transaction History</h2>
                        </div>
                        <div className="history-table">
                            <div className="table-header">
                                <div>Date</div>
                                <div>Amount</div>
                                <div>ID</div>
                                <div>Receipt</div>
                            </div>
                            {paymentHistory.map((payment, index) => (
                                <div key={index} className="table-row">
                                    <div data-label="Date">{formatDate(payment.paidAt)}</div>
                                    <div className="amount-cell" data-label="Amount">
                                        {formatCurrency(payment.paidAmount)}
                                    </div>
                                    <div className="txn-id-small" data-label="ID">{payment.transactionId}</div>
                                    <div data-label="Receipt">
                                        <button 
                                            className="view-link"
                                            onClick={() => handleViewReceipt(payment.transactionId)}
                                        >
                                            View 📄
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Info;
