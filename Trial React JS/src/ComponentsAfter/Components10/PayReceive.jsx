import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PayReceive.css";

const PayReceive = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiptRef = useRef();

    const [paymentData, setPaymentData] = useState(location.state || {});

    useEffect(() => {
        const fetchReceipt = async () => {
            const txnId = location.state?.transactionId;
            if (txnId) {
                try {
                    const res = await fetch(`http://localhost:5000/api/payments/receipt/${txnId}`);
                    const data = await res.json();
                    if (data?.success) {
                        setPaymentData(data.payment || {});
                    }
                } catch (error) {
                    console.error("Error fetching receipt:", error);
                }
            }
        };
        fetchReceipt();
    }, [location.state]);

    const totalFees = Number(paymentData?.totalFees || 0);
    const paidAmount = Number(paymentData?.paidAmount || 0);
    const pendingAmount = Number(paymentData?.pendingAmount || 0);

    if (!paymentData?.transactionId) {
        return (
            <div className="receipt-page">
                <div className="receipt-error">
                    <div className="school-logo-error">
                        <svg width="80" height="80" viewBox="0 0 32 32" fill="#16a34a">
                            <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                            <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                        </svg>
                    </div>
                    <h2>InspireEdge School</h2>
                    <div className="error-icon">💳</div>
                    <h3>No Receipt Found</h3>
                    <p className="error-message">Dear Student,</p>
                    <p className="error-sub">Please pay your fees on time to avoid any inconvenience. Timely payment helps us maintain quality education and facilities.</p>
                    <div className="error-actions">
                        <button onClick={() => navigate("/AfterLogin/Fees")} className="pay-fees-btn">
                            💰 Pay Fees Now
                        </button>
                        <button onClick={() => navigate("/AfterLogin/Home1")} className="home-btn">
                            🏠 Go to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleDownloadPDF = () => {
        window.print();
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const getPaymentIcon = (type) => {
        const icons = {
            GPay: "🟢", PhonePe: "🟣", Paytm: "🔵", UPI: "💠",
            "Net Banking": "🏦", "Debit Card": "💳", "Credit Card": "💳",
            Cash: "💵", Cheque: "📝"
        };
        return icons[type] || "💰";
    };

    return (
        <div className="receipt-page">
            <div className="watermark no-print">PAID</div>

            <div className="receipt-container" ref={receiptRef}>
                {/* Success Badge */}
                <div className="success-badge-top">
                    <div className="success-check-big">✓</div>
                    <h1>Payment Successful</h1>
                    <p>Your payment has been processed securely</p>
                </div>

                {/* School Header */}
                <div className="school-header-receipt">
                    <div className="school-logo-receipt">🎓</div>
                    <div>
                        <h2>InspireEdge School</h2>
                        <p>Excellence in Education Since 2010</p>
                        <p className="school-address">Near Railway Station, Vadodara, Gujarat - 390001</p>
                        <p>📞 +91 1234567890 | 📧 info@inspireedge.edu | 🌐 www.inspireedge.edu</p>
                    </div>
                </div>

                <div className="receipt-divider"></div>

                {/* Receipt Header */}
                <div className="receipt-header-section">
                    <div>
                        <h3>FEE PAYMENT RECEIPT</h3>
                        <p>Academic Year: 2024-2025</p>
                    </div>
                    <div className="receipt-number">
                        <p>Receipt No.</p>
                        <strong>#{paymentData.transactionId}</strong>
                    </div>
                </div>

                {/* Student Details */}
                <div className="info-section">
                    <h4>📋 Student Information</h4>
                    <div className="info-grid-receipt">
                        <div className="info-item">
                            <span className="info-label">Student ID:</span>
                            <strong>{paymentData.studentId || "N/A"}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Student Name:</span>
                            <strong>{paymentData.studentName}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Class/Standard:</span>
                            <strong>{paymentData.applyClass}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Medium:</span>
                            <strong>{paymentData.language || 'N/A'}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Parent/Guardian:</span>
                            <strong>{paymentData.parentName || "N/A"}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Contact Number:</span>
                            <strong>{paymentData.parentPhone}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email Address:</span>
                            <strong>{paymentData.email}</strong>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="info-section">
                    <h4>💳 Payment Information</h4>
                    <div className="info-grid-receipt">
                        <div className="info-item">
                            <span className="info-label">Transaction ID:</span>
                            <strong>{paymentData.transactionId}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Payment Date:</span>
                            <strong>{formatDate(paymentData.paidAt)}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Payment Method:</span>
                            <strong>{getPaymentIcon(paymentData.paymentType)} {paymentData.paymentType}</strong>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Status:</span>
                            <strong className="status-paid">✓ PAID</strong>
                        </div>
                    </div>
                </div>

                {/* Fee Breakdown */}
                <div className="fee-breakdown-section">
                    <h4>💰 Fee Breakdown</h4>
                    <table className="fee-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th className="text-right">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Annual Fees</td>
                                <td className="text-right">₹{totalFees.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr className="highlight-row">
                                <td><strong>Amount Paid (This Transaction)</strong></td>
                                <td className="text-right"><strong>₹{paidAmount.toLocaleString("en-IN")}</strong></td>
                            </tr>
                            <tr className="pending-row">
                                <td><strong>Pending Balance</strong></td>
                                <td className="text-right"><strong>₹{pendingAmount.toLocaleString("en-IN")}</strong></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="amount-words">
                        <p><strong>Amount Paid in Words:</strong></p>
                        <p className="words-text">{numberToWords(paidAmount)} Rupees Only</p>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="terms-section">
                    <h4>📜 Terms & Conditions</h4>
                    <ul>
                        <li>This is a computer-generated receipt and does not require a signature.</li>
                        <li>Fees once paid are non-refundable.</li>
                        <li>Please keep this receipt for future reference.</li>
                        <li>For any queries, contact the accounts department.</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="receipt-footer-section">
                    <div className="footer-left">
                        <p><strong>Authorized Signature</strong></p>
                        <div className="signature-line"></div>
                        <p>Accounts Department</p>
                    </div>
                    <div className="footer-right">
                        <div className="school-seal">
                            <div className="seal-circle">
                                <p>SCHOOL</p>
                                <p>SEAL</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="receipt-bottom-note">
                    <p>📧 For queries: accounts@inspireedge.edu | 📞 +91 1234567890</p>
                    <p>Thank you for your payment!</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons no-print">
                <button onClick={handleDownloadPDF} className="action-btn download">
                    <span>📥</span> Download PDF
                </button>
                <button onClick={handleDownloadPDF} className="action-btn print">
                    <span>🖨️</span> Print Receipt
                </button>
                <button onClick={() => navigate("/AfterLogin/Fees")} className="action-btn another">
                    <span>💳</span> Make Another Payment
                </button>
            </div>
        </div>
    );
};

// Number to Words Conversion
const numberToWords = (num) => {
    if (!num || num === 0) return "Zero";

    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
    if (num < 1000) return a[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numberToWords(num % 100) : "");
    if (num < 100000) return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numberToWords(num % 1000) : "");
    if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numberToWords(num % 100000) : "");
    return numberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numberToWords(num % 10000000) : "");
};

export default PayReceive;