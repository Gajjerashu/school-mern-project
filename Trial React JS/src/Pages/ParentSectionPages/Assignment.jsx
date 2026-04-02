import React, { useState } from 'react';
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, Calendar, Upload, Download, MessageSquare, Filter, Eye, Edit } from 'lucide-react';
import './Assignment.css';

const Assignment = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const assignmentsData = {
        student1: {
            assignments: [
                {
                    id: 1,
                    subject: 'Mathematics',
                    title: 'Quadratic Equations Practice',
                    description: 'Solve 20 problems on quadratic equations covering all methods',
                    assignedDate: '2024-11-20',
                    dueDate: '2024-11-27',
                    submissionDate: '2024-11-26',
                    status: 'submitted',
                    score: 45,
                    maxScore: 50,
                    feedback: 'Excellent work! Minor calculation error in question 15.',
                    teacher: 'Dr. Meera Iyer',
                    attachments: ['worksheet.pdf'],
                    priority: 'medium'
                },
                {
                    id: 2,
                    subject: 'Science',
                    title: 'Biology Project - Cell Structure',
                    description: 'Create a detailed report on plant and animal cell structures with diagrams',
                    assignedDate: '2024-11-18',
                    dueDate: '2024-12-05',
                    submissionDate: null,
                    status: 'in-progress',
                    score: null,
                    maxScore: 100,
                    feedback: null,
                    teacher: 'Mrs. Alka Verma',
                    attachments: ['guidelines.pdf', 'rubric.pdf'],
                    priority: 'high'
                },
                {
                    id: 3,
                    subject: 'English',
                    title: 'Essay on Climate Change',
                    description: 'Write a 500-word essay discussing causes and solutions for climate change',
                    assignedDate: '2024-11-15',
                    dueDate: '2024-11-22',
                    submissionDate: '2024-11-22',
                    status: 'graded',
                    score: 82,
                    maxScore: 100,
                    feedback: 'Good arguments. Work on introduction structure.',
                    teacher: 'Mr. Vivek Shah',
                    attachments: [],
                    priority: 'medium'
                },
                {
                    id: 4,
                    subject: 'Social Science',
                    title: 'Map Work - Indian States',
                    description: 'Label all states, capitals, and major rivers on the India map',
                    assignedDate: '2024-11-25',
                    dueDate: '2024-12-02',
                    submissionDate: null,
                    status: 'pending',
                    score: null,
                    maxScore: 50,
                    feedback: null,
                    teacher: 'Ms. Priyanka Joshi',
                    attachments: ['blank_map.pdf'],
                    priority: 'high'
                },
                {
                    id: 5,
                    subject: 'Mathematics',
                    title: 'Geometry Assignment',
                    description: 'Prove 10 theorems related to triangles and circles',
                    assignedDate: '2024-11-10',
                    dueDate: '2024-11-17',
                    submissionDate: '2024-11-18',
                    status: 'late',
                    score: 38,
                    maxScore: 50,
                    feedback: 'Late submission. Content is good but marks deducted.',
                    teacher: 'Dr. Meera Iyer',
                    attachments: [],
                    priority: 'low'
                },
                {
                    id: 6,
                    subject: 'English',
                    title: 'Poetry Analysis',
                    description: 'Analyze the poem "The Road Not Taken" by Robert Frost',
                    assignedDate: '2024-11-28',
                    dueDate: '2024-12-10',
                    submissionDate: null,
                    status: 'pending',
                    score: null,
                    maxScore: 50,
                    feedback: null,
                    teacher: 'Mr. Vivek Shah',
                    attachments: ['poem.pdf'],
                    priority: 'low'
                }
            ],
            stats: {
                total: 6,
                submitted: 2,
                graded: 2,
                pending: 2,
                inProgress: 1,
                late: 1,
                avgScore: 82.5
            }
        }
    };

    const currentData = assignmentsData[selectedStudent];

    const filteredAssignments = selectedFilter === 'all'
        ? currentData.assignments
        : currentData.assignments.filter(a => a.status === selectedFilter);

    const getStatusColor = (status) => {
        const colors = {
            'submitted': '#3498db',
            'graded': '#27ae60',
            'pending': '#f39c12',
            'in-progress': '#9b59b6',
            'late': '#e74c3c'
        };
        return colors[status] || '#95a5a6';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'submitted': return <Upload size={18} />;
            case 'graded': return <CheckCircle size={18} />;
            case 'pending': return <AlertCircle size={18} />;
            case 'in-progress': return <Edit size={18} />;
            case 'late': return <Clock size={18} />;
            default: return <FileText size={18} />;
        }
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'high': '#e74c3c',
            'medium': '#f39c12',
            'low': '#3498db'
        };
        return colors[priority] || '#95a5a6';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getDaysRemaining = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="assignment-page">
            {/* Header */}
            <div className="assignment-header">
                <div className="assignment-header-circle-1"></div>
                <div className="assignment-header-circle-2"></div>

                <div className="assignment-container">
                    <button className="assignment-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="assignment-header-content">
                        <div className="assignment-header-emoji">📝</div>
                        <h1 className="assignment-header-title">Assignment Updates</h1>
                        <p className="assignment-header-subtitle">
                            Track Homework • Submission Status • Due Dates • Teacher Feedback in Real-Time
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="assignment-main-content">
                {/* Student Selector */}
                <div className="assignment-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="assignment-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} (Roll No: {student.rollNo})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="assignment-stats-grid">
                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#27ae60' }}>
                            <FileText size={40} />
                        </div>
                        <div className="assignment-stat-number">{currentData.stats.total}</div>
                        <p className="assignment-stat-label">Total Assignments</p>
                    </div>

                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#3498db' }}>
                            <Upload size={40} />
                        </div>
                        <div className="assignment-stat-number">{currentData.stats.submitted}</div>
                        <p className="assignment-stat-label">Submitted</p>
                    </div>

                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#f39c12' }}>
                            <AlertCircle size={40} />
                        </div>
                        <div className="assignment-stat-number">{currentData.stats.pending}</div>
                        <p className="assignment-stat-label">Pending</p>
                    </div>

                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#2ecc71' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div className="assignment-stat-number">{currentData.stats.avgScore}%</div>
                        <p className="assignment-stat-label">Average Score</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="assignment-filter-section">
                    <div className="assignment-filter-wrapper">
                        <Filter size={20} />
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="assignment-filter-select"
                        >
                            <option value="all">All Assignments</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="submitted">Submitted</option>
                            <option value="graded">Graded</option>
                            <option value="late">Late Submissions</option>
                        </select>
                    </div>

                    <button className="assignment-download-button">
                        <Download size={18} />
                        Download Report
                    </button>
                </div>

                {/* Assignments Grid */}
                <div className="assignment-cards-grid">
                    {filteredAssignments.map((assignment) => (
                        <div key={assignment.id} className="assignment-card">
                            <div className="assignment-card-header">
                                <div className="assignment-card-subject">
                                    <FileText size={20} />
                                    {assignment.subject}
                                </div>
                                <div
                                    className="assignment-priority-badge"
                                    style={{ background: getPriorityColor(assignment.priority) }}
                                >
                                    {assignment.priority}
                                </div>
                            </div>

                            <h3 className="assignment-card-title">{assignment.title}</h3>
                            <p className="assignment-card-description">{assignment.description}</p>

                            <div className="assignment-card-dates">
                                <div className="assignment-date-item">
                                    <Calendar size={16} />
                                    <span>Assigned: {formatDate(assignment.assignedDate)}</span>
                                </div>
                                <div className="assignment-date-item">
                                    <Clock size={16} />
                                    <span>Due: {formatDate(assignment.dueDate)}</span>
                                </div>
                            </div>

                            {assignment.status === 'pending' || assignment.status === 'in-progress' ? (
                                <div className="assignment-days-remaining">
                                    {getDaysRemaining(assignment.dueDate) > 0 ? (
                                        <span className="days-left">
                                            {getDaysRemaining(assignment.dueDate)} days remaining
                                        </span>
                                    ) : (
                                        <span className="days-overdue">
                                            Overdue by {Math.abs(getDaysRemaining(assignment.dueDate))} days
                                        </span>
                                    )}
                                </div>
                            ) : null}

                            <div
                                className="assignment-status-badge"
                                style={{ background: getStatusColor(assignment.status) }}
                            >
                                {getStatusIcon(assignment.status)}
                                <span>{assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1).replace('-', ' ')}</span>
                            </div>

                            {assignment.submissionDate && (
                                <div className="assignment-submission-info">
                                    <span>Submitted on: {formatDate(assignment.submissionDate)}</span>
                                </div>
                            )}

                            {assignment.score !== null && (
                                <div className="assignment-score-section">
                                    <div className="assignment-score">
                                        <span className="score-value">{assignment.score}/{assignment.maxScore}</span>
                                        <span className="score-percentage">
                                            {Math.round((assignment.score / assignment.maxScore) * 100)}%
                                        </span>
                                    </div>
                                    <div className="assignment-progress-bar">
                                        <div
                                            className="assignment-progress-fill"
                                            style={{
                                                width: `${(assignment.score / assignment.maxScore) * 100}%`,
                                                background: (assignment.score / assignment.maxScore) >= 0.9 ? '#27ae60' :
                                                    (assignment.score / assignment.maxScore) >= 0.7 ? '#f39c12' : '#e74c3c'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {assignment.feedback && (
                                <div className="assignment-feedback">
                                    <div className="feedback-header">
                                        <MessageSquare size={16} />
                                        <span>Teacher Feedback</span>
                                    </div>
                                    <p>{assignment.feedback}</p>
                                </div>
                            )}

                            <div className="assignment-card-footer">
                                <span className="assignment-teacher">👨‍🏫 {assignment.teacher}</span>
                                {assignment.attachments.length > 0 && (
                                    <div className="assignment-attachments">
                                        <Download size={14} />
                                        <span>{assignment.attachments.length} file(s)</span>
                                    </div>
                                )}
                            </div>

                            <div className="assignment-card-actions">
                                <button className="assignment-action-button view">
                                    <Eye size={16} />
                                    View Details
                                </button>
                                {(assignment.status === 'pending' || assignment.status === 'in-progress') && (
                                    <button className="assignment-action-button submit">
                                        <Upload size={16} />
                                        Submit Work
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="assignment-summary-section">
                    <h2 className="assignment-summary-title">Assignment Overview</h2>
                    <div className="assignment-summary-content">
                        <div className="assignment-summary-item">
                            <CheckCircle size={32} color="#27ae60" />
                            <div>
                                <p className="assignment-summary-label">Graded Assignments</p>
                                <p className="assignment-summary-value">{currentData.stats.graded}</p>
                            </div>
                        </div>
                        <div className="assignment-summary-item">
                            <Edit size={32} color="#9b59b6" />
                            <div>
                                <p className="assignment-summary-label">In Progress</p>
                                <p className="assignment-summary-value">{currentData.stats.inProgress}</p>
                            </div>
                        </div>
                        <div className="assignment-summary-item">
                            <Clock size={32} color="#e74c3c" />
                            <div>
                                <p className="assignment-summary-label">Late Submissions</p>
                                <p className="assignment-summary-value">{currentData.stats.late}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="assignment-cta-section">
                    <div className="assignment-cta-decorative"></div>
                    <h2>Need Help with Assignments?</h2>
                    <p>Contact teachers for clarification or request deadline extensions</p>
                    <div className="assignment-cta-buttons">
                        <button className="assignment-cta-button-primary">
                            Contact Teacher
                        </button>
                        <button className="assignment-cta-button-secondary">
                            Request Extension
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignment;