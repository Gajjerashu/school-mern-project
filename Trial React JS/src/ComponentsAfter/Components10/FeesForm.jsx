import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FeesForm.css";

const CLASS_FEES = {
    "1th": 25000, "2th": 25000, "3th": 26000, "4th": 26000, "5th": 27000,
    "6th": 28000, "7th": 29000, "8th": 30000, "9th": 32000, "10th": 35000,
    "11th Science": 40000, "11th Commerce": 38000,
    "12th Science": 42000, "12th Commerce": 40000
};

const FeesForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentId: "",
        studentName: "",
        parentName: "",
        email: "",
        parentPhone: "",
        applyClass: "",
        language: "English",
        paidAmount: "",
        paymentType: ""
    });

    const [totalFees, setTotalFees] = useState(0);
    const [previouslyPaid, setPreviouslyPaid] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExistingStudent, setIsExistingStudent] = useState(false);

    useEffect(() => {
        if (location.state) {
            const state = location.state;

            setFormData(prev => ({
                ...prev,
                studentId: state.studentId || "",
                studentName: state.studentName || "",
                parentName: state.parentName || "",
                email: state.email || "",
                applyClass: state.applyClass || "",
                parentPhone: state.parentPhone || "",
                language: state.language || "English"
            }));

            if (state.applyClass) {
                const fees = CLASS_FEES[state.applyClass] || 0;
                setTotalFees(fees);

                if (state.feeDetails) {
                    setIsExistingStudent(true);
                    setPreviouslyPaid(state.feeDetails.totalPaid || 0);
                    setPendingAmount(state.feeDetails.pendingAmount || 0);
                } else {
                    setPendingAmount(fees);
                }
            }
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "applyClass") {
            const fees = CLASS_FEES[value] || 0;
            setTotalFees(fees);
            if (!isExistingStudent) {
                setPendingAmount(fees);
            }
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const paidAmountNum = parseFloat(formData.paidAmount) || 0;

        if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
        if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.parentPhone.trim()) newErrors.parentPhone = "Phone is required";
        if (!formData.applyClass) newErrors.applyClass = "Class is required";

        if (!formData.paidAmount || paidAmountNum <= 0) {
            newErrors.paidAmount = "Enter valid amount";
        } else if (isExistingStudent && paidAmountNum > pendingAmount) {
            newErrors.paidAmount = `Amount cannot exceed pending amount (₹${pendingAmount.toLocaleString("en-IN")})`;
        } else if (!isExistingStudent && paidAmountNum > totalFees) {
            newErrors.paidAmount = `Amount cannot exceed total fees (₹${totalFees.toLocaleString("en-IN")})`;
        }

        if (!formData.paymentType) newErrors.paymentType = "Payment method is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const paymentData = {
                transactionId: `TXN_${Date.now()}${Math.floor(Math.random() * 1000)}`,
                studentId: formData.studentId,
                studentName: formData.studentName,
                parentName: formData.parentName || "",
                email: formData.email,
                parentPhone: formData.parentPhone,
                applyClass: formData.applyClass,
                language: formData.language,
                paidAmount: parseFloat(formData.paidAmount),
                paymentType: formData.paymentType,
                paymentMethod: "Online"
            };

            const response = await fetch("/api/payments/process", {  // ✅ Only this changed
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                navigate("/AfterLogin/PayReceive", {
                    state: {
                        transactionId: result.transactionId,
                        studentId: formData.studentId,
                        studentName: formData.studentName,
                        parentName: formData.parentName,
                        email: formData.email,
                        parentPhone: formData.parentPhone,
                        applyClass: formData.applyClass,
                        language: formData.language,
                        totalFees: result.totalFees,
                        paidAmount: result.paidAmount,
                        pendingAmount: result.pendingAmount,
                        paymentType: formData.paymentType,
                        paidAt: new Date()
                    }
                });
            } else {
                setErrors({ submit: result.error || "Payment failed" });
            }
        } catch (error) {
            console.error("Payment Error:", error);
            setErrors({ submit: "Connection error. Please check if server is running." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCurrentPending = () => {
        const paidNow = parseFloat(formData.paidAmount) || 0;
        if (isExistingStudent) {
            return Math.max(0, pendingAmount - paidNow);
        }
        return Math.max(0, totalFees - paidNow);
    };

    return (
        <section className="fees-section">
            <div className="fees-container">
                <div className="fees-header">
                    <div className="header-decoration">
                        <div className="circle-icon">💳</div>
                    </div>
                    <h2 className="fees-title">Fee Payment Portal</h2>
                    <p className="fees-subtitle">Secure • Fast • Convenient</p>
                </div>

                {totalFees > 0 && (
                    <div className="fee-summary-card">
                        <div className="summary-item">
                            <span className="summary-label">📊 Total Annual Fees</span>
                            <span className="summary-value total">₹{totalFees.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="summary-divider"></div>
                        {isExistingStudent && (
                            <>
                                <div className="summary-item">
                                    <span className="summary-label">✅ Already Paid</span>
                                    <span className="summary-value paid">
                                        ₹{previouslyPaid.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="summary-divider"></div>
                            </>
                        )}
                        <div className="summary-item">
                            <span className="summary-label">💰 Paying Now</span>
                            <span className="summary-value paying">
                                ₹{(parseFloat(formData.paidAmount) || 0).toLocaleString("en-IN")}
                            </span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-item">
                            <span className="summary-label">⏳ {isExistingStudent ? 'Remaining' : 'Pending'}</span>
                            <span className="summary-value pending">
                                ₹{getCurrentPending().toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                )}

                <form className="fees-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label><span className="icon">🆔</span> Student ID</label>
                            <input
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="Enter Student ID"
                                readOnly={!!location.state?.studentId}
                                className={location.state?.studentId ? "readonly-field" : ""}
                            />
                            {errors.studentId && <span className="error-text">{errors.studentId}</span>}
                        </div>

                        <div className="form-group">
                            <label><span className="icon">👤</span> Student Name</label>
                            <input
                                type="text"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                                placeholder="Enter Student Name"
                            />
                            {errors.studentName && <span className="error-text">{errors.studentName}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label><span className="icon">👨‍👩‍👦</span> Parent Name</label>
                            <input
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                placeholder="Enter Parent Name"
                            />
                        </div>

                        <div className="form-group">
                            <label><span className="icon">📧</span> Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label><span className="icon">📱</span> Phone Number</label>
                            <input
                                type="tel"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                placeholder="Enter Phone"
                            />
                            {errors.parentPhone && <span className="error-text">{errors.parentPhone}</span>}
                        </div>

                        <div className="form-group">
                            <label><span className="icon">🌐</span> Medium</label>
                            <select name="language" value={formData.language} onChange={handleChange}>
                                <option value="English">English</option>
                                <option value="Gujarati">Gujarati</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label><span className="icon">🎓</span> Class / Standard</label>
                            <select name="applyClass" value={formData.applyClass} onChange={handleChange}>
                                <option value="">Select Class</option>
                                {Object.keys(CLASS_FEES).map(cls => (
                                    <option key={cls} value={cls}>
                                        {cls} - ₹{CLASS_FEES[cls].toLocaleString("en-IN")}
                                    </option>
                                ))}
                            </select>
                            {errors.applyClass && <span className="error-text">{errors.applyClass}</span>}
                        </div>

                        <div className="form-group">
                            <label><span className="icon">💵</span> Payment Amount (₹)</label>
                            <input
                                type="number"
                                name="paidAmount"
                                value={formData.paidAmount}
                                onChange={handleChange}
                                placeholder="Enter Amount to Pay"
                                min="1"
                                step="1"
                            />
                            {errors.paidAmount && <span className="error-text">{errors.paidAmount}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label><span className="icon">💳</span> Payment Method</label>
                            <select name="paymentType" value={formData.paymentType} onChange={handleChange}>
                                <option value="">Select Method</option>
                                <option value="GPay">🟢 Google Pay</option>
                                <option value="PhonePe">🟣 PhonePe</option>
                                <option value="Paytm">🔵 Paytm</option>
                                <option value="UPI">💠 UPI</option>
                                <option value="Net Banking">🏦 Net Banking</option>
                                <option value="Debit Card">💳 Debit Card</option>
                                <option value="Credit Card">💳 Credit Card</option>
                                <option value="Cash">💵 Cash</option>
                                <option value="Cheque">📝 Cheque</option>
                            </select>
                            {errors.paymentType && <span className="error-text">{errors.paymentType}</span>}
                        </div>
                    </div>

                    {errors.submit && <div className="submit-error">{errors.submit}</div>}

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        <span className="btn-icon">✓</span>
                        {isSubmitting ? "Processing Payment..." : "Pay Now"}
                        <span className="btn-arrow">→</span>
                    </button>
                </form>

                <div className="security-badge">
                    <span className="badge-icon">🔒</span>
                    <span>Secure Payment • SSL Encrypted</span>
                </div>
            </div>
        </section>
    );
};

export default FeesForm;
