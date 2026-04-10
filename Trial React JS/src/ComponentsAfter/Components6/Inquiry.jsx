import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Inquiry.css";

const MAX_MESSAGE_LENGTH = 500;

const Inquiry = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentName: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        applyClass: "",
        language: "",
        previousSchool: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const textareaRef = useRef(null);

    // ✅ Auto-resize textarea logic
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [formData.message]);

    const validate = () => {
        const e = {};
        if (!formData.studentName.trim()) e.studentName = "Student name is required.";
        if (!formData.parentName.trim()) e.parentName = "Parent name is required.";
       
        if (!formData.parentPhone.trim()) {
            e.parentPhone = "Parent phone is required.";
        } else if (!/^\d{10}$/.test(formData.parentPhone)) {
            e.parentPhone = "Please enter a valid 10-digit phone number.";
        }
        if (!formData.parentEmail.trim()) {
            e.parentEmail = "Parent email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.parentEmail)) {
            e.parentEmail = "Enter a valid email address.";
        }
        if (!formData.applyClass) e.applyClass = "Please select a standard.";
        if (!formData.language) e.language = "Please select medium.";
       
        if (formData.message.length > MAX_MESSAGE_LENGTH)
            e.message = `Limit exceeded: ${formData.message.length}/${MAX_MESSAGE_LENGTH}`;
           
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
       
        // Restriction: Only numbers for Phone
        if (name === "parentPhone") {
            if (value !== "" && !/^\d+$/.test(value)) return;
            if (value.length > 10) return;
        }
        setFormData((p) => ({ ...p, [name]: value }));
        // Clear specific error on change
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            window.scrollTo({ top: 100, behavior: 'smooth' });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/inquiries", formData);  // ✅ Only this changed for Vercel

            const data = response.data;
            if (data.success || response.status === 201) {
                // Save to sessionStorage for Admission flow
                const inquiryData = {
                    inquiryId: data.inquiryId,
                    studentName: formData.studentName,
                    parentEmail: formData.parentEmail,
                    parentPhone: formData.parentPhone,
                    applyClass: formData.applyClass,
                    language: formData.language,
                };
                sessionStorage.setItem('inquiryData', JSON.stringify(inquiryData));
               
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error("❌ Submission Error:", err);
            setErrors({ submit: err.response?.data?.error || "Server issue. Please try again later." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetForm = () => {
        setFormData({
            studentName: "", parentName: "", parentPhone: "",
            parentEmail: "", applyClass: "", language: "",
            previousSchool: "", message: "",
        });
        setErrors({});
        setSubmitted(false);
    };

    return (
        <section className="inquiry-section fade-in">
            <div className="inquiry-container">
                <header className="inquiry-header">
                    <h2 className="inquiry-title">📋 Admission Inquiry</h2>
                    <p className="inquiry-subtitle">Start your journey with InspireEdge School</p>
                </header>
                {!submitted ? (
                    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label>👤 STUDENT FULL NAME</label>
                                <input
                                    name="studentName"
                                    placeholder="Enter full name"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    className={errors.studentName ? "input-error" : ""}
                                />
                                {errors.studentName && <small className="error-text">{errors.studentName}</small>}
                            </div>
                            <div className="form-group">
                                <label>👨‍👩‍👦 PARENT/GUARDIAN NAME</label>
                                <input
                                    name="parentName"
                                    placeholder="Enter parent name"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                    className={errors.parentName ? "input-error" : ""}
                                />
                                {errors.parentName && <small className="error-text">{errors.parentName}</small>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>📱 PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="parentPhone"
                                    placeholder="10-digit mobile number"
                                    value={formData.parentPhone}
                                    onChange={handleChange}
                                    className={errors.parentPhone ? "input-error" : ""}
                                />
                                {errors.parentPhone && <small className="error-text">{errors.parentPhone}</small>}
                            </div>
                            <div className="form-group">
                               <label>📧 EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    name="parentEmail"
                                    placeholder="example@mail.com"
                                    value={formData.parentEmail}
                                    onChange={handleChange}
                                    className={errors.parentEmail ? "input-error" : ""}
                                />
                                {errors.parentEmail && <small className="error-text">{errors.parentEmail}</small>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>🎓 STANDARD/CLASS</label>
                                <select name="applyClass" value={formData.applyClass} onChange={handleChange} className={errors.applyClass ? "input-error" : ""}>
                                    <option value="">Select Class</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={`${n}th`}>{n}th Standard</option>)}
                                    <option value="11th Science">11th Science</option>
                                    <option value="11th Commerce">11th Commerce</option>
                                    <option value="12th Science">12th Science</option>
                                    <option value="12th Commerce">12th Commerce</option>
                                </select>
                                {errors.applyClass && <small className="error-text">{errors.applyClass}</small>}
                            </div>
                            <div className="form-group">
                                <label>🌐 MEDIUM OF INSTRUCTION</label>
                                <select name="language" value={formData.language} onChange={handleChange} className={errors.language ? "input-error" : ""}>
                                    <option value="">Select Medium</option>
                                    <option value="English">English</option>
                                    <option value="Gujarati">Gujarati</option>
                                </select>
                                {errors.language && <small className="error-text">{errors.language}</small>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>🏫 PREVIOUS SCHOOL NAME</label>
                            <input
                                name="previousSchool"
                                placeholder="Where did the student study before?"
                                value={formData.previousSchool}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>💬 ADDITIONAL MESSAGE</label>
                            <textarea
                                ref={textareaRef}
                                name="message"
                                placeholder="Any specific requirements or questions?"
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={MAX_MESSAGE_LENGTH}
                                rows={3}
                            />
                            <div className="char-count">
                                <span className={formData.message.length >= MAX_MESSAGE_LENGTH ? "limit-reached" : ""}>
                                    {formData.message.length} / {MAX_MESSAGE_LENGTH}
                                </span>
                            </div>
                        </div>
                        {errors.submit && <div className="error-banner">❌ {errors.submit}</div>}
                        <button type="submit" className="inquiry-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry Now"}
                        </button>
                    </form>
                ) : (
                    <div className="success-container scale-up">
                        <div className="success-check">✓</div>
                        <h3>Success! Inquiry Sent.</h3>
                        <p>We have received your details. Our admission team will contact you on <strong>{formData.parentPhone}</strong> soon.</p>
                        <div className="success-actions">
                            <button className="btn-secondary" onClick={handleResetForm}>New Inquiry</button>
                            <button className="btn-primary" onClick={() => navigate("/AfterLogin/Admission")}>Fill Full Admission Form</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Inquiry;
