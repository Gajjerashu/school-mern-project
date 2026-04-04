import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Inquiry.css";

const MAX_MESSAGE_LENGTH = 500;
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Inquiry = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentName: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        applyClass: "",
        language: "", // ✅ FIXED: Keep as empty, send as is
        previousSchool: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const textareaRef = useRef(null);

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
        if (!formData.parentPhone.trim()) e.parentPhone = "Parent phone is required.";
        if (formData.parentPhone && !/^[0-9+\-()\s]{6,20}$/.test(formData.parentPhone))
            e.parentPhone = "Enter a valid phone number.";
        if (!formData.parentEmail.trim()) e.parentEmail = "Parent email is required.";
        if (formData.parentEmail && !/^\S+@\S+\.\S+$/.test(formData.parentEmail))
            e.parentEmail = "Enter a valid email.";
        if (!formData.applyClass) e.applyClass = "Please select a class.";
        if (!formData.language) e.language = "Please select language medium.";
        if (formData.message.length > MAX_MESSAGE_LENGTH)
            e.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
              const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to submit inquiry");

            console.log("✅ Inquiry submitted:", data);

            // Prepare inquiry data for Admission form
            const inquiryData = {
                inquiryId: data.inquiryId,
                studentName: formData.studentName,
                parentEmail: formData.parentEmail,
                parentPhone: formData.parentPhone,
                applyClass: formData.applyClass,
                language: formData.language,
                previousSchool: formData.previousSchool
            };

            // Store in sessionStorage
            sessionStorage.setItem('inquiryData', JSON.stringify(inquiryData));

            // Show success message
            setSubmitted(true);

        } catch (err) {
            console.error("❌ Inquiry submission error:", err);
            setErrors({ submit: err.message || "Failed to submit. Try again later." });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✅ FIXED: Handle submit another inquiry
    const handleResetForm = () => {
        // ✅ Clear all form data
        setFormData({
            studentName: "",
            parentName: "",
            parentPhone: "",
            parentEmail: "",
            applyClass: "",
            language: "",
            previousSchool: "",
            message: "",
        });
        // Clear errors
        setErrors({});
        // Hide success message
        setSubmitted(false);
    };

    return (
        <section className="inquiry-section">
            <div className="inquiry-container">
                <h2 className="inquiry-title">📋 Student Inquiry Form</h2>
                <p className="inquiry-subtitle">Fill out the form below and we'll contact you soon.</p>

                {!submitted ? (
                    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
                        <div className="two-grid">
                            <div className="form-group">
                                <label htmlFor="studentName">👤 Student Name</label>
                                <input
                                    id="studentName"
                                    type="text"
                                    name="studentName"
                                    placeholder="Enter student name"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                />
                                {errors.studentName && <div className="field-error">{errors.studentName}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="parentName">👨‍👩‍👧 Parent Name</label>
                                <input
                                    id="parentName"
                                    type="text"
                                    name="parentName"
                                    placeholder="Enter parent name"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                />
                                {errors.parentName && <div className="field-error">{errors.parentName}</div>}
                            </div>
                        </div>

                        <div className="two-grid">
                            <div className="form-group">
                                <label htmlFor="parentPhone">📱 Parent Phone Number</label>
                                <input
                                    id="parentPhone"
                                    type="tel"
                                    name="parentPhone"
                                    placeholder="Enter phone number"
                                    value={formData.parentPhone}
                                    onChange={handleChange}
                                />
                                {errors.parentPhone && <div className="field-error">{errors.parentPhone}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="parentEmail">📧 Parent Email</label>
                                <input
                                    id="parentEmail"
                                    type="email"
                                    name="parentEmail"
                                    placeholder="Enter email address"
                                    value={formData.parentEmail}
                                    onChange={handleChange}
                                />
                                {errors.parentEmail && <div className="field-error">{errors.parentEmail}</div>}
                            </div>
                        </div>

                        <div className="two-grid">
                            <div className="form-group">
                                <label htmlFor="applyClass">🎓 Apply For The Class</label>
                                <select id="applyClass" name="applyClass" value={formData.applyClass} onChange={handleChange}>
                                    <option value="">Select Standard</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={`${n}th`}>{n}th Standard</option>)}
                                    <option value="11th Science">11th Science</option>
                                    <option value="11th Commerce">11th Commerce</option>
                                    <option value="12th Science">12th Science</option>
                                    <option value="12th Commerce">12th Commerce</option>
                                </select>
                                {errors.applyClass && <div className="field-error">{errors.applyClass}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="language">🌐 Language Medium</label>
                                <select id="language" name="language" value={formData.language} onChange={handleChange}>
                                    <option value="">Select Medium</option>
                                    <option value="English">English</option>
                                    <option value="Gujarati">Gujarati</option>
                                </select>
                                {errors.language && <div className="field-error">{errors.language}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="previousSchool">🏫 Previous School (if any)</label>
                            <input
                                id="previousSchool"
                                type="text"
                                name="previousSchool"
                                placeholder="Enter previous school name"
                                value={formData.previousSchool}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">💬 Message</label>
                            <textarea
                                id="message"
                                ref={textareaRef}
                                name="message"
                                placeholder="Write your message (min 80 Words)..."
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={MAX_MESSAGE_LENGTH}
                                rows={4}
                            />
                            <div className="msg-bar">
                                <small className="muted">(Tell us anything important...)</small>
                                <small className={`msg-count ${formData.message.length > MAX_MESSAGE_LENGTH - 50 ? "warn" : ""}`}>
                                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                                </small>
                            </div>
                            {errors.message && <div className="field-error">{errors.message}</div>}
                        </div>

                        {errors.submit && <div className="form-error">{errors.submit}</div>}

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? "⏳ Submitting..." : "✅ Submit Inquiry"}
                        </button>
                    </form>
                ) : (
                    <div className="inquiry-success">
                        <div className="success-icon">✓</div>
                        <h3>🎉 Thank You!</h3>
                        <p>Your inquiry has been received successfully.</p>
                        <p className="success-message">We'll contact you shortly.</p>

                        {/* ✅ FIXED: Reset form properly */}
                        <button className="reset-btn" onClick={handleResetForm}>
                            📋 Submit Another Inquiry
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Inquiry;
