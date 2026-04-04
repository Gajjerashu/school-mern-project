import React, { useState, useEffect } from 'react';
import './Slide.css';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Slide() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/feedback`);
            
            if (response.data.success && Array.isArray(response.data.data)) {
                setFeedbacks(response.data.data);
                setError(null);
            } else {
                setError('No feedbacks available');
            }
        } catch (err) {
            console.error('Error fetching feedbacks:', err);
            setError('Failed to load feedbacks');
        } finally {
            setLoading(false);
        }
    };

    // Auto-play carousel
    useEffect(() => {
        if (!autoplay || feedbacks.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % feedbacks.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [autoplay, feedbacks.length]);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
        );
        setAutoplay(false);
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => 
            (prevIndex + 1) % feedbacks.length
        );
        setAutoplay(false);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        setAutoplay(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    if (loading) {
        return (
            <div className="slide-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading student feedbacks...</p>
                </div>
            </div>
        );
    }

    if (error || feedbacks.length === 0) {
        return (
            <div className="slide-container">
                <div className="empty-state">
                    <p className="empty-icon">📭</p>
                    <p className="empty-text">No student feedbacks yet</p>
                    <p className="empty-subtext">Feedbacks will appear here once students submit</p>
                </div>
            </div>
        );
    }

    const currentFeedback = feedbacks[currentIndex];
    const progressPercent = ((currentIndex + 1) / feedbacks.length) * 100;

    return (
        <div className="slide-container">
            <div className="slide-header">
                <h2>💬 Student Feedback Responses</h2>
                <p className="slide-subtitle">See what our students are saying</p>
            </div>

            <div className="slide-wrapper">
                <div className="slide-content">
                    {/* Feedback Card */}
                    <div className="feedback-card-slide">
                        <div className="card-header">
                            <div className="header-layout">
                                <div className="student-info">
                                    <h3 className="student-name">{currentFeedback.studentName}</h3>
                                </div>
                                <div className="date-info">
                                    <span className="feedback-date">📅 {formatDate(currentFeedback.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Good Points - Show only first 3 */}
                        <div className="points-section good-section">
                            <h4 className="points-title">👍 What's Good</h4>
                            <ul className="points-list">
                                {currentFeedback.goodPoints && currentFeedback.goodPoints.slice(0, 3).map((point, idx) => (
                                    <li key={idx} className="point-item good-point">
                                        <span className="point-icon">✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bad Points - Show only first 3 */}
                        <div className="points-section bad-section">
                            <h4 className="points-title">👎 Needs Improvement</h4>
                            <ul className="points-list">
                                {currentFeedback.badPoints && currentFeedback.badPoints.slice(0, 3).map((point, idx) => (
                                    <li key={idx} className="point-item bad-point">
                                        <span className="point-icon">!</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button 
                        className="slide-btn prev-btn"
                        onClick={handlePrev}
                        aria-label="Previous feedback"
                    >
                        ❮
                    </button>

                    <button 
                        className="slide-btn next-btn"
                        onClick={handleNext}
                        aria-label="Next feedback"
                    >
                        ❯
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>

                {/* Autoplay Toggle */}
                <div className="autoplay-control">
                    <button
                        className={`autoplay-btn ${autoplay ? 'active' : ''}`}
                        onClick={() => setAutoplay(!autoplay)}
                        title={autoplay ? 'Pause autoplay' : 'Resume autoplay'}
                    >
                        {autoplay ? '⏸ Pause' : '▶ Play'}
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="slide-dots">
                    {feedbacks.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to feedback ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Slide Counter */}
                <div className="slide-counter">
                    <span>{currentIndex + 1}</span>
                    <span className="divider">/</span>
                    <span>{feedbacks.length}</span>
                </div>
            </div>

            {/* Refresh Button */}
            <div className="refresh-section">
                <button 
                    className="refresh-btn"
                    onClick={fetchFeedbacks}
                >
                    🔄 Refresh Feedbacks
                </button>
            </div>
        </div>
    );
}
