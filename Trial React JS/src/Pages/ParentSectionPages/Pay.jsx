import React, { useState } from 'react';
import { ArrowLeft, DollarSign, CreditCard, Calendar, CheckCircle, AlertCircle, Download, Receipt, TrendingUp, Clock, FileText, Bell } from 'lucide-react';
import './Pay.css';

const Pay = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedYear, setSelectedYear] = useState('2024-25');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const feesData = {
        student1: {
            '2024-25': {
                totalFees: 85000,
                paidAmount: 55000,
                pendingAmount: 30000,
                dueDate: '2024-12-15',
                installments: [
                    {
                        id: 1,
                        term: 'First Term',
                        amount: 28000,
                        dueDate: '2024-06-30',
                        paidDate: '2024-06-28',
                        status: 'paid',
                        paymentMethod: 'Online',
                        transactionId: 'TXN123456789',
                        receiptNo: 'REC/2024/001'
                    },
                    {
                        id: 2,
                        term: 'Second Term',
                        amount: 27000,
                        dueDate: '2024-09-30',
                        paidDate: '2024-09-29',
                        status: 'paid',
                        paymentMethod: 'Cheque',
                        transactionId: 'CHQ987654321',
                        receiptNo: 'REC/2024/045'
                    },
                    {
                        id: 3,
                        term: 'Third Term',
                        amount: 30000,
                        dueDate: '2024-12-15',
                        paidDate: null,
                        status: 'pending',
                        paymentMethod: null,
                        transactionId: null,
                        receiptNo: null
                    }
                ],
                breakdown: {
                    tuitionFees: 60000,
                    examFees: 5000,
                    libraryFees: 3000,
                    sportsFees: 4000,
                    labFees: 6000,
                    transportFees: 7000
                },
                paymentHistory: [
                    {
                        date: '2024-06-28',
                        amount: 28000,
                        method: 'Online Payment',
                        status: 'Success',
                        receiptNo: 'REC/2024/001'
                    },
                    {
                        date: '2024-09-29',
                        amount: 27000,
                        method: 'Cheque Payment',
                        status: 'Success',
                        receiptNo: 'REC/2024/045'
                    }
                ]
            }
        }
    };

    const currentData = feesData[selectedStudent][selectedYear];
    const paidPercentage = (currentData.paidAmount / currentData.totalFees) * 100;

    const getStatusColor = (status) => {
        const colors = {
            'paid': '#27ae60',
            'pending': '#f39c12',
            'overdue': '#e74c3c'
        };
        return colors[status] || '#95a5a6';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid': return <CheckCircle size={20} />;
            case 'pending': return <Clock size={20} />;
            case 'overdue': return <AlertCircle size={20} />;
            default: return <AlertCircle size={20} />;
        }
    };

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getDaysRemaining = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="fees-page">
            {/* Header */}
            <div className="fees-header">
                <div className="fees-header-circle-1"></div>
                <div className="fees-header-circle-2"></div>

                <div className="fees-container">
                    <button className="fees-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="fees-header-content">
                        <div className="fees-header-emoji">💳</div>
                        <h1 className="fees-header-title">Fee Management</h1>
                        <p className="fees-header-subtitle">
                            View Fee Statements • History • Pending Dues • Make Payments
                        </p>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="fees-main-content">

                {/* Select Section */}
                <div className="fees-selectors-grid">
                    <div className="fees-selector-card">
                        <label>Select Student:</label>
                        <select
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            className="fees-select"
                        >
                            {students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.name} - Grade {student.grade}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="fees-selector-card">
                        <label>Academic Year:</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="fees-select"
                        >
                            <option value="2024-25">2024-2025</option>
                            <option value="2023-24">2023-2024</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="fees-stats-grid">
                    <div className="fees-stat-card">
                        <div className="fees-stat-icon" style={{ color: '#27ae60' }}>
                            <DollarSign size={40} />
                        </div>
                        <div className="fees-stat-number">{formatCurrency(currentData.totalFees)}</div>
                        <p className="fees-stat-label">Total Fees</p>
                    </div>

                    <div className="fees-stat-card">
                        <div className="fees-stat-icon" style={{ color: '#2ecc71' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div className="fees-stat-number">{formatCurrency(currentData.paidAmount)}</div>
                        <p className="fees-stat-label">Paid Amount</p>
                    </div>

                    <div className="fees-stat-card">
                        <div className="fees-stat-icon" style={{ color: '#f39c12' }}>
                            <AlertCircle size={40} />
                        </div>
                        <div className="fees-stat-number">{formatCurrency(currentData.pendingAmount)}</div>
                        <p className="fees-stat-label">Pending Amount</p>
                    </div>

                    <div className="fees-stat-card">
                        <div className="fees-stat-icon" style={{ color: '#1b5e20' }}>
                            <TrendingUp size={40} />
                        </div>
                        <div className="fees-stat-number">{paidPercentage.toFixed(1)}%</div>
                        <p className="fees-stat-label">Progress</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="fees-progress-section">
                    <div className="fees-progress-header">
                        <h3>Payment Progress</h3>
                        <span className="fees-progress-value">
                            {formatCurrency(currentData.paidAmount)} / {formatCurrency(currentData.totalFees)}
                        </span>
                    </div>

                    <div className="fees-progress-bar">
                        <div
                            className="fees-progress-fill"
                            style={{ width: `${paidPercentage}%` }}
                        ></div>
                    </div>

                    <div className="fees-progress-info">
                        <span>{paidPercentage.toFixed(1)}% Completed</span>
                        <span>{formatCurrency(currentData.pendingAmount)} Remaining</span>
                    </div>
                </div>

                {/* Due Alert */}

                {currentData.pendingAmount > 0 && (
                    <div className="fees-alert-card">
                        <Bell size={24} color="#f39c12" />
                        <div>
                            <h4>Payment Due Alert</h4>
                            <p>
                                Next payment of {formatCurrency(currentData.pendingAmount)} is due on{" "}
                                {formatDate(currentData.dueDate)}
                                {getDaysRemaining(currentData.dueDate) > 0
                                    ? ` (${getDaysRemaining(currentData.dueDate)} days remaining)`
                                    : " (Overdue)"}
                            </p>
                        </div>
                    </div>
                )}

                {/* Installments */}
                <div className="fees-installments-section">
                    <h2 className="section-title">
                        <Calendar size={28} />
                        Fee Installments
                    </h2>

                    <div className="installments-grid">
                        {currentData.installments.map((installment) => (
                            <div key={installment.id} className="installment-card">

                                <div className="installment-header">
                                    <h3>{installment.term}</h3>

                                    <span
                                        className="installment-status"
                                        style={{ background: getStatusColor(installment.status) }}
                                    >
                                        {getStatusIcon(installment.status)}
                                        {installment.status.charAt(0).toUpperCase() + installment.status.slice(1)}
                                    </span>
                                </div>

                                <div className="installment-amount">
                                    <DollarSign size={32} color="#27ae60" />
                                    <span>{formatCurrency(installment.amount)}</span>
                                </div>

                                <div className="installment-details">

                                    <div className="detail-item">
                                        <Calendar size={16} />
                                        <div>
                                            <p className="detail-label">Due Date</p>
                                            <p className="detail-value">{formatDate(installment.dueDate)}</p>
                                        </div>
                                    </div>

                                    {installment.paidDate && (
                                        <>
                                            <div className="detail-item">
                                                <CheckCircle size={16} />
                                                <div>
                                                    <p className="detail-label">Paid On</p>
                                                    <p className="detail-value">{formatDate(installment.paidDate)}</p>
                                                </div>
                                            </div>

                                            <div className="detail-item">
                                                <CreditCard size={16} />
                                                <div>
                                                    <p className="detail-label">Method</p>
                                                    <p className="detail-value">{installment.paymentMethod}</p>
                                                </div>
                                            </div>

                                            <div className="detail-item">
                                                <Receipt size={16} />
                                                <div>
                                                    <p className="detail-label">Receipt</p>
                                                    <p className="detail-value">{installment.receiptNo}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {installment.status === "paid" ? (
                                    <button className="installment-button download">
                                        <Download size={18} /> Download Receipt
                                    </button>
                                ) : (
                                    <button className="installment-button pay">
                                        <CreditCard size={18} /> Pay Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Breakdown */}
                <div className="fees-breakdown-section">
                    <h2 className="section-title">
                        <FileText size={28} />
                        Fee Structure Breakdown
                    </h2>

                    <div className="breakdown-grid">
                        {Object.entries(currentData.breakdown).map(([key, value]) => (
                            <div key={key} className="breakdown-item">
                                <div className="breakdown-label">
                                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                </div>
                                <div className="breakdown-bar">
                                    <div
                                        className="breakdown-fill"
                                        style={{
                                            width: `${(value / currentData.totalFees) * 100}%`,
                                            background: "#27ae60",
                                        }}
                                    ></div>
                                </div>
                                <div className="breakdown-value">{formatCurrency(value)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* History */}
                <div className="fees-history-section">
                    <h2 className="section-title">
                        <Receipt size={28} />
                        Payment History
                    </h2>

                    <div className="history-table-wrapper">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Receipt</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentData.paymentHistory.map((payment, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(payment.date)}</td>
                                        <td className="amount-cell">{formatCurrency(payment.amount)}</td>
                                        <td>{payment.method}</td>
                                        <td>{payment.receiptNo}</td>
                                        <td>
                                            <span className="status-badge success">{payment.status}</span>
                                        </td>
                                        <td>
                                            <button className="action-button">
                                                <Download size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="fees-payment-options">
                    <h2 className="section-title">Quick Payment Options</h2>

                    <div className="payment-options-grid">
                        <div className="payment-option-card">
                            <CreditCard size={40} color="#27ae60" />
                            <h4>Credit/Debit Card</h4>
                            <p>Pay securely using your card</p>
                        </div>

                        <div className="payment-option-card">
                            <DollarSign size={40} color="#2ecc71" />
                            <h4>Net Banking</h4>
                            <p>Transfer from your bank</p>
                        </div>

                        <div className="payment-option-card">
                            <Receipt size={40} color="#1b5e20" />
                            <h4>UPI Payment</h4>
                            <p>Pay via UPI apps</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="fees-cta-section">
                    <div className="fees-cta-decorative"></div>
                    <h2>Need Payment Assistance?</h2>
                    <p>Contact accounts department for any payment help</p>

                    <div className="fees-cta-buttons">
                        <button className="fees-cta-button-primary">
                            <CreditCard size={18} /> Make Payment
                        </button>

                        <button className="fees-cta-button-secondary">
                            <Download size={18} /> Download Statement
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Pay;
