import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FeesForm.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
                    const alreadyPaid = state.feeDetails.totalPaid || 0;
                    setPreviouslyPaid(alreadyPaid);
                    setPendingAmount(fees - alreadyPaid);
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
            setPendingAmount(isExistingStudent ? (fees - previouslyPaid) : fees);
        }

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        const paidAmountNum = parseFloat(formData.paidAmount) || 0;

        if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
        if (!formData.studentName.trim()) newErrors.studentName = "Name is required";
        if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
        if (!formData.parentPhone.match(/^\d{10}$/)) newErrors.parentPhone = "10-digit phone is required";
        if (!formData.applyClass) newErrors.applyClass = "Class is required";
        if (paidAmountNum <= 0) newErrors.paidAmount = "Enter valid amount";
        if (paidAmountNum > pendingAmount) newErrors.paidAmount = `Max: ₹${pendingAmount}`;
        if (!formData.paymentType) newErrors.paymentType = "Select payment method";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const paymentData = {
                transactionId: `TXN_${Date.now()}`,
                ...formData,
                paidAmount: parseFloat(formData.paidAmount),
                paidAt: new Date()
            };

            const response = await fetch(`${API_BASE_URL}/api/payments/process`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                navigate("/AfterLogin/PayReceive", {
                    state: { ...paymentData, ...result }
                });
            } else {
                setErrors({ submit: result.message || "Payment process failed." });
            }
        } catch (error) {
            setErrors({ submit: "Server not reachable. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const remainingBalance = pendingAmount - (parseFloat(formData.paidAmount) || 0);

    return (
        <section className="fees-section">
            <div className="fees-container">

                {/* ── Header ── */}
                <div className="fees-header-banner">
                    <div className="fees-header-icon">💳</div>
                    <div>
                        <h2 className="fees-title">Fee Payment Portal</h2>
                        <p className="fees-subtitle">Secure • Fast • Convenient</p>
                    </div>
                </div>

                {/* ── Fee Summary ── */}
                {totalFees > 0 && (
                    <div className="fee-summary-card">
                        <div className="summary-item">
                            <span className="summary-label">📊 Total Fees</span>
                            <span className="summary-value total">₹{totalFees.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-item">
                            <span className="summary-label">⏳ Remaining Balance</span>
                            <span className="summary-value pending">₹{remainingBalance.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                )}

                {/* ── Form ── */}
                <form className="fees-form" onSubmit={handleSubmit}>

                    {/* Row 1 — Student ID & Name */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">🪪</span> STUDENT ID
                            </label>
                            <input
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="Enter Student ID"
                                className={errors.studentId ? "input-error" : ""}
                            />
                            {errors.studentId && <span className="error-text">{errors.studentId}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                                <span className="label-icon">👤</span> STUDENT NAME
                            </label>
                            <input
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                                placeholder="Enter Student Name"
                                className={errors.studentName ? "input-error" : ""}
                            />
                            {errors.studentName && <span className="error-text">{errors.studentName}</span>}
                        </div>
                    </div>

                    {/* Row 2 — Parent Name & Email */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">👨‍👩‍👦</span> PARENT NAME
                            </label>
                            <input
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                placeholder="Enter Parent Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <span className="label-icon">✉️</span> EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                                className={errors.email ? "input-error" : ""}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>
                    </div>

                    {/* Row 3 — Phone & Medium */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">📱</span> PHONE NUMBER
                            </label>
                            <input
                                type="tel"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                placeholder="Enter Phone"
                                maxLength={10}
                                className={errors.parentPhone ? "input-error" : ""}
                            />
                            {errors.parentPhone && <span className="error-text">{errors.parentPhone}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                                <span className="label-icon">🌐</span> MEDIUM
                            </label>
                            <select name="language" value={formData.language} onChange={handleChange}>
                                <option value="English">English</option>
                                <option value="Gujarati">Gujarati</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 4 — Class & Amount */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">🎓</span> CLASS / STANDARD
                            </label>
                            <select
                                name="applyClass"
                                value={formData.applyClass}
                                onChange={handleChange}
                                className={errors.applyClass ? "input-error" : ""}
                            >
                                <option value="">Select Class</option>
                                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                    <option key={n} value={`${n}th`}>{n}th Standard</option>
                                ))}
                                <option value="11th Science">11th Science</option>
                                <option value="11th Commerce">11th Commerce</option>
                                <option value="12th Science">12th Science</option>
                                <option value="12th Commerce">12th Commerce</option>
                            </select>
                            {errors.applyClass && <span className="error-text">{errors.applyClass}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                                <span className="label-icon">💰</span> PAYMENT AMOUNT (₹)
                            </label>
                            <input
                                type="number"
                                name="paidAmount"
                                value={formData.paidAmount}
                                onChange={handleChange}
                                placeholder="Enter Amount to Pay"
                                className={errors.paidAmount ? "input-error" : ""}
                            />
                            {errors.paidAmount && <span className="error-text">{errors.paidAmount}</span>}
                        </div>
                    </div>

                    {/* Row 5 — Payment Method */}
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>
                                <span className="label-icon">🏦</span> PAYMENT METHOD
                            </label>
                            <select
                                name="paymentType"
                                value={formData.paymentType}
                                onChange={handleChange}
                                className={errors.paymentType ? "input-error" : ""}
                            >
                                <option value="">Select Method</option>
                                <option value="GPay">Google Pay</option>
                                <option value="PhonePe">PhonePe</option>
                                <option value="Paytm">Paytm</option>
                                <option value="UPI">UPI</option>
                                <option value="Net Banking">Net Banking</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                            {errors.paymentType && <span className="error-text">{errors.paymentType}</span>}
                        </div>
                    </div>

                    {errors.submit && (
                        <div className="submit-error">⚠️ {errors.submit}</div>
                    )}

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "✓ PAY NOW →"}
                    </button>
                </form>

                {/* Security Badge */}
                <div className="security-badge">
                    <span className="badge-icon">🔒</span>
                    Secure Payment • SSL Encrypted
                </div>

            </div>
        </section>
    );
};

export default FeesForm;
