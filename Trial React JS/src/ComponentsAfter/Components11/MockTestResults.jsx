import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaClock, FaEye, FaArrowLeft, FaPrint } from 'react-icons/fa';
// import confetti from 'canvas-confetti'; // Jo install hoy to unlock karjo
import './MockTestResults.css';

const PASS_MARKS = { 25: 12, 50: 23 };

const MockTestResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [animatedWidth, setAnimatedWidth] = useState(0);

    // Destructuring with default empty objects to prevent crashes
    const { studentInfo = {}, resultData = {} } = location.state || {};

    const passMarks = PASS_MARKS[resultData.totalQuestions] || 23;
    const passed = (resultData.correctAnswers || 0) >= passMarks;

    useEffect(() => {
        if (resultData?.percentage !== undefined) {
            const timer = setTimeout(() => {
                setAnimatedWidth(resultData.percentage);
            }, 300);
            
            // Confetti effect logic (Optional)
            // if (passed) {
            //     confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            // }
            
            return () => clearTimeout(timer);
        }
    }, [resultData, passed]);

    // Error handling: Jo direct page access kare to
    if (!location.state) {
        return (
            <div className="results-page">
                <div className="results-container">
                    <div className="error-card">
                        <h2>⚠️ Access Denied</h2>
                        <p>No test data found. Please complete a test first.</p>
                        <button onClick={() => navigate('/AfterLogin/Students')} className="primary-btn">
                            Go to Students Portal
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const formatTime = (seconds) => {
        if (!seconds) return "0m 0s";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="results-page">
            <div className="results-container">
                {/* Header Section */}
                <div className="results-header no-print">
                    <button onClick={() => navigate(-1)} className="back-nav-btn">
                        <FaArrowLeft /> Back
                    </button>
                    <div className="header-actions">
                        <button onClick={() => window.print()} className="icon-action-btn">
                            <FaPrint /> Print Result
                        </button>
                    </div>
                </div>

                {/* Main Result Card */}
                <div className={`result-card-main ${passed ? 'status-pass' : 'status-fail'}`}>
                    <div className="result-banner">
                        <div className="banner-icon-circle">
                            {passed ? <FaTrophy className="banner-icon bounce" /> : <FaTimesCircle className="banner-icon shake" />}
                        </div>
                        <h1>{passed ? 'Congratulations!' : 'Better Luck Next Time'}</h1>
                        <p className="status-text">
                            {passed ? 'You have successfully qualified the assessment.' : 'You did not meet the minimum passing criteria.'}
                        </p>
                    </div>

                    <div className="result-content">
                        {/* Student Info Bar */}
                        <div className="student-info-strip">
                            <div className="info-item">
                                <span className="label">Student Name</span>
                                <span className="value">{studentInfo.studentName || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Roll Number</span>
                                <span className="value">{studentInfo.studentId || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Class/Medium</span>
                                <span className="value">{studentInfo.applyClass} - {studentInfo.language}</span>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="stats-dashboard">
                            <div className="stat-card">
                                <span className="stat-label">Total Questions</span>
                                <span className="stat-value">{resultData.totalQuestions}</span>
                            </div>
                            <div className="stat-card score-correct">
                                <FaCheckCircle className="stat-icon" />
                                <span className="stat-label">Correct</span>
                                <span className="stat-value">{resultData.correctAnswers}</span>
                            </div>
                            <div className="stat-card score-wrong">
                                <FaTimesCircle className="stat-icon" />
                                <span className="stat-label">Incorrect</span>
                                <span className="stat-value">{resultData.wrongAnswers || 0}</span>
                            </div>
                            <div className="stat-card score-time">
                                <FaClock className="stat-icon" />
                                <span className="stat-label">Time Taken</span>
                                <span className="stat-value">{formatTime(resultData.timeTaken)}</span>
                            </div>
                        </div>

                        {/* Performance Gauge */}
                        <div className="performance-section">
                            <div className="score-flex">
                                <h3>Performance Summary</h3>
                                <span className={`percentage-text ${passed ? 'txt-success' : 'txt-danger'}`}>
                                    {resultData.percentage?.toFixed(1)}%
                                </span>
                            </div>
                            <div className="custom-progress-bar">
                                <div 
                                    className={`fill-bar ${passed ? 'fill-success' : 'fill-danger'}`}
                                    style={{ width: `${animatedWidth}%` }}
                                ></div>
                            </div>
                            <p className="min-req-note">
                                * Minimum passing score for this test: <strong>{passMarks} marks</strong>
                            </p>
                        </div>

                        {/* Footer Actions */}
                        <div className="results-footer-btns no-print">
                            <button onClick={() => navigate('/AfterLogin/MockTest', { state: { studentInfo } })} className="btn-retry">
                                🔄 Retake Assessment
                            </button>
                            <button onClick={() => navigate('/AfterLogin/Students')} className="btn-dashboard">
                                Go to Home
                            </button>
                            <button className="btn-review">
                                <FaEye /> Review Detailed Answers
                            </button>
                        </div>
                    </div>
                </div>

                <div className="print-footer-note only-print">
                    <p>This is a system-generated result for InspireEdge School.</p>
                </div>
            </div>
        </div>
    );
};

export default MockTestResults;
