import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaClock, FaForward } from 'react-icons/fa';
import './MockTestResults.css';

const PASS_MARKS = { 25: 12, 50: 23 };

const MockTestResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { studentInfo, resultData } = location.state || {};

    if (!studentInfo || !resultData) {
        return (
            <div className="results-page">
                <div className="results-container">
                    <div className="error-card">
                        <h2>⚠️ No Data Found</h2>
                        <p>Please search for a student first.</p>
                        <button
                            onClick={() => navigate('/AfterLogin/Students')}
                            className="back-btn"
                        >
                            Go Back to Check
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!resultData.totalQuestions || resultData.correctAnswers === undefined || resultData.percentage === undefined) {
        return (
            <div className="results-page">
                <div className="results-container">
                    <div className="error-card">
                        <h2>⚠️ Invalid Data</h2>
                        <p>The result data appears to be incomplete.</p>
                        <button
                            onClick={() => navigate('/AfterLogin/Students')}
                            className="back-btn"
                        >
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

    // ✅ Reattempt — Direct modal (Choose Question Count) screen par jump
    const handleReattempt = () => {
        navigate('/AfterLogin/MockTest', {
            state: {
                studentInfo: studentInfo
            }
        });
    };

    // ✅ Back to Check — Students page par jao
    const handleBackToCheck = () => {
        navigate('/AfterLogin/Students');
    };

    return (
        <div className="results-page">
            <div className="results-container">

                {/* Header */}
                <div className="results-header">
                    <button onClick={() => navigate(-1)} className="back-button">
                        ← Back
                    </button>
                    <h1>Mock Test Results</h1>
                </div>

                {/* Result Card */}
                <div className="result-card">
                    <div className={`result-header ${passed ? 'passed' : 'failed'}`}>
                        {passed ? (
                            <>
                                <FaTrophy className="result-icon" />
                                <h1>Congratulations! 🎉</h1>
                                <p>You have Passed</p>
                            </>
                        ) : (
                            <>
                                <FaTimesCircle className="result-icon" />
                                <h1>Not Qualified</h1>
                                <p>Better luck next time</p>
                            </>
                        )}
                    </div>

                    <div className="result-body">

                        {/* Student Info */}
                        <div className="result-info">
                            <div className="info-row">
                                <span>Student</span>
                                <span>{studentInfo.studentName}</span>
                            </div>
                            <div className="info-row">
                                <span>ID</span>
                                <span>{studentInfo.studentId}</span>
                            </div>
                            <div className="info-row">
                                <span>Class</span>
                                <span>{studentInfo.applyClass}</span>
                            </div>
                            <div className="info-row">
                                <span>Medium</span>
                                <span>{studentInfo.language}</span>
                            </div>
                            <div className="info-row">
                                <span>Pass Marks</span>
                                <span>{passMarks}/{resultData.totalQuestions}</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="result-stats">
                            <div className="stat total-stat">
                                <div className="stat-icon">📝</div>
                                <div className="value">{resultData.totalQuestions}</div>
                                <div className="label">Total</div>
                            </div>
                            <div className="stat correct">
                                <FaCheckCircle />
                                <div className="value">{resultData.correctAnswers}</div>
                                <div className="label">Correct</div>
                            </div>
                            <div className="stat wrong">
                                <FaTimesCircle />
                                <div className="value">{safeWrongAnswers}</div>
                                <div className="label">Wrong</div>
                            </div>
                            <div className="stat skipped">
                                <FaForward />
                                <div className="value">{safeSkippedAnswers}</div>
                                <div className="label">Skipped</div>
                            </div>
                        </div>

                        {/* Percentage Bar */}
                        <div className="percent-bar-wrap">
                            <div className="percent-label">
                                <span>Score</span>
                                <span className="pct-val">{resultData.percentage.toFixed(1)}%</span>
                            </div>
                            <div className="percent-bar">
                                <div className="percent-fill" style={{
                                    width: `${resultData.percentage}%`,
                                    background: passed
                                        ? 'linear-gradient(90deg,#22c55e,#16a34a)'
                                        : 'linear-gradient(90deg,#ef4444,#dc2626)'
                                }} />
                            </div>
                        </div>

                        {/* Time Taken */}
                        <div className="time-section">
                            <div className="time-item">
                                <FaClock className="time-icon" />
                                <div>
                                    <div className="time-label">Time Taken</div>
                                    <div className="time-value">{formatTime(safeTimeTaken)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        {!passed && (
                            <div className="retry-msg">
                                <p>📚 Study harder and try again!</p>
                                <p>💪 Need {passMarks - resultData.correctAnswers} more correct answers to pass</p>
                            </div>
                        )}
                        {passed && (
                            <div className="success-msg">
                                <p>🌟 Great effort! You performed well!</p>
                                <p>Keep up the good work in your next attempt!</p>
                            </div>
                        )}

                        {/* ✅ Action Buttons — Design same, logic changed */}
                        <div className="action-buttons">
                            <button onClick={handleReattempt} className="retry-btn">
                                🔄 Reattempt Test
                            </button>
                            <button onClick={handleBackToCheck} className="secondary-btn">
                                📋 Back to Check
                            </button>
                        </div>

                    </div>
                </div>

                {/* Performance Summary */}
                <div className="summary-card">
                    <h3>📈 Performance Summary</h3>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <div className="summary-label">Accuracy</div>
                            <div className="summary-value">
                                {resultData.totalQuestions > 0
                                    ? `${((resultData.correctAnswers / resultData.totalQuestions) * 100).toFixed(1)}%`
                                    : '0%'}
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-label">Attempted</div>
                            <div className="summary-value">
                                {resultData.totalQuestions - safeSkippedAnswers}
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-label">Efficiency</div>
                            <div className="summary-value">
                                {resultData.totalQuestions > 0
                                    ? `${(safeTimeTaken / resultData.totalQuestions).toFixed(1)}s/Q`
                                    : '0s/Q'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MockTestResults;
