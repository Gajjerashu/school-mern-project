import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Admission.css";

const Admission = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLocked, setIsLocked] = useState(true);
    const [inquiryIdInput, setInquiryIdInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        studentName: "", fatherName: "", motherName: "",
        dateOfBirth: "", gender: "", bloodGroup: "",
        address: "", city: "", state: "", pincode: "",
        parentPhone: "", parentEmail: "", previousSchool: "",
        applyClass: "", language: "", aadharNumber: "", inquiryId: ""
    });

    useEffect(() => {
        const storedInquiryData = sessionStorage.getItem('inquiryData');

        if (storedInquiryData) {
            try {
                const inquiryData = JSON.parse(storedInquiryData);
                console.log("📥 Loading inquiry data:", inquiryData);

                setIsLocked(false);
                setFormData(prev => ({
                    ...prev,
                    studentName: inquiryData.studentName || "",
                    parentEmail: inquiryData.parentEmail || "",
                    parentPhone: inquiryData.parentPhone || "",
                    applyClass: inquiryData.applyClass || "",
                    language: inquiryData.language || "",
                    previousSchool: inquiryData.previousSchool || "",
                    inquiryId: inquiryData.inquiryId || ""
                }));
            } catch (error) {
                console.error("❌ Error parsing inquiry data:", error);
            }
        } else if (location.state?.inquiryData) {
            const inquiryData = location.state.inquiryData;
            setIsLocked(false);
            setFormData(prev => ({
                ...prev,
                studentName: inquiryData.studentName || "",
                parentEmail: inquiryData.parentEmail || "",
                parentPhone: inquiryData.parentPhone || "",
                applyClass: inquiryData.applyClass || "",
                language: inquiryData.language || "",
                previousSchool: inquiryData.previousSchool || "",
                inquiryId: inquiryData.inquiryId || ""
            }));
        }
    }, [location.state]);

    const handleUnlock = async () => {
        if (!inquiryIdInput.trim()) return setErrors({ unlock: "Enter Inquiry ID" });

        try {
            const res = await fetch(`/api/inquiries/${inquiryIdInput}`);  // ✅ Only this changed
            const data = await res.json();

            if (res.ok && data.approved) {
                setIsLocked(false);
                setFormData(prev => ({
                    ...prev,
                    studentName: data.studentName || "",
                    parentEmail: data.parentEmail || "",
                    parentPhone: data.parentPhone || "",
                    applyClass: data.applyClass || "",
                    language: data.language || "",
                    previousSchool: data.previousSchool || "",
                    inquiryId: inquiryIdInput
                }));
                setErrors({});
            } else {
                setErrors({ unlock: "Inquiry not approved or ID invalid." });
            }
        } catch (err) {
            setErrors({ unlock: "Connection Error." });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        console.log("📤 Sending Data to Backend:", formData);

        try {
            const res = await fetch("/api/admissions", {  // ✅ Only this changed
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                sessionStorage.removeItem('inquiryData');

                // Navigate to Fees page with student data INCLUDING studentId
                navigate("/AfterLogin/Fees", {
                    state: {
                        studentId: data.studentId, // ✅ IMPORTANT: Student ID from backend
                        studentName: formData.studentName,
                        parentName: formData.fatherName,
                        email: formData.parentEmail,
                        applyClass: formData.applyClass,
                        parentPhone: formData.parentPhone
                    }
                });
            } else {
                setErrors({ submit: data.error || "Validation Error" });
            }
        } catch (err) {
            setErrors({ submit: "Server Error. Check Backend Console." });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLocked) return (
        <section className="admission-section">
            <div className="admission-container locked">
                <div className="lock-icon-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="Lock" className="lock-img" />
                </div>
                <h2 className="lock-title">🔒 Admission Form Locked</h2>
                <p className="lock-subtitle">Enter your approved Inquiry ID to unlock the form</p>
                <div className="unlock-input-box">
                    <input
                        type="text"
                        placeholder="🔑 Enter Inquiry ID"
                        value={inquiryIdInput}
                        onChange={(e) => setInquiryIdInput(e.target.value)}
                    />
                    {errors.unlock && <p className="field-error">{errors.unlock}</p>}
                    <button className="unlock-btn" onClick={handleUnlock}>🔓 Unlock Form</button>
                </div>
            </div>
        </section>
    );

    return (
        <section className="admission-section">
            <div className="admission-container">
                <h2 className="admission-title">🎓 Student Admission Form</h2>
                <p className="admission-subtitle">Complete the form below to finalize your admission</p>

                {formData.inquiryId && (
                    <div className="inquiry-badge">
                        🆔 Inquiry ID: <strong>{formData.inquiryId}</strong>
                    </div>
                )}

                <form className="admission-form" onSubmit={handleSubmit}>

                    <div className="form-section">
                        <h3 className="section-title">👤 1. Student & Parent Info</h3>
                        <div className="form-grid">
                            <div className="input-field">
                                <label>📝 Student Name</label>
                                <input name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>📅 Date of Birth</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>⚧ Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <label>👨 Father's Name</label>
                                <input name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>👩 Mother's Name</label>
                                <input name="motherName" placeholder="Mother's Name" value={formData.motherName} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>🆔 Aadhar Number</label>
                                <input name="aadharNumber" placeholder="Aadhar Number" maxLength="12" value={formData.aadharNumber} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">📍 2. Contact & Address</h3>
                        <div className="form-grid">
                            <div className="input-field">
                                <label>📧 Email</label>
                                <input type="email" name="parentEmail" placeholder="Email" value={formData.parentEmail} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>📱 Phone</label>
                                <input name="parentPhone" placeholder="Phone" value={formData.parentPhone} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>🏙️ City</label>
                                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>🗺️ State</label>
                                <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                            </div>
                            <div className="input-field">
                                <label>📮 Pincode</label>
                                <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                            </div>
                            <div className="input-field full-width">
                                <label>🏠 Full Address</label>
                                <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} required className="full-width" />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">📚 3. Academic Selection</h3>
                        <div className="form-grid">
                            <div className="input-field">
                                <label>🎯 Select Standard</label>
                                <select name="applyClass" value={formData.applyClass} onChange={handleChange} required>
                                    <option value="">Select Standard</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={`${n}th`}>{n}th Standard</option>)}
                                    <option value="11th Science">11th Science</option>
                                    <option value="11th Commerce">11th Commerce</option>
                                    <option value="12th Science">12th Science</option>
                                    <option value="12th Commerce">12th Commerce</option>
                                </select>
                            </div>
                            <div className="input-field">
                                <label>🌐 Medium</label>
                                <select name="language" value={formData.language} onChange={handleChange} required>
                                    <option value="">Medium</option>
                                    <option value="English">English</option>
                                    <option value="Gujarati">Gujarati</option>
                                </select>
                            </div>
                            <div className="input-field full-width">
                                <label>🏫 Previous School</label>
                                <input name="previousSchool" placeholder="Previous School Name (if any)" value={formData.previousSchool} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {errors.submit && <div className="form-error">{errors.submit}</div>}
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "⏳ Processing..." : "✅ Submit Admission & Proceed to Payment"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Admission;
