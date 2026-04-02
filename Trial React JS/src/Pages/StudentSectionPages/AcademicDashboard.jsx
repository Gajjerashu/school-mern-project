import React, { useState } from 'react';
import { ArrowLeft, BarChart3, BookOpen, Calendar, Award, Target, TrendingUp, FileText, Clock, CheckCircle } from 'lucide-react';
import './AcademicDashboard.css';

const AcademicDashboard = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const dashboardData = {
        student1: {
            overallPerformance: {
                gpa: 3.8,
                percentage: 85,
                rank: 5,
                totalStudents: 120
            },
            subjects: [
                { name: 'Mathematics', grade: 'A', percentage: 92, trend: 'up' },
                { name: 'Science', grade: 'A+', percentage: 96, trend: 'up' },
                { name: 'English', grade: 'B+', percentage: 85, trend: 'stable' },
                { name: 'Social Science', grade: 'A', percentage: 90, trend: 'up' },
                { name: 'Hindi', grade: 'B', percentage: 80, trend: 'down' }
            ],
            recentActivities: [
                { type: 'assignment', title: 'Math Assignment Submitted', date: '2024-11-28', status: 'completed' },
                { type: 'exam', title: 'Science Mid-term', date: '2024-11-25', status: 'graded' },
                { type: 'project', title: 'History Project Due', date: '2024-12-05', status: 'pending' }
            ],
            upcomingEvents: [
                { title: 'Math Unit Test', date: '2024-12-10', type: 'exam' },
                { title: 'Science Fair', date: '2024-12-15', type: 'event' },
                { title: 'Parent-Teacher Meeting', date: '2024-12-20', type: 'meeting' }
            ],
            attendance: {
                present: 92,
                absent: 3,
                late: 2,
                percentage: 94.8
            }
        }
    };

    const currentData = dashboardData[selectedStudent];

    const getTrendIcon = (trend) => {
        if (trend === 'up') return '📈';
        if (trend === 'down') return '📉';
        return '➡️';
    };

    const getGradeColor = (grade) => {
        if (grade.includes('A')) return '#27ae60';
        if (grade.includes('B')) return '#f39c12';
        return '#e74c3c';
    };

    return (
        <div className="academic-dashboard-page">
            {/* Header */}
            <div className="academic-dashboard-header">
                <div className="academic-dashboard-header-circle-1"></div>
                <div className="academic-dashboard-header-circle-2"></div>

                <div className="academic-dashboard-container">
                    <button className="academic-dashboard-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="academic-dashboard-header-content">
                        <div className="academic-dashboard-header-emoji">📊</div>
                        <h1 className="academic-dashboard-header-title">Academic Dashboard</h1>
                        <p className="academic-dashboard-header-subtitle">
                            View Your Grades • GPA • Academic Progress • Class Schedule at a Glance
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="academic-dashboard-main-content">
                {/* Student Selector */}
                <div className="academic-dashboard-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="academic-dashboard-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} (Roll No: {student.rollNo})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Performance Stats */}
                <div className="academic-dashboard-stats-grid">
                    <div className="academic-dashboard-stat-card">
                        <div className="academic-dashboard-stat-icon" style={{ color: '#27ae60' }}>
                            <Award size={40} />
                        </div>
                        <div className="academic-dashboard-stat-number">{currentData.overallPerformance.gpa}</div>
                        <p className="academic-dashboard-stat-label">Overall GPA</p>
                    </div>

                    <div className="academic-dashboard-stat-card">
                        <div className="academic-dashboard-stat-icon" style={{ color: '#2ecc71' }}>
                            <TrendingUp size={40} />
                        </div>
                        <div className="academic-dashboard-stat-number">{currentData.overallPerformance.percentage}%</div>
                        <p className="academic-dashboard-stat-label">Average Score</p>
                    </div>

                    <div className="academic-dashboard-stat-card">
                        <div className="academic-dashboard-stat-icon" style={{ color: '#1b5e20' }}>
                            <Target size={40} />
                        </div>
                        <div className="academic-dashboard-stat-number">#{currentData.overallPerformance.rank}</div>
                        <p className="academic-dashboard-stat-label">Class Rank</p>
                    </div>

                    <div className="academic-dashboard-stat-card">
                        <div className="academic-dashboard-stat-icon" style={{ color: '#145a32' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div className="academic-dashboard-stat-number">{currentData.attendance.percentage}%</div>
                        <p className="academic-dashboard-stat-label">Attendance</p>
                    </div>
                </div>

                {/* Subject Performance */}
                <div className="academic-dashboard-subjects-section">
                    <h2 className="section-title">
                        <BookOpen size={28} />
                        Subject Performance
                    </h2>

                    <div className="subjects-grid">
                        {currentData.subjects.map((subject, index) => (
                            <div key={index} className="subject-card">
                                <div className="subject-header">
                                    <h3>{subject.name}</h3>
                                    <span className="trend-icon">{getTrendIcon(subject.trend)}</span>
                                </div>
                                <div className="subject-grade" style={{ background: getGradeColor(subject.grade) }}>
                                    {subject.grade}
                                </div>
                                <div className="subject-percentage">{subject.percentage}%</div>
                                <div className="subject-progress-bar">
                                    <div
                                        className="subject-progress-fill"
                                        style={{
                                            width: `${subject.percentage}%`,
                                            background: getGradeColor(subject.grade)
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="academic-dashboard-activities-section">
                    <h2 className="section-title">
                        <Clock size={28} />
                        Recent Activities
                    </h2>

                    <div className="activities-list">
                        {currentData.recentActivities.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-icon">
                                    {activity.type === 'assignment' && <FileText size={24} color="#27ae60" />}
                                    {activity.type === 'exam' && <Award size={24} color="#2ecc71" />}
                                    {activity.type === 'project' && <BookOpen size={24} color="#1b5e20" />}
                                </div>
                                <div className="activity-content">
                                    <h4>{activity.title}</h4>
                                    <p className="activity-date">{activity.date}</p>
                                </div>
                                <span className={`activity-status ${activity.status}`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="academic-dashboard-events-section">
                    <h2 className="section-title">
                        <Calendar size={28} />
                        Upcoming Events
                    </h2>

                    <div className="events-grid">
                        {currentData.upcomingEvents.map((event, index) => (
                            <div key={index} className="event-card">
                                <div className="event-date">
                                    <Calendar size={20} />
                                    <span>{event.date}</span>
                                </div>
                                <h4>{event.title}</h4>
                                <span className={`event-type ${event.type}`}>
                                    {event.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attendance Summary */}
                <div className="academic-dashboard-attendance-summary">
                    <h2 className="section-title">Attendance Summary</h2>
                    <div className="attendance-stats">
                        <div className="attendance-stat">
                            <CheckCircle size={32} color="#27ae60" />
                            <div>
                                <span className="stat-number">{currentData.attendance.present}</span>
                                <span className="stat-label">Present</span>
                            </div>
                        </div>
                        <div className="attendance-stat">
                            <Clock size={32} color="#f39c12" />
                            <div>
                                <span className="stat-number">{currentData.attendance.late}</span>
                                <span className="stat-label">Late</span>
                            </div>
                        </div>
                        <div className="attendance-stat">
                            <Target size={32} color="#e74c3c" />
                            <div>
                                <span className="stat-number">{currentData.attendance.absent}</span>
                                <span className="stat-label">Absent</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="academic-dashboard-cta-section">
                    <div className="academic-dashboard-cta-decorative"></div>
                    <h2>Need Academic Support?</h2>
                    <p>Connect with teachers or counselors for personalized guidance</p>
                    <div className="academic-dashboard-cta-buttons">
                        <button className="academic-dashboard-cta-button-primary">
                            <BookOpen size={18} />
                            View Full Report
                        </button>
                        <button className="academic-dashboard-cta-button-secondary">
                            <Award size={18} />
                            Download Certificate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicDashboard;