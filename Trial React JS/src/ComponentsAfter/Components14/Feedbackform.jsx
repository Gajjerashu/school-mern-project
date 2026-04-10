import React, { useState } from 'react';
import './Feedbackform.css';
import axios from 'axios';

const Feedbackform = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        email: '',
        goodPoints: [],
        badPoints: [],
        comment: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const goodOptions = [
        'Excellent teaching quality',
        'Great school infrastructure',
        'Supportive teachers',
        'Good sports facilities',
        'Friendly student environment',
        'Modern technology in classrooms',
        'Well-equipped laboratory',
        'Spacious playground',
        'Good library resources',
        'Professional staff',
        'Safe and secure campus',
        'Good discipline system',
        'Regular parent-teacher meetings',
        'Scholarship programs',
        'Good placement record',
        'Extra-curricular activities',
        'Healthy canteen food',
        'Transportation facility',
        'Computer lab facilities',
        'Good academic curriculum'
    ];

    const badOptions = [
        'Need better lab equipment',
        'Improve transportation system',
        'More extracurricular activities needed',
        'Canteen needs improvement',
        'Library resources need update',
        'Classroom infrastructure outdated',
        'Need better internet connectivity',
        'Playground facilities inadequate',
        'Parking space shortage',
        'Need more sports equipment',
        'Poor maintenance of facilities',
        'Need better counseling services',
        'Fees structure is high',
        'Need more qualified teachers',
        'Classroom size is too large',
        'Need better security system',
        'Hostel facilities inadequate',
        'Need better medical facilities',
        'Communication with parents poor',
        'Need more innovative teaching methods'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGoodPointToggle = (point) => {
        setFormData(prev => {
            const isSelected = prev.goodPoints.includes(point);
            let updatedGoodPoints;

            if (isSelected) {
                updatedGoodPoints = prev.goodPoints.filter(p => p !== point);
            } else {
                if (prev.goodPoints.length < 5) {
                    updatedGoodPoints = [...prev.goodPoints, point];
                } else {
                    return prev;
                }
            }

            return { ...prev, goodPoints: updatedGoodPoints };
        });
    };

    const handleBadPointToggle = (point) => {
        setFormData(prev => {
            const isSelected = prev.badPoints.includes(point);
            let updatedBadPoints;

            if (isSelected) {
                updatedBadPoints = prev.badPoints.filter(p => p !== point);
            } else {
                if (prev.badPoints.length < 5) {
                    updatedBadPoints = [...prev.badPoints, point];
                } else {
                    return prev;
                }
            }

            return { ...prev, badPoints: updatedBadPoints };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.studentName.trim()) {
            setError('Please enter student name');
            return;
        }
        if (!formData.studentId.trim()) {
            setError('Please enter student ID');
            return;
        }
        if (!formData.email.trim()) {
            setError('Please enter email address');
            return;
        }
        if (formData.goodPoints.length !== 5) {
            setError('Please select exactly 5 good points');
            return;
        }
        if (formData.badPoints.length !== 5) {
            setError('Please select exactly 5 bad points');
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                studentName: formData.studentName,
                studentId: formData.studentId,
                email: formData.email,
                goodPoints: formData.goodPoints,
                badPoints: formData.badPoints,
                comment: formData.comment || 'No additional comments'
            };

            const response = await axios.post('https://school-backend-drm6.onrender.com/api/feedback', submitData);

            if (response.data.success) {
                setSuccess(true);
                setFormData({
                    studentName: '',
                    studentId: '',
                    email: '',
                    goodPoints: [],
                    badPoints: [],
                    comment: ''
                });

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            }
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-container">
            <div className="feedback-card">
                <div className="feedback-header">
                    <h1>💬 Student Feedback Form</h1>
                    <p className="subtitle">We value your feedback - select 5 good & 5 bad points</p>
                </div>

                {success && (
                    <div className="success-message">
                        <span className="success-icon">✓</span>
                        Thank you! Your feedback has been submitted successfully.
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <span className="error-icon">!</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="feedback-form">
                    {/* Student Information */}
                    <div className="form-section">
                        <h2 className="section-title">📋 YOUR INFORMATION</h2>

                        <div className="form-group">
                            <label htmlFor="studentName">Student Name *</label>
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="form-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentId">Student ID *</label>
                                <input
                                    type="text"
                                    id="studentId"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleInputChange}
                                    placeholder="Enter student ID"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Good Points Selection */}
                    <div className="form-section">
                        <div className="section-header">
                            <h2 className="section-title">👍 WHAT'S GOOD? (SELECT EXACTLY 5)</h2>
                            <span className="counter good-counter">
                                {formData.goodPoints.length}/5
                            </span>
                        </div>

                        <div className="options-grid good-grid">
                            {goodOptions.map((option, index) => (
                                <label key={index} className="option-item good-option">
                                    <input
                                        type="checkbox"
                                        checked={formData.goodPoints.includes(option)}
                                        onChange={() => handleGoodPointToggle(option)}
                                        disabled={
                                            formData.goodPoints.length >= 5 &&
                                            !formData.goodPoints.includes(option)
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    <span className="option-text">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Bad Points Selection */}
                    <div className="form-section">
                        <div className="section-header">
                            <h2 className="section-title">👎 WHAT NEEDS IMPROVEMENT? (SELECT EXACTLY 5)</h2>
                            <span className="counter bad-counter">
                                {formData.badPoints.length}/5
                            </span>
                        </div>

                        <div className="options-grid bad-grid">
                            {badOptions.map((option, index) => (
                                <label key={index} className="option-item bad-option">
                                    <input
                                        type="checkbox"
                                        checked={formData.badPoints.includes(option)}
                                        onChange={() => handleBadPointToggle(option)}
                                        disabled={
                                            formData.badPoints.length >= 5 &&
                                            !formData.badPoints.includes(option)
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    <span className="option-text">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Additional Comments */}
                    <div className="form-section">
                        <h2 className="section-title">💭 ADDITIONAL COMMENTS (OPTIONAL)</h2>

                        <div className="form-group">
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                placeholder="Share any additional feedback..."
                                className="form-textarea"
                                rows="4"
                            />
                            <div className="char-count">
                                {formData.comment.length} / 500 characters
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || formData.goodPoints.length !== 5 || formData.badPoints.length !== 5}
                        className="submit-btn"
                    >
                        {loading ? '⏳ Submitting...' : '✓ Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedbackform;
