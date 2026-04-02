import React, { useState, useEffect } from 'react';
import './Show.css';
import axios from 'axios';

// ✅ Create axios instance with baseURL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000
});

export default function Show() {
    const [mockTestResults, setMockTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStudent, setFilterStudent] = useState('');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        fetchMockTestResults();
    }, []);

    const fetchMockTestResults = async () => {
        try {
            setLoading(true);
            console.log('📥 Fetching mock test results...');
            
            // ✅ FIXED: Use full URL with axiosInstance
            const response = await axiosInstance.get('/api/mocktest/results');
            
            console.log('✅ Response received:', response.data);
            
            if (response.data.success) {
                const allResults = response.data.data || [];
                console.log('📊 Total results loaded:', allResults.length);
                setMockTestResults(allResults);
                setError(null);
            } else {
                setError('Failed to fetch mock test results');
            }
        } catch (err) {
            console.error('❌ Error fetching mock test results:', err);
            setError(err.message || 'Error loading mock test results');
        } finally {
            setLoading(false);
        }
    };

    const getPassStatus = (passed, percentage) => {
        if (passed) {
            return <span className="status-badge passed">✓ Passed</span>;
        } else {
            return <span className="status-badge failed">✗ Failed</span>;
        }
    };

    const getPercentageColor = (percentage) => {
        if (percentage >= 80) return '#27ae60';
        if (percentage >= 60) return '#f39c12';
        return '#e74c3c';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const filteredResults = mockTestResults.filter(result => {
        if (!filterStudent) return true;
        return (
            result.studentId.toLowerCase().includes(filterStudent.toLowerCase()) ||
            result.studentName.toLowerCase().includes(filterStudent.toLowerCase()) ||
            result.std.toLowerCase().includes(filterStudent.toLowerCase())
        );
    });

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'percentage':
                return b.percentage - a.percentage;
            case 'name':
                return a.studentName.localeCompare(b.studentName);
            case 'date':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    const stats = {
        total: mockTestResults.length,
        passed: mockTestResults.filter(r => r.passed).length,
        failed: mockTestResults.filter(r => !r.passed).length,
        avgPercentage: mockTestResults.length > 0 
            ? (mockTestResults.reduce((sum, r) => sum + r.percentage, 0) / mockTestResults.length).toFixed(2)
            : 0
    };

    const passRate = stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(2) : 0;

    return (
        <div className="mock-test-container">
            <div className="mock-test-header">
                <h1>📊 Mock Test Results</h1>
                <p className="subtitle">Student Performance Analysis</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <div className="stat-label">Total Tests</div>
                        <div className="stat-value">{stats.total}</div>
                    </div>
                </div>

                <div className="stat-card passed">
                    <div className="stat-icon">✓</div>
                    <div className="stat-content">
                        <div className="stat-label">Passed</div>
                        <div className="stat-value">{stats.passed}</div>
                    </div>
                </div>

                <div className="stat-card failed">
                    <div className="stat-icon">✗</div>
                    <div className="stat-content">
                        <div className="stat-label">Failed</div>
                        <div className="stat-value">{stats.failed}</div>
                    </div>
                </div>

                <div className="stat-card average">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <div className="stat-label">Avg Percentage</div>
                        <div className="stat-value">{stats.avgPercentage}%</div>
                    </div>
                </div>

                <div className="stat-card rate">
                    <div className="stat-icon">📉</div>
                    <div className="stat-content">
                        <div className="stat-label">Pass Rate</div>
                        <div className="stat-value">{passRate}%</div>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="🔍 Search by Student ID, Name, or Class..."
                        value={filterStudent}
                        onChange={(e) => setFilterStudent(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="sort-box">
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="date">Sort by Date (Newest)</option>
                        <option value="percentage">Sort by Percentage (Highest)</option>
                        <option value="name">Sort by Student Name</option>
                    </select>
                </div>

                <button 
                    onClick={fetchMockTestResults}
                    className="refresh-btn"
                >
                    🔄 Refresh
                </button>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading mock test results...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <p>❌ {error}</p>
                    <button onClick={fetchMockTestResults} className="retry-btn">
                        Try Again
                    </button>
                </div>
            ) : sortedResults.length === 0 ? (
                <div className="empty-state">
                    <p>📭 No mock test results found</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Medium</th>
                                <th>Total Q</th>
                                <th>Correct</th>
                                <th>Wrong</th>
                                <th>Skipped</th>
                                <th>Percentage</th>
                                <th>Status</th>
                                <th>Time Taken</th>
                                <th>Attempt</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedResults.map((result) => (
                                <tr key={result._id} className={result.passed ? 'row-passed' : 'row-failed'}>
                                    <td className="student-id">
                                        <span className="id-badge">{result.studentId}</span>
                                    </td>
                                    <td className="student-name">{result.studentName}</td>
                                    <td className="student-class">{result.std}</td>
                                    <td className="student-medium">
                                        <span className={`medium-badge ${result.medium.toLowerCase()}`}>
                                            {result.medium}
                                        </span>
                                    </td>
                                    <td className="text-center">{result.totalQuestions}</td>
                                    <td className="correct-answers">
                                        <span className="answer-badge correct">{result.correctAnswers}</span>
                                    </td>
                                    <td className="wrong-answers">
                                        <span className="answer-badge wrong">{result.wrongAnswers}</span>
                                    </td>
                                    <td className="skipped-answers">
                                        <span className="answer-badge skipped">{result.skippedAnswers || 0}</span>
                                    </td>
                                    <td className="percentage">
                                        <div className="percentage-bar">
                                            <div 
                                                className="percentage-fill"
                                                style={{
                                                    width: `${result.percentage}%`,
                                                    backgroundColor: getPercentageColor(result.percentage)
                                                }}
                                            >
                                                <span className="percentage-text">{result.percentage.toFixed(2)}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="status">
                                        {getPassStatus(result.passed, result.percentage)}
                                    </td>
                                    <td className="time-taken">
                                        {result.timeTaken ? `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s` : 'N/A'}
                                    </td>
                                    <td className="text-center attempt-number">
                                        <span className="attempt-badge">{result.attemptNumber || 1}</span>
                                    </td>
                                    <td className="date-time">
                                        <span className="date-text">{formatDate(result.createdAt)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && sortedResults.length > 0 && (
                <div className="results-info">
                    <p>Showing <strong>{sortedResults.length}</strong> of <strong>{mockTestResults.length}</strong> results</p>
                </div>
            )}
        </div>
    );
}