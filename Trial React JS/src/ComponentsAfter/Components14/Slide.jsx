import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaSyncAlt, FaCalendarAlt, FaQuoteLeft } from 'react-icons/fa';
import './Slide.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Slide() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoplay, setAutoplay] = useState(true);

    // Fetch data with useCallback to prevent unnecessary re-renders
    const fetchFeedbacks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/feedback`);
            
            if (response.data.success && Array.isArray(response.data.data)) {
                setFeedbacks(response.data.data);
                setError(null);
            } else {
                setError('No feedback responses found.');
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Failed to fetch data from server.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    // Slider logic
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, [feedbacks.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
        setAutoplay(false);
    };

    // Autoplay effect
    useEffect(() => {
        let interval;
        if (autoplay && feedbacks.length > 0) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [autoplay, nextSlide, feedbacks.length]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="slide-loader">
                <div className="spinner"></div>
                <p>Fetching Student Voice...</p>
            </div>
        );
    }

    if (error || feedbacks.length === 0) {
        return (
            <div className="slide-empty">
                <div className="empty-card">
                    <p>📭 {error || "No feedbacks available yet."}</p>
                    <button onClick={fetchFeedbacks} className="retry-btn">Try Again</button>
                </div>
            </div>
        );
    }

    const currentFeedback = feedbacks[currentIndex];

    return (
        <div className="slide-master-container">
            <div className="slide-header">
                <h2 className="title"><FaQuoteLeft className="quote-icon" /> Testimonials</h2>
                <div className="title-underline"></div>
            </div>

            <div className="slider-box">
                {/* Previous Button */}
                <button className="nav-arrow left" onClick={prevSlide}><FaChevronLeft /></button>

                <div className="slide-card-wrapper">
                    <div className="feedback-slide-card active">
                        <div className="card-top">
                            <div className="student-profile">
                                <div className="avatar">{currentFeedback.studentName.charAt(0)}</div>
                                <div className="name-box">
                                    <h3>{currentFeedback.studentName}</h3>
                                    <span>Student ID: {currentFeedback.studentId}</span>
                                </div>
                            </div>
                            <div className="date-tag">
                                <FaCalendarAlt /> {formatDate(currentFeedback.createdAt)}
                            </div>
                        </div>

                        <div className="points-grid">
                            <div className="point-column success">
                                <h4>✨ Highlights</h4>
                                <ul>
                                    {currentFeedback.goodPoints?.slice(0, 4).map((p, i) => (
                                        <li key={i}>✅ {p}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="point-column warning">
                                <h4>🛠️ Suggestions</h4>
                                <ul>
                                    {currentFeedback.badPoints?.slice(0, 4).map((p, i) => (
                                        <li key={i}>⚠️ {p}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {currentFeedback.comment && (
                            <div className="comment-bubble">
                                <p>"{currentFeedback.comment}"</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Next Button */}
                <button className="nav-arrow right" onClick={() => { nextSlide(); setAutoplay(false); }}>
                    <FaChevronRight />
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="slider-footer">
                <div className="dots-container">
                    {feedbacks.map((_, i) => (
                        <span 
                            key={i} 
                            className={`dot-indicator ${i === currentIndex ? 'active' : ''}`}
                            onClick={() => { setCurrentIndex(i); setAutoplay(false); }}
                        ></span>
                    ))}
                </div>

                <div className="action-row">
                    <button className={`auto-toggle ${autoplay ? 'on' : 'off'}`} onClick={() => setAutoplay(!autoplay)}>
                        {autoplay ? '⏸ Pause' : '▶ Play'}
                    </button>
                    <button className="refresh-btn" onClick={fetchFeedbacks}>
                        <FaSyncAlt /> Refresh
                    </button>
                </div>
            </div>
        </div>
    );
}
