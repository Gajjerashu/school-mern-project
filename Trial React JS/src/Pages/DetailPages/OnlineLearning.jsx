// src/pages/OnlineLearning.jsx
import React, { useState } from 'react';
import './OnlineLearning.css';

const OnlineLearning = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const [selectedCourse, setSelectedCourse] = useState(null);

    const stats = [
        { icon: '📚', value: '150+', label: 'Courses' },
        { icon: '🎥', value: '2,500+', label: 'Video Lectures' },
        { icon: '📝', value: '1,000+', label: 'Assignments' },
        { icon: '👨‍🎓', value: '5,000+', label: 'Students' }
    ];

    const courses = [
        {
            id: 1,
            title: 'Mathematics - Class 10',
            instructor: 'Dr. Rajesh Patel',
            students: 450,
            lectures: 45,
            assignments: 15,
            duration: '6 months',
            progress: 65,
            thumbnail: '📐',
            level: 'Intermediate',
            rating: 4.8,
            description: 'Complete mathematics course covering CBSE syllabus'
        },
        {
            id: 2,
            title: 'Physics - Class 11',
            instructor: 'Prof. Meera Shah',
            students: 380,
            lectures: 52,
            assignments: 20,
            duration: '8 months',
            progress: 45,
            thumbnail: '⚛️',
            level: 'Advanced',
            rating: 4.9,
            description: 'Comprehensive physics with practical demonstrations'
        },
        {
            id: 3,
            title: 'Chemistry - Class 12',
            instructor: 'Dr. Amit Kumar',
            students: 420,
            lectures: 48,
            assignments: 18,
            duration: '7 months',
            progress: 80,
            thumbnail: '🧪',
            level: 'Advanced',
            rating: 4.7,
            description: 'Detailed chemistry course with lab simulations'
        },
        {
            id: 4,
            title: 'English Literature',
            instructor: 'Ms. Priya Desai',
            students: 520,
            lectures: 40,
            assignments: 12,
            duration: '5 months',
            progress: 30,
            thumbnail: '📖',
            level: 'Beginner',
            rating: 4.6,
            description: 'Explore classic and modern literature'
        },
        {
            id: 5,
            title: 'Computer Science',
            instructor: 'Prof. Vikram Singh',
            students: 600,
            lectures: 60,
            assignments: 25,
            duration: '9 months',
            progress: 55,
            thumbnail: '💻',
            level: 'Intermediate',
            rating: 4.9,
            description: 'Programming, algorithms, and data structures'
        },
        {
            id: 6,
            title: 'Biology - Class 11',
            instructor: 'Dr. Anjali Mehta',
            students: 390,
            lectures: 50,
            assignments: 16,
            duration: '7 months',
            progress: 70,
            thumbnail: '🔬',
            level: 'Intermediate',
            rating: 4.8,
            description: 'Life sciences with 3D animations'
        }
    ];

    const recentLectures = [
        {
            id: 1,
            course: 'Mathematics - Class 10',
            title: 'Quadratic Equations - Part 2',
            instructor: 'Dr. Rajesh Patel',
            duration: '45 mins',
            views: 1250,
            uploadDate: '2 days ago',
            thumbnail: '📐'
        },
        {
            id: 2,
            course: 'Physics - Class 11',
            title: 'Laws of Motion',
            instructor: 'Prof. Meera Shah',
            duration: '52 mins',
            views: 980,
            uploadDate: '1 day ago',
            thumbnail: '⚛️'
        },
        {
            id: 3,
            course: 'Chemistry - Class 12',
            title: 'Chemical Bonding',
            instructor: 'Dr. Amit Kumar',
            duration: '48 mins',
            views: 1120,
            uploadDate: '3 days ago',
            thumbnail: '🧪'
        },
        {
            id: 4,
            course: 'Computer Science',
            title: 'Data Structures - Arrays',
            instructor: 'Prof. Vikram Singh',
            duration: '55 mins',
            views: 1450,
            uploadDate: 'Today',
            thumbnail: '💻'
        }
    ];

    const assignments = [
        {
            id: 1,
            course: 'Mathematics - Class 10',
            title: 'Algebra Practice Problems',
            dueDate: 'Dec 28, 2024',
            status: 'pending',
            questions: 15,
            marks: 50
        },
        {
            id: 2,
            course: 'Physics - Class 11',
            title: 'Mechanics Assignment',
            dueDate: 'Dec 25, 2024',
            status: 'submitted',
            questions: 10,
            marks: 40
        },
        {
            id: 3,
            course: 'Chemistry - Class 12',
            title: 'Organic Chemistry Test',
            dueDate: 'Dec 30, 2024',
            status: 'pending',
            questions: 20,
            marks: 60
        },
        {
            id: 4,
            course: 'English Literature',
            title: 'Essay Writing',
            dueDate: 'Dec 26, 2024',
            status: 'graded',
            questions: 1,
            marks: 30,
            obtained: 27
        }
    ];

    const features = [
        { icon: '🎥', title: 'HD Video Lectures', desc: 'Crystal clear recorded lectures' },
        { icon: '📱', title: 'Mobile Learning', desc: 'Learn anytime, anywhere' },
        { icon: '📝', title: 'Interactive Assignments', desc: 'Practice with instant feedback' },
        { icon: '💬', title: 'Discussion Forums', desc: 'Connect with peers and teachers' },
        { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your learning journey' },
        { icon: '🏆', title: 'Certificates', desc: 'Earn certificates on completion' }
    ];

    return (
        <div className="online-learning-page">
            <div className="online-learning-container">
                {/* Header */}
                <div className="online-learning-header">
                    <div className="school-badge">
                        <h1>InspireEdge School</h1>
                    </div>
                    <h2>Online Learning Platform</h2>
                    <p>ઓનલાઈન શિક્ષણ - LMS platform with recorded lectures and assignments 🌿</p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Login Portal Banner */}
                <div className="portal-banner">
                    <div className="portal-content">
                        <div className="portal-icon">🎓</div>
                        <div className="portal-text">
                            <h3>Access Your Learning Portal</h3>
                            <p>Login to continue your courses and track progress</p>
                        </div>
                    </div>
                    <button className="portal-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        Login to Portal
                    </button>
                </div>

                {/* Features Section */}
                <div className="features-section">
                    <h3 className="section-title">Platform Features</h3>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h4>{feature.title}</h4>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="tabs-navigation">
                    <button
                        className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        My Courses
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'lectures' ? 'active' : ''}`}
                        onClick={() => setActiveTab('lectures')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Recent Lectures
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('assignments')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Assignments
                    </button>
                </div>

                {/* My Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="courses-content">
                        <div className="courses-grid">
                            {courses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className="course-card"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="course-thumbnail">{course.thumbnail}</div>
                                    <div className="course-content">
                                        <div className="course-header">
                                            <h4>{course.title}</h4>
                                            <span className="level-badge">{course.level}</span>
                                        </div>
                                        <p className="instructor">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            {course.instructor}
                                        </p>
                                        <p className="description">{course.description}</p>

                                        <div className="course-stats">
                                            <div className="stat-item">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                                {course.lectures} lectures
                                            </div>
                                            <div className="stat-item">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                                {course.assignments} assignments
                                            </div>
                                            <div className="stat-item">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                {course.rating}
                                            </div>
                                        </div>

                                        <div className="progress-section">
                                            <div className="progress-header">
                                                <span>Progress</span>
                                                <span className="progress-value">{course.progress}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>

                                        <button className="continue-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                            </svg>
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Lectures Tab */}
                {activeTab === 'lectures' && (
                    <div className="lectures-content">
                        <div className="lectures-list">
                            {recentLectures.map((lecture, index) => (
                                <div
                                    key={lecture.id}
                                    className="lecture-card"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="lecture-thumbnail">{lecture.thumbnail}</div>
                                    <div className="lecture-details">
                                        <span className="course-name">{lecture.course}</span>
                                        <h4>{lecture.title}</h4>
                                        <p className="instructor">{lecture.instructor}</p>
                                        <div className="lecture-meta">
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                                {lecture.duration}
                                            </span>
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                                {lecture.views} views
                                            </span>
                                            <span className="upload-date">{lecture.uploadDate}</span>
                                        </div>
                                    </div>
                                    <button className="play-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        Watch Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Assignments Tab */}
                {activeTab === 'assignments' && (
                    <div className="assignments-content">
                        <div className="assignments-grid">
                            {assignments.map((assignment, index) => (
                                <div
                                    key={assignment.id}
                                    className="assignment-card"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className={`assignment-status status-${assignment.status}`}>
                                        {assignment.status === 'pending' && '⏳ Pending'}
                                        {assignment.status === 'submitted' && '✅ Submitted'}
                                        {assignment.status === 'graded' && '🎯 Graded'}
                                    </div>
                                    <h4>{assignment.title}</h4>
                                    <p className="course-name">{assignment.course}</p>
                                    <div className="assignment-details">
                                        <div className="detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                            Due: {assignment.dueDate}
                                        </div>
                                        <div className="detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                            </svg>
                                            {assignment.questions} Questions
                                        </div>
                                        <div className="detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            {assignment.marks} Marks
                                        </div>
                                    </div>
                                    {assignment.status === 'graded' && (
                                        <div className="grade-info">
                                            Score: {assignment.obtained}/{assignment.marks}
                                        </div>
                                    )}
                                    <button className={`assignment-btn ${assignment.status}`}>
                                        {assignment.status === 'pending' && 'Start Assignment'}
                                        {assignment.status === 'submitted' && 'View Submission'}
                                        {assignment.status === 'graded' && 'View Results'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="online-learning-footer">
                    <p>© 2025 InspireEdge School | તમારા વિકાસ માટે પ્રતિબદ્ધ 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default OnlineLearning;