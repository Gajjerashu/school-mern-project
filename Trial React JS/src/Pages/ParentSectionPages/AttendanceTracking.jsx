import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Filter, Download, User } from 'lucide-react';
import './AttendanceTracking.css';

const AttendanceTracking = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedMonth, setSelectedMonth] = useState('november');
    const [selectedView, setSelectedView] = useState('monthly');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const months = [
        { id: 'september', name: 'September 2024' },
        { id: 'october', name: 'October 2024' },
        { id: 'november', name: 'November 2024' },
        { id: 'december', name: 'December 2024' },
    ];

    // Attendance data for November
    const attendanceData = {
        student1: {
            november: {
                totalDays: 24,
                present: 22,
                absent: 1,
                late: 1,
                percentage: 91.67,
                records: [
                    { date: '2024-11-01', status: 'present', timeIn: '08:15 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-02', status: 'present', timeIn: '08:10 AM', timeOut: '03:25 PM' },
                    { date: '2024-11-03', status: 'weekend', timeIn: '-', timeOut: '-' },
                    { date: '2024-11-04', status: 'present', timeIn: '08:20 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-05', status: 'late', timeIn: '09:05 AM', timeOut: '03:30 PM', reason: 'Traffic delay' },
                    { date: '2024-11-06', status: 'present', timeIn: '08:12 AM', timeOut: '03:28 PM' },
                    { date: '2024-11-07', status: 'present', timeIn: '08:18 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-08', status: 'absent', timeIn: '-', timeOut: '-', reason: 'Medical appointment' },
                    { date: '2024-11-09', status: 'present', timeIn: '08:14 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-10', status: 'weekend', timeIn: '-', timeOut: '-' },
                    { date: '2024-11-11', status: 'present', timeIn: '08:16 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-12', status: 'present', timeIn: '08:11 AM', timeOut: '03:26 PM' },
                    { date: '2024-11-13', status: 'present', timeIn: '08:19 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-14', status: 'present', timeIn: '08:13 AM', timeOut: '03:29 PM' },
                    { date: '2024-11-15', status: 'present', timeIn: '08:17 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-16', status: 'present', timeIn: '08:15 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-17', status: 'weekend', timeIn: '-', timeOut: '-' },
                    { date: '2024-11-18', status: 'present', timeIn: '08:12 AM', timeOut: '03:28 PM' },
                    { date: '2024-11-19', status: 'present', timeIn: '08:20 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-20', status: 'present', timeIn: '08:14 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-21', status: 'present', timeIn: '08:16 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-22', status: 'present', timeIn: '08:18 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-23', status: 'present', timeIn: '08:11 AM', timeOut: '03:27 PM' },
                    { date: '2024-11-24', status: 'weekend', timeIn: '-', timeOut: '-' },
                    { date: '2024-11-25', status: 'present', timeIn: '08:15 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-26', status: 'present', timeIn: '08:13 AM', timeOut: '03:29 PM' },
                    { date: '2024-11-27', status: 'present', timeIn: '08:19 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-28', status: 'present', timeIn: '08:12 AM', timeOut: '03:28 PM' },
                    { date: '2024-11-29', status: 'present', timeIn: '08:17 AM', timeOut: '03:30 PM' },
                    { date: '2024-11-30', status: 'present', timeIn: '08:14 AM', timeOut: '03:30 PM' },
                ]
            }
        }
    };

    const currentData = attendanceData[selectedStudent][selectedMonth];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'present': return <CheckCircle size={20} color="#27ae60" />;
            case 'absent': return <XCircle size={20} color="#e74c3c" />;
            case 'late': return <AlertCircle size={20} color="#f39c12" />;
            default: return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'present': return 'status-present';
            case 'absent': return 'status-absent';
            case 'late': return 'status-late';
            case 'weekend': return 'status-weekend';
            default: return '';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="attendance-page">
            {/* Header */}
            <div className="attendance-header">
                <div className="attendance-header-circle-1"></div>
                <div className="attendance-header-circle-2"></div>

                <div className="attendance-container">
                    <button className="attendance-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="attendance-header-content">
                        <div className="attendance-header-emoji">📅</div>
                        <h1 className="attendance-header-title">Attendance Tracking</h1>
                        <p className="attendance-header-subtitle">
                            Monitor Daily Attendance • Late Arrivals • Absences with Detailed Timestamps
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="attendance-main-content">
                {/* Selectors */}
                <div className="attendance-selectors-grid">
                    <div className="attendance-selector-card">
                        <label>Select Student:</label>
                        <select
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            className="attendance-select"
                        >
                            {students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.name} - Grade {student.grade}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="attendance-selector-card">
                        <label>Select Month:</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="attendance-select"
                        >
                            {months.map(month => (
                                <option key={month.id} value={month.id}>
                                    {month.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="attendance-stats-grid">
                    <div className="attendance-stat-card">
                        <div className="attendance-stat-icon" style={{ color: '#27ae60' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div className="attendance-stat-number">{currentData.present}</div>
                        <p className="attendance-stat-label">Present Days</p>
                    </div>

                    <div className="attendance-stat-card">
                        <div className="attendance-stat-icon" style={{ color: '#e74c3c' }}>
                            <XCircle size={40} />
                        </div>
                        <div className="attendance-stat-number">{currentData.absent}</div>
                        <p className="attendance-stat-label">Absent Days</p>
                    </div>

                    <div className="attendance-stat-card">
                        <div className="attendance-stat-icon" style={{ color: '#f39c12' }}>
                            <AlertCircle size={40} />
                        </div>
                        <div className="attendance-stat-number">{currentData.late}</div>
                        <p className="attendance-stat-label">Late Arrivals</p>
                    </div>

                    <div className="attendance-stat-card">
                        <div className="attendance-stat-icon" style={{ color: '#2ecc71' }}>
                            <TrendingUp size={40} />
                        </div>
                        <div className="attendance-stat-number">{currentData.percentage}%</div>
                        <p className="attendance-stat-label">Attendance Rate</p>
                    </div>
                </div>

                {/* Percentage Bar */}
                <div className="attendance-percentage-section">
                    <div className="attendance-percentage-header">
                        <h3>Overall Attendance</h3>
                        <span className="attendance-percentage-value">{currentData.percentage}%</span>
                    </div>
                    <div className="attendance-percentage-bar">
                        <div
                            className="attendance-percentage-fill"
                            style={{ width: `${currentData.percentage}%` }}
                        ></div>
                    </div>
                    <div className="attendance-percentage-info">
                        <span>{currentData.present} Present</span>
                        <span>{currentData.absent} Absent</span>
                        <span>{currentData.late} Late</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="attendance-actions">
                    <button className="attendance-filter-button">
                        <Filter size={18} />
                        Filter Records
                    </button>
                    <button className="attendance-download-button">
                        <Download size={18} />
                        Download Report
                    </button>
                </div>

                {/* Records Table */}
                <div className="attendance-records-section">
                    <h2 className="attendance-section-title">Daily Attendance Records</h2>

                    <div className="attendance-table-wrapper">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Time In</th>
                                    <th>Time Out</th>
                                    <th>Reason/Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.records.map((record, index) => (
                                    <tr key={index} className={getStatusClass(record.status)}>
                                        <td>
                                            <div className="attendance-date-cell">
                                                <Calendar size={16} />
                                                {formatDate(record.date)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`attendance-status-badge ${getStatusClass(record.status)}`}>
                                                {getStatusIcon(record.status)}
                                                <span>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="attendance-time-cell">
                                                {record.timeIn !== '-' && <Clock size={14} />}
                                                {record.timeIn}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="attendance-time-cell">
                                                {record.timeOut !== '-' && <Clock size={14} />}
                                                {record.timeOut}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="attendance-reason">
                                                {record.reason || '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="attendance-summary-section">
                    <h2 className="attendance-summary-title">Monthly Summary</h2>
                    <div className="attendance-summary-grid">
                        <div className="attendance-summary-card">
                            <Calendar size={32} color="#27ae60" />
                            <div>
                                <p className="attendance-summary-label">Total School Days</p>
                                <p className="attendance-summary-value">{currentData.totalDays}</p>
                            </div>
                        </div>
                        <div className="attendance-summary-card">
                            <User size={32} color="#2ecc71" />
                            <div>
                                <p className="attendance-summary-label">Days Attended</p>
                                <p className="attendance-summary-value">{currentData.present + currentData.late}</p>
                            </div>
                        </div>
                        <div className="attendance-summary-card">
                            <TrendingUp size={32} color="#1b5e20" />
                            <div>
                                <p className="attendance-summary-label">Punctuality Rate</p>
                                <p className="attendance-summary-value">
                                    {((currentData.present / currentData.totalDays) * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="attendance-cta-section">
                    <div className="attendance-cta-decorative"></div>
                    <h2>Report an Absence?</h2>
                    <p>Inform the school about upcoming absences or provide reasons for past absences</p>
                    <div className="attendance-cta-buttons">
                        <button className="attendance-cta-button-primary">
                            Report Absence
                        </button>
                        <button className="attendance-cta-button-secondary">
                            Contact Administration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTracking;