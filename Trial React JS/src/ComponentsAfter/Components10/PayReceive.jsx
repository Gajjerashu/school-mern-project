import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PayReceive.css";

const PayReceive = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiptRef = useRef();

    // Priority: location.state -> fetch from API
    const [paymentData, setPaymentData] = useState(location.state || {});
    const [loading, setLoading] = useState(!location.state?.transactionId);

    useEffect(() => {
        const txnId = location.state?.transactionId;
        
        const fetchReceipt = async () => {
            if (txnId && !location.state?.studentName) { // Fetch only if data is missing
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
    }, [location.state?.transactionId, location.state?.studentName]);

    // Data safely parsed to Number
    const totalFees = Number(paymentData?.totalFees || 0);
    const paidAmount = Number(paymentData?.paidAmount || 0);
    const pendingAmount = Number(paymentData?.pendingAmount || 0);

    const handlePrint = () => {
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
            Cash: "💵", Cheque: "📝"
        };
        return icons[type] || "💰";
    };

    if (loading) {
        return <div className="receipt-page"><div className="loader">Generatring Receipt...</div></div>;
    }

    if (!paymentData?.transactionId) {
        return (
            <div className="receipt-page">
                <div className="receipt-error">
                    <h2>InspireEdge School</h2>
                    <h3>No Transaction Found</h3>
                    <p>Please complete the payment process first.</p>
                    <button onClick={() => navigate("/AfterLogin/Fees")} className="pay-fees-btn">Go to Fees Page</button>
                </div>
            </div>
        );
    }

    return (
        <div className="receipt-page">
            <div className="receipt-container" ref={receiptRef}>
                {/* School Header */}
                <div className="school-header-receipt">
                    <div className="school-logo-receipt">🎓</div>
                    <div>
                        <h2>InspireEdge School</h2>
                        <p className="school-address">Vadodara, Gujarat - 390001</p>
                        <p className="school-contact">📞 +91 1234567890 | 📧 info@inspireedge.edu</p>
                    </div>
                </div>

                <div className="receipt-divider"></div>

                <div className="receipt-header-section">
                    <h3>FEE PAYMENT RECEIPT</h3>
                    <div className="receipt-number">
                        <p>Receipt No: <strong>#{paymentData.transactionId}</strong></p>
                        <p>Date: <strong>{new Date().toLocaleDateString("en-IN")}</strong></p>
                    </div>
                </div>

                {/* Student & Payment Info Grid */}
                <div className="info-grid-receipt">
                    <div className="info-item"><span>Student ID:</span> <strong>{paymentData.studentId}</strong></div>
                    <div className="info-item"><span>Name:</span> <strong>{paymentData.studentName}</strong></div>
                    <div className="info-item"><span>Class:</span> <strong>{paymentData.applyClass}</strong></div>
                    <div className="info-item"><span>Payment Mode:</span> <strong>{getPaymentIcon(paymentData.paymentType)} {paymentData.paymentType}</strong></div>
                </div>

                {/* Fee Table */}
                <table className="fee-table">
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th className="text-right">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Course Fees</td>
                            <td className="text-right">₹{totalFees.toLocaleString("en-IN")}</td>
                        </tr>
                        <tr className="highlight-row">
                            <td><strong>Amount Paid (Current)</strong></td>
                            <td className="text-right"><strong>₹{paidAmount.toLocaleString("en-IN")}</strong></td>
                        </tr>
                        <tr className="pending-row">
                            <td>Remaining Balance</td>
                            <td className="text-right">₹{pendingAmount.toLocaleString("en-IN")}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="amount-words">
                    <p><strong>In Words:</strong> {numberToWords(paidAmount)} Rupees Only</p>
                </div>

                {/* Footer Section */}
                <div className="receipt-footer-section">
                    <div className="signature-box">
                        <div className="signature-line"></div>
                        <p>Authorized Signatory</p>
                    </div>
                    <div className="seal-circle">SCHOOL SEAL</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons no-print">
                <button onClick={handlePrint} className="action-btn download">Print Receipt</button>
                <button onClick={() => navigate("/AfterLogin/Home1")} className="action-btn home">Back to Dashboard</button>
            </div>
        </div>
    );
};

// Indian Number System Converter (Lakhs/Crores)
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
