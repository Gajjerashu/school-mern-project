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
        }).format(amount);
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

                {/* Student Info Card */}
                <div className="info-card">
                    <div className="card-header">
                        <div className="student-icon">👨‍🎓</div>
                        <div>
                            <h2>Student Information</h2>
                            <p>Personal & Academic Details</p>
                        </div>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Student Name</span>
                            <span className="info-value">{studentInfo.studentName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Student ID</span>
                            <span className="info-value">{studentInfo.studentId}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Class</span>
                            <span className="info-value">{studentInfo.applyClass}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Medium</span>
                            <span className="info-value">{studentInfo.language}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">{studentInfo.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Parent Name</span>
                            <span className="info-value">{studentInfo.parentName || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Parent Phone</span>
                            <span className="info-value">{studentInfo.parentPhone}</span>
                        </div>
                    </div>
                </div>

                {/* Fee Summary Card */}
                <div className="info-card">
                    <div className="card-header">
                        <div className="fee-icon">💰</div>
                        <div>
                            <h2>Fee Summary</h2>
                            <p>Payment Status & Balance</p>
                        </div>
                    </div>
                    <div className="fee-summary">
                        <div className="fee-row">
                            <span className="fee-label">Total Fees</span>
                            <span className="fee-value total">{formatCurrency(feeDetails.totalFees)}</span>
                        </div>
                        <div className="fee-row">
                            <span className="fee-label">Amount Paid</span>
                            <span className="fee-value paid">{formatCurrency(feeDetails.totalPaid)}</span>
                        </div>
                        <div className="fee-row">
                            <span className="fee-label">Pending Amount</span>
                            <span className="fee-value pending">{formatCurrency(feeDetails.pendingAmount)}</span>
                        </div>
                        <div className="fee-row status-row">
                            <span className="fee-label">Payment Status</span>
                            <span className={`status-badge ${feeDetails.status.toLowerCase()}`}>
                                {feeDetails.status}
                            </span>
                        </div>
                    </div>

                    {/* Make Payment Button */}
                    <div className="payment-action">
                        <button
                            onClick={() => navigate('/AfterLogin/Fees', {
                                state: {
                                    studentId: studentInfo.studentId,
                                    studentName: studentInfo.studentName,
                                    email: studentInfo.email,
                                    parentPhone: studentInfo.parentPhone,
                                    applyClass: studentInfo.applyClass,
                                    parentName: studentInfo.parentName,
                                    language: studentInfo.language,
                                    feeDetails: feeDetails  // ✅ Pass fee details
                                }
                            })}
                            className="pay-now-btn"
                        >
                            💳 Make Payment
                        </button>
                    </div>
                </div>

                {/* Payment History Card */}
                {paymentHistory && paymentHistory.length > 0 && (
                    <div className="info-card">
                        <div className="card-header">
                            <div className="history-icon">📋</div>
                            <div>
                                <h2>Payment History</h2>
                                <p>{paymentHistory.length} Transaction{paymentHistory.length > 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <div className="history-table">
                            <div className="table-header">
                                <div>Transaction ID</div>
                                <div>Date</div>
                                <div>Amount</div>
                                <div>Type</div>
                                <div>Status</div>
                            </div>
                            {paymentHistory.map((payment, index) => (
                                <div key={index} className="table-row">
                                    <div className="txn-id" data-label="Transaction ID">{payment.transactionId}</div>
                                    <div data-label="Date">{formatDate(payment.paidAt)}</div>
                                    <div className="amount-cell" data-label="Amount">{formatCurrency(payment.paidAmount)}</div>
                                    <div data-label="Type">{payment.paymentType}</div>
                                    <div data-label="Status">
                                        <span className={`mini-badge ${payment.status.toLowerCase()}`}>
                                            {payment.status}
                                        </span>
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