import React, { useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown, FaUser, FaIdCard, FaEnvelope, FaCommentDots, FaCheckCircle } from 'react-icons/fa';
import './Feedbackform.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
        'Excellent teaching quality', 'Great school infrastructure', 'Supportive teachers', 
        'Good sports facilities', 'Friendly student environment', 'Modern technology',
        'Well-equipped laboratory', 'Spacious playground', 'Good library resources', 
        'Professional staff', 'Safe campus', 'Good discipline', 'Regular PTMs', 
        'Scholarship programs', 'Placement record', 'Extra-curricular activities', 
        'Healthy canteen', 'Transportation', 'Computer lab', 'Academic curriculum'
    ];

    const badOptions = [
        'Need better lab equipment', 'Improve transportation', 'More activities needed', 
        'Canteen needs improvement', 'Library update', 'Outdated infrastructure', 
        'Better internet connectivity', 'Inadequate playground', 'Parking shortage', 
        'Need more sports equipment', 'Poor maintenance', 'Need counseling', 
        'High fees structure', 'Qualified teachers needed', 'Classroom size large', 
        'Better security', 'Hostel inadequate', 'Medical facilities', 
        'Poor communication', 'Need innovative teaching'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePoint = (point, type) => {
        const field = type === 'good' ? 'goodPoints' : 'badPoints';
        setFormData(prev => {
            const isSelected = prev[field].includes(point);
            if (isSelected) {
                return { ...prev, [field]: prev[field].filter(p => p !== point) };
            } else if (prev[field].length < 5) {
                return { ...prev, [field]: [...prev[field], point] };
            }
            return prev;
        });
    };

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validations
        if (!formData.studentName || !formData.studentId || !formData.email) {
            setError('All identity fields are required.');
            return;
        }
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (formData.goodPoints.length !== 5 || formData.badPoints.length !== 5) {
            setError('Please select exactly 5 points for both categories.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/feedback`, formData);
            if (response.data.success) {
                setSuccess(true);
                setFormData({
                    studentName: '', studentId: '', email: '',
                    goodPoints: [], badPoints: [], comment: ''
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-wrapper">
            <div className="feedback-container">
                <div className="feedback-header">
                    <h1><FaCommentDots /> Student Feedback</h1>
                    <p>Help us improve your learning experience</p>
                </div>

                {success && (
                    <div className="msg success-msg">
                        <FaCheckCircle /> Feedback submitted successfully!
                    </div>
                )}

                {error && <div className="msg error-msg">⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="feedback-main-form">
                    {/* Identity Section */}
                    <div className="form-section">
                        <h3><FaUser /> Basic Information</h3>
                        <div className="input-grid">
                            <div className="input-group">
                                <label><FaUser className="label-icon" /> Student Name</label>
                                <input name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Ex: Rahul Sharma" />
                            </div>
                            <div className="input-group">
                                <label><FaIdCard className="label-icon" /> Student ID</label>
                                <input name="studentId" value={formData.studentId} onChange={handleInputChange} placeholder="Ex: SD1024" />
                            </div>
                            <div className="input-group full-width">
                                <label><FaEnvelope className="label-icon" /> Email Address</label>
                                <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="rahul@example.com" />
                            </div>
                        </div>
                    </div>

                    {/* Feedback Points */}
                    <div className="points-flex">
                        {/* Good Points */}
                        <div className="point-section good">
                            <h3><FaThumbsUp /> Strengths ({formData.goodPoints.length}/5)</h3>
                            <div className="points-grid">
                                {goodOptions.map(option => (
                                    <div 
                                        key={option} 
                                        className={`point-chip ${formData.goodPoints.includes(option) ? 'active' : ''}`}
                                        onClick={() => togglePoint(option, 'good')}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bad Points */}
                        <div className="point-section bad">
                            <h3><FaThumbsDown /> Areas to Improve ({formData.badPoints.length}/5)</h3>
                            <div className="points-grid">
                                {badOptions.map(option => (
                                    <div 
                                        key={option} 
                                        className={`point-chip ${formData.badPoints.includes(option) ? 'active' : ''}`}
                                        onClick={() => togglePoint(option, 'bad')}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="form-section">
                        <h3><FaCommentDots /> Additional Thoughts</h3>
                        <textarea 
                            name="comment" 
                            value={formData.comment} 
                            onChange={handleInputChange} 
                            placeholder="Tell us more about your experience..."
                            maxLength="500"
                        />
                        <small>{formData.comment.length}/500</small>
                    </div>

                    <button type="submit" disabled={loading} className="submit-feedback-btn">
                        {loading ? 'Processing...' : 'Send Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedbackform;
