import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calendar, Clock, FileText, CheckCircle, AlertCircle, Download, Upload, User, Award, TrendingUp, Filter } from 'lucide-react';
import './AssignmentTracker.css';

const AssignmentTracker = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [filterStatus, setFilterStatus] = useState('all');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const assignments = [
        {
            id: 'assign1',
            subject: 'Mathematics',
            title: 'Quadratic Equations - Problem Set',
            description: 'Solve all problems from Chapter 4, Exercise 4.2. Show complete working.',
            dueDate: '2025-12-10',
            dueTime: '11:59 PM',
            assignedDate: '2025-12-05',
            totalMarks: 50,
            status: 'pending',
            priority: 'high',
            attachments: ['worksheet.pdf', 'reference_notes.pdf'],
            submittedDate: null,
            grade: null,
            feedback: null,
            teacher: 'Mrs. Priya Mehta'
        },
        {
            id: 'assign2',
            subject: 'Science',
            title: 'Photosynthesis Lab Report',
            description: 'Write a detailed lab report on the photosynthesis experiment conducted in class.',
            dueDate: '2025-12-08',
            dueTime: '05:00 PM',
            assignedDate: '2025-12-01',
            totalMarks: 30,
            status: 'submitted',
            priority: 'medium',
            attachments: ['lab_guidelines.pdf'],
            submittedDate: '2025-12-07',
            grade: 28,
            feedback: 'Excellent work! Very detailed observations.',
            teacher: 'Mr. Rajesh Kumar'
        },
        {
            id: 'assign3',
            subject: 'English',
            title: 'Essay - My Future Goals',
            description: 'Write a 500-word essay about your future aspirations and career goals.',
            dueDate: '2025-12-15',
            dueTime: '11:59 PM',
            assignedDate: '2025-12-05',
            totalMarks: 40,
            status: 'pending',
            priority: 'medium',
            attachments: ['essay_format.pdf'],
            submittedDate: null,
            grade: null,
            feedback: null,
            teacher: 'Mrs. Anjali Shah'
        },
        {
            id: 'assign4',
            subject: 'Social Studies',
            title: 'Indian Independence Movement',
            description: 'Prepare a presentation on key events of Indian Independence Movement.',
            dueDate: '2025-12-05',
            dueTime: '11:59 PM',
            assignedDate: '2025-11-28',
            totalMarks: 35,
            status: 'overdue',
            priority: 'high',
            attachments: ['topic_outline.pdf'],
            submittedDate: null,
            grade: null,
            feedback: null,
            teacher: 'Mr. Vikram Desai'
        },
        {
            id: 'assign5',
            subject: 'Hindi',
            title: 'कहानी लेखन - मेरा विद्यालय',
            description: 'अपने विद्यालय के बारे में एक रोचक कहानी लिखें।',
            dueDate: '2025-12-12',
            dueTime: '11:59 PM',
            assignedDate: '2025-12-03',
            totalMarks: 25,
            status: 'pending',
            priority: 'low',
            attachments: [],
            submittedDate: null,
            grade: null,
            feedback: null,
            teacher: 'Mrs. Kavita Joshi'
        },
        {
            id: 'assign6',
            subject: 'Computer Science',
            title: 'Python Programming - Loops Assignment',
            description: 'Complete all coding exercises on loops and implement 3 programs.',
            dueDate: '2025-12-06',
            dueTime: '11:59 PM',
            assignedDate: '2025-12-01',
            totalMarks: 45,
            status: 'submitted',
            priority: 'high',
            attachments: ['coding_problems.pdf'],
            submittedDate: '2025-12-05',
            grade: 42,
            feedback: 'Great coding! Minor optimization needed in loop 3.',
            teacher: 'Mr. Amit Patel'
        }
    ];

    const currentStudent = students.find(s => s.id === selectedStudent);

    const filteredAssignments = filterStatus === 'all'
        ? assignments
        : assignments.filter(a => a.status === filterStatus);

    const stats = {
        total: assignments.length,
        pending: assignments.filter(a => a.status === 'pending').length,
        submitted: assignments.filter(a => a.status === 'submitted').length,
        overdue: assignments.filter(a => a.status === 'overdue').length,
        averageGrade: Math.round(
            assignments
                .filter(a => a.grade !== null)
                .reduce((sum, a) => sum + (a.grade / a.totalMarks * 100), 0) /
            assignments.filter(a => a.grade !== null).length
        )
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': '#f39c12',
            'submitted': '#27ae60',
            'overdue': '#e74c3c',
            'graded': '#3498db'
        };
        return colors[status] || '#95a5a6';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'high': '#e74c3c',
            'medium': '#f39c12',
            'low': '#3498db'
        };
        return colors[priority] || '#95a5a6';
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
                        <div className="assignment-header-emoji">📚</div>
                        <h1 className="assignment-header-title">Assignments & Homework</h1>
                        <p className="assignment-header-subtitle">
                            Track Assignments • Submit Work • Check Grades • Download Materials
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
                                {student.name} - Grade {student.grade} - Roll No: {student.rollNo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="assignment-stats-grid">
                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#27ae60' }}>
                            <BookOpen size={40} />
                        </div>
                        <div className="assignment-stat-number">{stats.total}</div>
                        <p className="assignment-stat-label">Total Assignments</p>
                    </div>

                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#f39c12' }}>
                            <Clock size={40} />
                        </div>
                        <div className="assignment-stat-number">{stats.pending}</div>
                        <p className="assignment-stat-label">Pending</p>
                    </div>

                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#2ecc71' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div className="assignment-stat-number">{stats.submitted}</div>
                        <p className="assignment-stat-label">Submitted</p>
                    </div>

                    <div className="assignment-stat-card">
                        <div className="assignment-stat-icon" style={{ color: '#1b5e20' }}>
                            <Award size={40} />
                        </div>
                        <div className="assignment-stat-number">{stats.averageGrade}%</div>
                        <p className="assignment-stat-label">Average Grade</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="assignment-filter-section">
                    <div className="filter-header">
                        <Filter size={24} />
                        <span>Filter Assignments</span>
                    </div>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({assignments.length})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('pending')}
                        >
                            Pending ({stats.pending})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'submitted' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('submitted')}
                        >
                            Submitted ({stats.submitted})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'overdue' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('overdue')}
                        >
                            Overdue ({stats.overdue})
                        </button>
                    </div>
                </div>

                {/* Assignments List */}
                <div className="assignment-list-section">
                    <h2 className="section-title">
                        <FileText size={28} />
                        Assignment Details
                    </h2>

                    <div className="assignments-grid">
                        {filteredAssignments.map(assignment => {
                            const daysLeft = getDaysRemaining(assignment.dueDate);
                            return (
                                <div key={assignment.id} className="assignment-card">
                                    <div className="assignment-card-header">
                                        <div className="assignment-subject-badge" style={{ background: getStatusColor(assignment.status) }}>
                                            {assignment.subject}
                                        </div>
                                        <div className="assignment-priority-badge" style={{ borderColor: getPriorityColor(assignment.priority) }}>
                                            {assignment.priority.toUpperCase()}
                                        </div>
                                    </div>

                                    <h3 className="assignment-title">{assignment.title}</h3>
                                    <p className="assignment-description">{assignment.description}</p>

                                    <div className="assignment-meta">
                                        <div className="meta-item">
                                            <User size={16} />
                                            <span>{assignment.teacher}</span>
                                        </div>
                                        <div className="meta-item">
                                            <Calendar size={16} />
                                            <span>Due: {assignment.dueDate}</span>
                                        </div>
                                        <div className="meta-item">
                                            <Clock size={16} />
                                            <span>{assignment.dueTime}</span>
                                        </div>
                                        <div className="meta-item">
                                            <Award size={16} />
                                            <span>{assignment.totalMarks} Marks</span>
                                        </div>
                                    </div>

                                    {assignment.status === 'pending' && (
                                        <div className="assignment-due-alert" style={{
                                            background: daysLeft <= 2 ? '#fee2e2' : '#fef3c7',
                                            color: daysLeft <= 2 ? '#991b1b' : '#92400e'
                                        }}>
                                            <AlertCircle size={18} />
                                            <span>
                                                {daysLeft < 0 ? 'Overdue!' :
                                                    daysLeft === 0 ? 'Due Today!' :
                                                        daysLeft === 1 ? 'Due Tomorrow!' :
                                                            `${daysLeft} days remaining`}
                                            </span>
                                        </div>
                                    )}

                                    {assignment.status === 'submitted' && assignment.grade && (
                                        <div className="assignment-grade-section">
                                            <div className="grade-display">
                                                <TrendingUp size={20} />
                                                <span className="grade-score">{assignment.grade}/{assignment.totalMarks}</span>
                                                <span className="grade-percentage">
                                                    ({Math.round(assignment.grade / assignment.totalMarks * 100)}%)
                                                </span>
                                            </div>
                                            {assignment.feedback && (
                                                <p className="grade-feedback">
                                                    <strong>Feedback:</strong> {assignment.feedback}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {assignment.attachments.length > 0 && (
                                        <div className="assignment-attachments">
                                            <p className="attachments-label">Attachments:</p>
                                            <div className="attachments-list">
                                                {assignment.attachments.map((file, idx) => (
                                                    <button key={idx} className="attachment-button">
                                                        <Download size={16} />
                                                        {file}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="assignment-actions">
                                        {assignment.status === 'pending' && (
                                            <button className="action-btn submit-btn">
                                                <Upload size={18} />
                                                Submit Assignment
                                            </button>
                                        )}
                                        {assignment.status === 'submitted' && (
                                            <div className="submitted-info">
                                                <CheckCircle size={18} color="#27ae60" />
                                                <span>Submitted on {assignment.submittedDate}</span>
                                            </div>
                                        )}
                                        {assignment.status === 'overdue' && (
                                            <button className="action-btn overdue-btn">
                                                <AlertCircle size={18} />
                                                Submit Late
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="assignment-cta-section">
                    <div className="assignment-cta-decorative"></div>
                    <h2>Need Help with Assignments?</h2>
                    <p>Contact your teachers or visit the help center for guidance</p>
                    <div className="assignment-cta-buttons">
                        <button className="assignment-cta-button-primary">
                            <User size={18} />
                            Contact Teacher
                        </button>
                        <button className="assignment-cta-button-secondary">
                            <BookOpen size={18} />
                            Visit Help Center
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentTracker;