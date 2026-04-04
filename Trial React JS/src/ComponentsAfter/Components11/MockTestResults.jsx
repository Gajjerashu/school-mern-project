import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaClock, FaForward, FaEye } from 'react-icons/fa';
// import confetti from 'canvas-confetti'; // Optional: install via npm
import './MockTestResults.css';

const PASS_MARKS = { 25: 12, 50: 23 };

const MockTestResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [animatedWidth, setAnimatedWidth] = useState(0);

    const { studentInfo, resultData } = location.state || {};

    // Animation Effect for Progress Bar
    useEffect(() => {
        if (resultData?.percentage) {
            const timer = setTimeout(() => {
                setAnimatedWidth(resultData.percentage);
            }, 300);
            
            // Trigger confetti if passed
            // if (resultData.correctAnswers >= (PASS_MARKS[resultData.totalQuestions] || 23)) {
            //     confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            // }
            
            return () => clearTimeout(timer);
        }
    }, [resultData]);

    if (!studentInfo || !resultData) {
        return (
            <div className="results-page">
                <div className="results-container">
                    <div className="error-card">
                        <h2>⚠️ No Data Found</h2>
                        <p>Please search for a student first.</p>
                        <button onClick={() => navigate('/AfterLogin/Students')} className="back-btn">
                            Go Back to Check
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const safeSkippedAnswers = resultData.skippedAnswers || 0;
    const safeWrongAnswers = resultData.wrongAnswers || 0;
    const safeTimeTaken = resultData.timeTaken || 0;
    const passMarks = PASS_MARKS[resultData.totalQuestions] || 23;
    const passed = resultData.correctAnswers >= passMarks;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="results-page">
            <div className="results-container">
                {/* Header */}
                <div className="results-header">
                    <button onClick={() => navigate(-1)} className="back-button">← Back</button>
                    <h1>Mock Test Results</h1>
                    <button onClick={() => window.print()} className="print-btn-icon">🖨️</button>
                </div>

                {/* Result Card */}
                <div className={`result-card-outer ${passed ? 'passed-border' : 'failed-border'}`}>
                    <div className={`result-header-box ${passed ? 'passed-bg' : 'failed-bg'}`}>
                        {passed ? <FaTrophy className="main-icon bounce" /> : <FaTimesCircle className="main-icon shake" />}
                        <h1>{passed ? 'Congratulations! 🎉' : 'Not Qualified'}</h1>
                        <p>{passed ? 'Excellent Work!' : 'Keep practicing for a better score'}</p>
                    </div>

                    <div className="result-body">
                        {/* Student Badge */}
                        <div className="student-badge">
                            <span className="name">{studentInfo.studentName}</span>
                            <span className="details">{studentInfo.applyClass} | {studentInfo.language}</span>
                        </div>

                        {/* Stats Grid */}
                        <div className="stats-grid-container">
                            <div className="stat-box">
                                <span className="label">Total Qs</span>
                                <span className="value">{resultData.totalQuestions}</span>
                            </div>
                            <div className="stat-box correct">
                                <FaCheckCircle />
                                <span className="value">{resultData.correctAnswers}</span>
                                <span className="label">Correct</span>
                            </div>
                            <div className="stat-box wrong">
                                <FaTimesCircle />
                                <span className="value">{safeWrongAnswers}</span>
                                <span className="label">Wrong</span>
                            </div>
                            <div className="stat-box time">
                                <FaClock />
                                <span className="value">{formatTime(safeTimeTaken)}</span>
                                <span className="label">Time</span>
                            </div>
                        </div>

                        {/* Percentage Bar with Animation */}
                        <div className="percentage-section">
                            <div className="percent-label-row">
                                <span>Final Score</span>
                                <span className="percent-number">{resultData.percentage.toFixed(1)}%</span>
                            </div>
                            <div className="progress-track">
                                <div 
                                    className={`progress-fill ${passed ? 'success' : 'danger'}`} 
                                    style={{ width: `${animatedWidth}%` }}
                                ></div>
                            </div>
                            <p className="pass-mark-info">Minimum required: {passMarks} correct answers</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="button-group">
                            <button onClick={() => navigate('/AfterLogin/MockTest', { state: { studentInfo } })} className="primary-btn">
                                🔄 Try Again
                            </button>
                            <button onClick={() => navigate('/AfterLogin/Students')} className="outline-btn">
                                📋 Dashboard
                            </button>
                            {/* Optional: Add Review Button */}
                            <button className="text-btn">
                                <FaEye /> Review Answers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockTestResults;
