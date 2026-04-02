import React, { useState } from 'react';
import { ArrowLeft, BookOpen, TrendingUp, Award, Calendar, FileText, BarChart3, Download, Filter, Search } from 'lucide-react';
import './Grades.css';

const Grades = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedSubject, setSelectedSubject] = useState('all');

    // Student Data
    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    // Grades Data for Student 1
    const gradesData = {
        student1: {
            subjects: [
                {
                    name: 'Mathematics',
                    teacher: 'Dr. Meera Iyer',
                    currentGrade: 'A',
                    percentage: 92,
                    assignments: [
                        { name: 'Algebra Test', score: 95, maxScore: 100, date: '2024-11-15', status: 'graded' },
                        { name: 'Geometry Assignment', score: 88, maxScore: 100, date: '2024-11-20', status: 'graded' },
                        { name: 'Calculus Quiz', score: 45, maxScore: 50, date: '2024-11-25', status: 'graded' },
                    ],
                    attendance: 95
                },
                {
                    name: 'Science',
                    teacher: 'Mrs. Alka Verma',
                    currentGrade: 'A+',
                    percentage: 96,
                    assignments: [
                        { name: 'Physics Practical', score: 48, maxScore: 50, date: '2024-11-10', status: 'graded' },
                        { name: 'Chemistry Test', score: 94, maxScore: 100, date: '2024-11-18', status: 'graded' },
                        { name: 'Biology Project', score: 0, maxScore: 100, date: '2024-12-01', status: 'pending' },
                    ],
                    attendance: 98
                },
                {
                    name: 'English',
                    teacher: 'Mr. Vivek Shah',
                    currentGrade: 'B+',
                    percentage: 85,
                    assignments: [
                        { name: 'Essay Writing', score: 82, maxScore: 100, date: '2024-11-12', status: 'graded' },
                        { name: 'Literature Analysis', score: 88, maxScore: 100, date: '2024-11-22', status: 'graded' },
                        { name: 'Grammar Test', score: 85, maxScore: 100, date: '2024-11-28', status: 'graded' },
                    ],
                    attendance: 92
                },
                {
                    name: 'Social Science',
                    teacher: 'Ms. Priyanka Joshi',
                    currentGrade: 'A',
                    percentage: 90,
                    assignments: [
                        { name: 'History Project', score: 92, maxScore: 100, date: '2024-11-08', status: 'graded' },
                        { name: 'Geography Map Work', score: 88, maxScore: 100, date: '2024-11-16', status: 'graded' },
                        { name: 'Civics Assignment', score: 0, maxScore: 100, date: '2024-12-05', status: 'pending' },
                    ],
                    attendance: 94
                }
            ],
            overallStats: {
                gpa: 3.8,
                totalAttendance: 95,
                completedAssignments: 35,
                pendingAssignments: 5,
                rank: 5
            }
        }
    };

    const currentData = gradesData[selectedStudent];
    const filteredSubjects = selectedSubject === 'all'
        ? currentData.subjects
        : currentData.subjects.filter(s => s.name.toLowerCase() === selectedSubject);

    const getGradeColor = (grade) => {
        const colors = {
            'A+': '#27ae60', 'A': '#2ecc71', 'B+': '#f39c12',
            'B': '#e67e22', 'C': '#e74c3c', 'D': '#c0392b'
        };
        return colors[grade] || '#95a5a6';
    };

    const getStatusColor = (status) => {
        return status === 'graded' ? '#27ae60' : '#f39c12';
    };

    return (
        <div className="grades-page">
            {/* Header */}
            <div className="grades-header">
                <div className="grades-header-circle-1"></div>
                <div className="grades-header-circle-2"></div>

                <div className="grades-container">
                    <button className="grades-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="grades-header-content">
                        <div className="grades-header-emoji">📊</div>
                        <h1 className="grades-header-title">Real-Time Grades</h1>
                        <p className="grades-header-subtitle">
                            Track Your Child's Academic Progress • Live Updates • Detailed Reports
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grades-main-content">
                {/* Student Selector */}
                <div className="grades-student-selector">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="grades-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} (Roll No: {student.rollNo})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Overall Stats */}
                <div className="grades-stats-grid">
                    <div className="grades-stat-card">
                        <div className="grades-stat-icon" style={{ color: '#27ae60' }}>
                            <Award size={40} />
                        </div>
                        <div className="grades-stat-number">{currentData.overallStats.gpa}</div>
                        <p className="grades-stat-label">Overall GPA</p>
                    </div>

                    <div className="grades-stat-card">
                        <div className="grades-stat-icon" style={{ color: '#2ecc71' }}>
                            <TrendingUp size={40} />
                        </div>
                        <div className="grades-stat-number">{currentData.overallStats.totalAttendance}%</div>
                        <p className="grades-stat-label">Attendance</p>
                    </div>

                    <div className="grades-stat-card">
                        <div className="grades-stat-icon" style={{ color: '#1b5e20' }}>
                            <FileText size={40} />
                        </div>
                        <div className="grades-stat-number">{currentData.overallStats.completedAssignments}</div>
                        <p className="grades-stat-label">Completed</p>
                    </div>

                    <div className="grades-stat-card">
                        <div className="grades-stat-icon" style={{ color: '#145a32' }}>
                            <BarChart3 size={40} />
                        </div>
                        <div className="grades-stat-number">#{currentData.overallStats.rank}</div>
                        <p className="grades-stat-label">Class Rank</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="grades-filter-section">
                    <div className="grades-filter-wrapper">
                        <Filter size={20} />
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="grades-filter-select"
                        >
                            <option value="all">All Subjects</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="english">English</option>
                            <option value="social science">Social Science</option>
                        </select>
                    </div>

                    <button className="grades-download-button">
                        <Download size={18} />
                        Download Report
                    </button>
                </div>

                {/* Subjects Grid */}
                <div className="grades-subjects-grid">
                    {filteredSubjects.map((subject, index) => (
                        <div key={index} className="grades-subject-card">
                            <div className="grades-subject-header">
                                <div>
                                    <h3 className="grades-subject-name">{subject.name}</h3>
                                    <p className="grades-subject-teacher">Teacher: {subject.teacher}</p>
                                </div>
                                <div
                                    className="grades-subject-grade"
                                    style={{ background: getGradeColor(subject.currentGrade) }}
                                >
                                    {subject.currentGrade}
                                </div>
                            </div>

                            <div className="grades-subject-stats">
                                <div className="grades-subject-stat">
                                    <span className="grades-stat-label-small">Percentage</span>
                                    <span className="grades-stat-value">{subject.percentage}%</span>
                                </div>
                                <div className="grades-subject-stat">
                                    <span className="grades-stat-label-small">Attendance</span>
                                    <span className="grades-stat-value">{subject.attendance}%</span>
                                </div>
                            </div>

                            <div className="grades-progress-bar">
                                <div
                                    className="grades-progress-fill"
                                    style={{ width: `${subject.percentage}%` }}
                                ></div>
                            </div>

                            <div className="grades-assignments-section">
                                <h4 className="grades-assignments-title">Recent Assignments</h4>
                                {subject.assignments.map((assignment, idx) => (
                                    <div key={idx} className="grades-assignment-item">
                                        <div className="grades-assignment-info">
                                            <span className="grades-assignment-name">{assignment.name}</span>
                                            <span className="grades-assignment-date">
                                                <Calendar size={14} />
                                                {assignment.date}
                                            </span>
                                        </div>
                                        <div className="grades-assignment-score">
                                            {assignment.status === 'graded' ? (
                                                <>
                                                    <span className="grades-score-value">
                                                        {assignment.score}/{assignment.maxScore}
                                                    </span>
                                                    <span
                                                        className="grades-score-percentage"
                                                        style={{ color: getGradeColor(assignment.score >= 90 ? 'A' : assignment.score >= 80 ? 'B+' : 'C') }}
                                                    >
                                                        {Math.round((assignment.score / assignment.maxScore) * 100)}%
                                                    </span>
                                                </>
                                            ) : (
                                                <span
                                                    className="grades-status-badge"
                                                    style={{ background: getStatusColor(assignment.status) }}
                                                >
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="grades-summary-section">
                    <h2 className="grades-summary-title">Academic Summary</h2>
                    <div className="grades-summary-content">
                        <div className="grades-summary-item">
                            <BookOpen size={24} color="#27ae60" />
                            <div>
                                <p className="grades-summary-label">Total Subjects</p>
                                <p className="grades-summary-value">{currentData.subjects.length}</p>
                            </div>
                        </div>
                        <div className="grades-summary-item">
                            <FileText size={24} color="#2ecc71" />
                            <div>
                                <p className="grades-summary-label">Assignments Completed</p>
                                <p className="grades-summary-value">{currentData.overallStats.completedAssignments}/{currentData.overallStats.completedAssignments + currentData.overallStats.pendingAssignments}</p>
                            </div>
                        </div>
                        <div className="grades-summary-item">
                            <Award size={24} color="#1b5e20" />
                            <div>
                                <p className="grades-summary-label">Average Grade</p>
                                <p className="grades-summary-value">A</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="grades-cta-section">
                    <div className="grades-cta-decorative"></div>
                    <h2>Need Help Understanding Results?</h2>
                    <p>Schedule a meeting with teachers to discuss your child's progress</p>
                    <div className="grades-cta-buttons">
                        <button className="grades-cta-button-primary">
                            Schedule Meeting
                        </button>
                        <button className="grades-cta-button-secondary">
                            Contact Teacher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grades;