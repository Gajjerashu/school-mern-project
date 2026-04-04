import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PayReceive.css";

const PayReceive = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiptRef = useRef();

    const [paymentData, setPaymentData] = useState(location.state || {});
    const [loading, setLoading] = useState(!location.state?.transactionId);

    useEffect(() => {
        const txnId = location.state?.transactionId;
        
        const fetchReceipt = async () => {
            if (txnId) {
                try {
                    const res = await fetch(`http://localhost:5000/api/payments/receipt/${txnId}`);
                    const data = await res.json();
                    if (data?.success) {
                        setPaymentData(data.payment || {});
                    }
                } catch (error) {
                    console.error("Error fetching receipt:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchReceipt();
    }, [location.state?.transactionId]); // Only trigger if txnId changes

    const totalFees = Number(paymentData?.totalFees || 0);
    const paidAmount = Number(paymentData?.paidAmount || 0);
    const pendingAmount = Number(paymentData?.pendingAmount || 0);

    const handleDownloadPDF = () => {
        window.print();
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleString("en-IN", {
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

    if (loading) {
        return <div className="receipt-page"><div className="loader">Loading Receipt...</div></div>;
    }

    if (!paymentData?.transactionId) {
        return (
            <div className="receipt-page">
                <div className="receipt-error">
                    <div className="school-logo-error">
                        <svg width="80" height="80" viewBox="0 0 32 32" fill="#ef4444">
                            <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2z" opacity=".2"/>
                            <path d="M12 14l8 8M20 14l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <h2>InspireEdge School</h2>
                    <h3>No Receipt Found</h3>
                    <p className="error-message">We couldn't find any transaction details.</p>
                    <div className="error-actions">
                        <button onClick={() => navigate("/AfterLogin/Fees")} className="pay-fees-btn">💰 Pay Fees Now</button>
                        <button onClick={() => navigate("/AfterLogin/Home1")} className="home-btn">🏠 Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="receipt-page">
            <div className="watermark no-print">PAID</div>

            <div className="receipt-container" ref={receiptRef}>
                {/* Success Badge */}
                <div className="success-badge-top">
                    <div className="success-check-big">✓</div>
                    <h1>Payment Successful</h1>
                    <p>Receipt generated on {new Date().toLocaleDateString("en-IN")}</p>
                </div>

                {/* School Header */}
                <div className="school-header-receipt">
                    <div className="school-logo-receipt">🎓</div>
                    <div>
                        <h2>InspireEdge School</h2>
                        <p className="school-tagline">Excellence in Education Since 2010</p>
                        <p className="school-address">Near Railway Station, Vadodara, Gujarat - 390001</p>
                        <p className="school-contact">📞 +91 1234567890 | 📧 info@inspireedge.edu</p>
                    </div>
                </div>

                <div className="receipt-divider"></div>

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

                {/* Student Info */}
                <div className="info-section">
                    <h4>📋 Student Information</h4>
                    <div className="info-grid-receipt">
                        <div className="info-item"><span className="info-label">Student ID:</span> <strong>{paymentData.studentId}</strong></div>
                        <div className="info-item"><span className="info-label">Name:</span> <strong>{paymentData.studentName}</strong></div>
                        <div className="info-item"><span className="info-label">Class:</span> <strong>{paymentData.applyClass}</strong></div>
                        <div className="info-item"><span className="info-label">Medium:</span> <strong>{paymentData.language}</strong></div>
                        <div className="info-item"><span className="info-label">Parent:</span> <strong>{paymentData.parentName || "N/A"}</strong></div>
                        <div className="info-item"><span className="info-label">Phone:</span> <strong>{paymentData.parentPhone}</strong></div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="info-section">
                    <h4>💳 Payment Details</h4>
                    <div className="info-grid-receipt">
                        <div className="info-item"><span className="info-label">Method:</span> <strong>{getPaymentIcon(paymentData.paymentType)} {paymentData.paymentType}</strong></div>
                        <div className="info-item"><span className="info-label">Date:</span> <strong>{formatDate(paymentData.paidAt)}</strong></div>
                        <div className="info-item"><span className="info-label">Status:</span> <strong className="status-paid">✓ SUCCESSFUL</strong></div>
                    </div>
                </div>

                {/* Table */}
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
                                <td>Total Annual Course Fees</td>
                                <td className="text-right">₹{totalFees.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr className="highlight-row">
                                <td><strong>Amount Paid in this Transaction</strong></td>
                                <td className="text-right"><strong>₹{paidAmount.toLocaleString("en-IN")}</strong></td>
                            </tr>
                            <tr className="pending-row">
                                <td>Remaining Balance</td>
                                <td className="text-right">₹{pendingAmount.toLocaleString("en-IN")}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="amount-words">
                        <p><strong>Amount in Words:</strong> {numberToWords(paidAmount)} Rupees Only</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="receipt-footer-section">
                    <div className="footer-left">
                        <div className="signature-box">
                            <div className="signature-line"></div>
                            <p>Authorized Signatory</p>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="school-seal-wrapper">
                            <div className="seal-circle">OFFICIAL SEAL</div>
                        </div>
                    </div>
                </div>

                <div className="receipt-bottom-note">
                    <p>This is a computer generated receipt, no physical signature required.</p>
                    <p>Thank you for choosing InspireEdge School!</p>
                </div>
            </div>

            {/* Actions */}
            <div className="action-buttons no-print">
                <button onClick={handleDownloadPDF} className="action-btn download"><span>📥</span> Print / Save PDF</button>
                <button onClick={() => navigate("/AfterLogin/Fees")} className="action-btn another"><span>💳</span> New Payment</button>
                <button onClick={() => navigate("/AfterLogin/Home1")} className="action-btn home">🏠 Back to Dashboard</button>
            </div>
        </div>
    );
};

// Robust Number to Words Function
const numberToWords = (num) => {
    if (num === 0) return "Zero";
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const convert = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + convert(n % 100) : "");
        if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
        if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + convert(n % 100000) : "");
        return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + convert(n % 10000000) : "");
    };

    return convert(num);
};

export default PayReceive;
