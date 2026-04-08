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
                        <button onClick={() => navigate('/AfterLogin/Students')} className="back-btn">
                            ← Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    return (
        <div className="info-page">
            <div className="info-container">

                {/* Header */}
                <div className="info-header">
                    <button onClick={() => navigate(-1)} className="back-button">
                        ← Back
                    </button>
                    <h1>Fee Details</h1>
                </div>

                {/* Student Information */}
                <div className="info-card">
                    <div className="card-header green-header">
                        <span className="header-icon">👨‍🎓</span>
                        <h2>Student Information</h2>
                        <p>Personal & Academic Details</p>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">STUDENT NAME</span>
                            <span className="value">{studentInfo.studentName}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">STUDENT ID</span>
                            <span className="value">{studentInfo.studentId}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">CLASS</span>
                            <span className="value">{studentInfo.applyClass}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">MEDIUM</span>
                            <span className="value">{studentInfo.language || 'English'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">EMAIL</span>
                            <span className="value">{studentInfo.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">PARENT NAME</span>
                            <span className="value">{studentInfo.parentName || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">PARENT PHONE</span>
                            <span className="value">{studentInfo.parentPhone}</span>
                        </div>
                    </div>
                </div>

                {/* Fee Summary */}
                <div className="info-card">
                    <div className="card-header green-header">
                        <span className="header-icon">💰</span>
                        <h2>Fee Summary</h2>
                        <p>Payment Status & Balance</p>
                    </div>
                    <div className="fee-summary">
                        <div className="fee-row">
                            <span>Total Fees</span>
                            <strong>{formatCurrency(feeDetails.totalFees)}</strong>
                        </div>
                        <div className="fee-row">
                            <span>Amount Paid</span>
                            <strong>{formatCurrency(feeDetails.totalPaid)}</strong>
                        </div>
                        <div className="fee-row">
                            <span>Pending Amount</span>
                            <strong className="pending">{formatCurrency(feeDetails.pendingAmount)}</strong>
                        </div>
                        <div className="fee-row status-row">
                            <span>Payment Status</span>
                            <span className={`status-badge ${feeDetails.status.toLowerCase()}`}>
                                {feeDetails.status}
                            </span>
                        </div>
                    </div>

                    {feeDetails.pendingAmount > 0 && (
                        <button 
                            onClick={() => navigate('/AfterLogin/Fees', { state: { ...studentInfo, feeDetails } })}
                            className="pay-now-btn"
                        >
                            💳 Make a Payment
                        </button>
                    )}
                </div>

                {/* Payment History */}
                {paymentHistory && paymentHistory.length > 0 && (
                    <div className="info-card">
                        <div className="card-header green-header">
                            <span className="header-icon">📋</span>
                            <h2>Payment History</h2>
                            <p>{paymentHistory.length} Transactions</p>
                        </div>
                        <div className="history-table">
                            <div className="table-header">
                                <div>Date</div>
                                <div>Transaction ID</div>
                                <div>Amount</div>
                                <div>Type</div>
                                <div>Status</div>
                            </div>
                            {paymentHistory.map((payment, index) => (
                                <div key={index} className="table-row">
                                    <div>{formatDate(payment.paidAt)}</div>
                                    <div className="txn-id">{payment.transactionId}</div>
                                    <div className="amount">{formatCurrency(payment.paidAmount)}</div>
                                    <div>{payment.paymentType}</div>
                                    <div className={`status ${payment.status.toLowerCase()}`}>
                                        {payment.status}
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
