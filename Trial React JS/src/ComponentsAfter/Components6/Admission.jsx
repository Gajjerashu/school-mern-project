import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Fetch કરતા Axios વધુ સ્ટેબલ છે
import "./Admission.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Admission = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLocked, setIsLocked] = useState(true);
    const [inquiryIdInput, setInquiryIdInput] = useState("");
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        studentName: "", fatherName: "", motherName: "",
        dateOfBirth: "", gender: "", bloodGroup: "",
        address: "", city: "", state: "Gujarat", pincode: "",
        parentPhone: "", parentEmail: "", previousSchool: "",
        applyClass: "", language: "", aadharNumber: "", inquiryId: ""
    });

    // ✅ Memoized fill function to prevent re-renders
    const fillFormData = useCallback((data) => {
        if (!data) return;
        setFormData(prev => ({
            ...prev,
            studentName: data.studentName || "",
            parentEmail: data.parentEmail || "",
            parentPhone: data.parentPhone || "",
            applyClass: data.applyClass || "",
            language: data.language || "",
            previousSchool: data.previousSchool || "",
            inquiryId: data.inquiryId || ""
        }));
        setIsLocked(false);
    }, []);

    useEffect(() => {
        const storedInquiryData = sessionStorage.getItem('inquiryData');
        if (storedInquiryData) {
            try {
                fillFormData(JSON.parse(storedInquiryData));
            } catch (error) {
                console.error("❌ Storage Error:", error);
            }
        } else if (location.state?.inquiryData) {
            fillFormData(location.state.inquiryData);
        }
    }, [location.state, fillFormData]);

    const handleUnlock = async () => {
        const id = inquiryIdInput.trim();
        if (!id) return setErrors({ unlock: "Please enter a valid Inquiry ID" });

        setIsUnlocking(true);
        setErrors({});
        try {
            const res = await axios.get(`${API_BASE_URL}/api/inquiries/${id}`);
            if (res.data && res.data.approved) {
                const fetchedData = { ...res.data, inquiryId: id };
                fillFormData(fetchedData);
                sessionStorage.setItem('inquiryData', JSON.stringify(fetchedData));
            } else {
                setErrors({ unlock: "This Inquiry ID is either invalid or not approved yet." });
            }
        } catch (err) {
            setErrors({ unlock: "Connection failed. Check ID and try again." });
        } finally {
            setIsUnlocking(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Number only validation
        if (["aadharNumber", "parentPhone", "pincode"].includes(name)) {
            if (value !== "" && !/^\d+$/.test(value)) return;
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear specific error when user starts typing
        if (errors.submit) setErrors({});
    };

    const validateForm = () => {
        let newErrors = {};
        if (formData.aadharNumber.length !== 12) newErrors.submit = "Aadhar Number must be exactly 12 digits.";
        if (formData.parentPhone.length !== 10) newErrors.submit = "Phone Number must be 10 digits.";
        if (!formData.dateOfBirth) newErrors.submit = "Please select Date of Birth.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/admissions`, formData);
            
            if (res.data.success) {
                sessionStorage.removeItem('inquiryData');
                navigate("/AfterLogin/Fees", {
                    state: {
                        studentId: res.data.studentId,
                        studentName: formData.studentName,
                        parentName: formData.fatherName,
                        email: formData.parentEmail,
                        applyClass: formData.applyClass,
                        parentPhone: formData.parentPhone
                    }
                });
            }
        } catch (err) {
            setErrors({ submit: err.response?.data?.error || "Submission failed. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- RENDER LOCKED VIEW ---
    if (isLocked) return (
        <section className="admission-section fade-in">
            <div className="admission-container locked-card">
                <div className="lock-visual">
                    <div className="lock-circle">
                        <img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="Lock" />
                    </div>
                </div>
                <h2 className="lock-title">Admission Portal Locked</h2>
                <p className="lock-subtitle">Only approved inquiries can proceed to final admission.</p>
                
                <div className="unlock-form-group">
                    <input
                        type="text"
                        className={`unlock-input ${errors.unlock ? "input-error" : ""}`}
                        placeholder="Enter Approved Inquiry ID"
                        value={inquiryIdInput}
                        onChange={(e) => setInquiryIdInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    />
                    {errors.unlock && <span className="error-text">{errors.unlock}</span>}
                    <button className="unlock-primary-btn" onClick={handleUnlock} disabled={isUnlocking}>
                        {isUnlocking ? <span className="loader"></span> : "Unlock Registration"}
                    </button>
                </div>
            </div>
        </section>
    );

    // --- RENDER FORM VIEW ---
    return (
        <section className="admission-section fade-in">
            <div className="admission-container">
                <header className="form-header">
                    <h2 className="admission-title">🎓 Student Admission Form</h2>
                    <div className="inquiry-status-badge">
                        Status: <span>Approved (ID: {formData.inquiryId})</span>
                    </div>
                </header>

                <form className="admission-form" onSubmit={handleSubmit}>
                    {/* Section 1: Personal Info */}
                    <div className="form-card-section">
                        <h3 className="section-heading">👤 1. Student & Family Details</h3>
                        <div className="form-grid-3">
                            <div className="input-group">
                                <label>Student Full Name</label>
                                <input name="studentName" value={formData.studentName} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Date of Birth</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Father's Name</label>
                                <input name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Mother's Name</label>
                                <input name="motherName" value={formData.motherName} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Aadhar Number (12 Digits)</label>
                                <input name="aadharNumber" maxLength="12" value={formData.aadharNumber} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Contact */}
                    <div className="form-card-section">
                        <h3 className="section-heading">📍 2. Contact Information</h3>
                        <div className="form-grid-2">
                            <div className="input-group">
                                <label>Parent's Email</label>
                                <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Primary Contact Number</label>
                                <input name="parentPhone" maxLength="10" value={formData.parentPhone} onChange={handleChange} required />
                            </div>
                            <div className="input-group full-row">
                                <label>Residential Address</label>
                                <textarea name="address" rows="3" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>City</label>
                                <input name="city" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Pincode</label>
                                <input name="pincode" maxLength="6" value={formData.pincode} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Academic */}
                    <div className="form-card-section">
                        <h3 className="section-heading">📚 3. Admission Details</h3>
                        <div className="form-grid-2">
                            <div className="input-group">
                                <label>Apply for Standard</label>
                                <select name="applyClass" value={formData.applyClass} onChange={handleChange} required>
                                    <option value="">Choose Standard</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={`${n}th`}>{n}th Standard</option>)}
                                    <optgroup label="Higher Secondary">
                                        <option value="11th Science">11th Science</option>
                                        <option value="11th Commerce">11th Commerce</option>
                                        <option value="12th Science">12th Science</option>
                                        <option value="12th Commerce">12th Commerce</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Instruction Medium</label>
                                <select name="language" value={formData.language} onChange={handleChange} required>
                                    <option value="">Select Medium</option>
                                    <option value="English">English</option>
                                    <option value="Gujarati">Gujarati</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {errors.submit && <div className="error-banner">⚠️ {errors.submit}</div>}
                    
                    <div className="form-actions">
                        <button type="submit" className="final-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Finalizing Admission..." : "Submit Admission & Proceed to Fees"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Admission;
