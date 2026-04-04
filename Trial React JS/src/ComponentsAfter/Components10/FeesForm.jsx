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

            // ✅ Backend URL check karjo (localhost:5000 chhe ke 8080)
            const response = await fetch("http://localhost:5000/api/payments/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                navigate("/AfterLogin/PayReceive", { state: { ...paymentData, ...result } });
            } else {
                setErrors({ submit: result.message || "Payment process failed." });
            }
        } catch (error) {
            setErrors({ submit: "Backend Server is not reachable. Check console for CORS error." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="fees-section">
            <div className="fees-container">
                <div className="fees-header">
                    <h2 className="fees-title">Fee Payment Portal</h2>
                    <p className="fees-subtitle">InspireEdge School Management</p>
                </div>

                {totalFees > 0 && (
                    <div className="fee-summary-card">
                        <div className="summary-item">
                            <span>📊 Total Fees:</span>
                            <span className="summary-value">₹{totalFees.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="summary-item">
                            <span>⏳ Remaining Balance:</span>
                            <span className="summary-value pending">₹{(pendingAmount - (parseFloat(formData.paidAmount) || 0)).toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                )}

                <form className="fees-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Student ID</label>
                            <input name="studentId" value={formData.studentId} readOnly className="readonly-field" />
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="studentName" value={formData.studentName} onChange={handleChange} />
                            {errors.studentName && <span className="error-text">{errors.studentName}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Amount to Pay (₹)</label>
                            <input type="number" name="paidAmount" value={formData.paidAmount} onChange={handleChange} placeholder="Enter Amount" />
                            {errors.paidAmount && <span className="error-text">{errors.paidAmount}</span>}
                        </div>
                        <div className="form-group">
                            <label>Payment Method</label>
                            <select name="paymentType" value={formData.paymentType} onChange={handleChange}>
                                <option value="">Select Method</option>
                                <option value="GPay">Google Pay</option>
                                <option value="PhonePe">PhonePe</option>
                                <option value="Cash">Cash</option>
                            </select>
                            {errors.paymentType && <span className="error-text">{errors.paymentType}</span>}
                        </div>
                    </div>

                    {errors.submit && <div className="submit-error" style={{color: 'red', marginBottom: '10px'}}>{errors.submit}</div>}

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Confirm & Pay"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default FeesForm;
