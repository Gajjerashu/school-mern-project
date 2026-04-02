// src/pages/ComputerLabs.jsx
import React, { useState } from 'react';
import './ComputerLabs.css';

const ComputerLabs = () => {
    const [activeTab, setActiveTab] = useState('specs');

    const specs = [
        {
            category: 'Hardware',
            items: [
                { icon: '💻', title: '60+ Desktop Computers', desc: 'Latest Intel i7 processors with 16GB RAM' },
                { icon: '🖥️', title: 'High-Resolution Monitors', desc: '24-inch Full HD LED displays' },
                { icon: '⌨️', title: 'Mechanical Keyboards', desc: 'Premium typing experience' },
                { icon: '🖱️', title: 'Optical Mouse', desc: 'High precision gaming mice' },
                { icon: '🖨️', title: 'Laser Printers', desc: 'Color and B&W printing facility' },
                { icon: '📡', title: 'High-Speed Internet', desc: '1 Gbps fiber optic connection' }
            ]
        },
        {
            category: 'Software',
            items: [
                { icon: '🪟', title: 'Windows 11 Pro', desc: 'Latest operating system' },
                { icon: '🐧', title: 'Linux Ubuntu', desc: 'Dual boot configuration' },
                { icon: '💾', title: 'MS Office Suite', desc: 'Word, Excel, PowerPoint, Access' },
                { icon: '🎨', title: 'Adobe Creative Cloud', desc: 'Photoshop, Illustrator, Premiere Pro' },
                { icon: '⚙️', title: 'Programming Tools', desc: 'VS Code, PyCharm, Eclipse, NetBeans' },
                { icon: '🗄️', title: 'Database Systems', desc: 'MySQL, MongoDB, PostgreSQL' }
            ]
        }
    ];

    const courses = [
        {
            id: 1,
            title: 'Basic Computer Skills',
            level: 'Beginner',
            duration: '3 months',
            icon: '🖥️',
            topics: ['Computer Fundamentals', 'MS Office', 'Internet Basics', 'Email Usage'],
            color: '#3b82f6'
        },
        {
            id: 2,
            title: 'Web Development',
            level: 'Intermediate',
            duration: '6 months',
            icon: '🌐',
            topics: ['HTML5 & CSS3', 'JavaScript', 'React.js', 'Node.js'],
            color: '#8b5cf6'
        },
        {
            id: 3,
            title: 'Python Programming',
            level: 'Beginner',
            duration: '4 months',
            icon: '🐍',
            topics: ['Python Basics', 'Data Structures', 'OOP', 'Django Framework'],
            color: '#10b981'
        },
        {
            id: 4,
            title: 'Graphic Design',
            level: 'Intermediate',
            duration: '5 months',
            icon: '🎨',
            topics: ['Photoshop', 'Illustrator', 'Canva', 'Video Editing'],
            color: '#f59e0b'
        },
        {
            id: 5,
            title: 'Data Science',
            level: 'Advanced',
            duration: '8 months',
            icon: '📊',
            topics: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
            color: '#ef4444'
        },
        {
            id: 6,
            title: 'Mobile App Development',
            level: 'Advanced',
            duration: '7 months',
            icon: '📱',
            topics: ['Flutter', 'React Native', 'Firebase', 'API Integration'],
            color: '#06b6d4'
        }
    ];

    const schedule = [
        { day: 'Monday', slots: ['09:00 AM - 11:00 AM', '11:30 AM - 01:30 PM', '02:00 PM - 04:00 PM'] },
        { day: 'Tuesday', slots: ['09:00 AM - 11:00 AM', '11:30 AM - 01:30 PM', '02:00 PM - 04:00 PM'] },
        { day: 'Wednesday', slots: ['09:00 AM - 11:00 AM', '11:30 AM - 01:30 PM', '02:00 PM - 04:00 PM'] },
        { day: 'Thursday', slots: ['09:00 AM - 11:00 AM', '11:30 AM - 01:30 PM', '02:00 PM - 04:00 PM'] },
        { day: 'Friday', slots: ['09:00 AM - 11:00 AM', '11:30 AM - 01:30 PM', '02:00 PM - 04:00 PM'] },
        { day: 'Saturday', slots: ['09:00 AM - 12:00 PM', '12:30 PM - 03:30 PM'] }
    ];

    const stats = [
        { icon: '💻', value: '60+', label: 'Computers' },
        { icon: '🎓', value: '500+', label: 'Students Trained' },
        { icon: '👨‍💻', value: '15+', label: 'Courses' },
        { icon: '⚡', value: '1 Gbps', label: 'Internet Speed' }
    ];

    return (
        <div className="computer-labs-page">
            <div className="computer-labs-container">
                {/* Header */}
                <div className="computer-labs-header">
                    <div className="school-badge">
                        <h1>InspireEdge School</h1>
                    </div>
                    <h2>Computer Labs</h2>
                    <p>કમ્પ્યુટર લેબ - Latest technology with high-speed internet and software 🌿</p>
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

                {/* Tabs Navigation */}
                <div className="tabs-navigation">
                    <button
                        className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('specs')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        Specifications
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        Courses
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
                        onClick={() => setActiveTab('schedule')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Schedule
                    </button>
                </div>

                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                    <div className="specs-content">
                        {specs.map((spec, index) => (
                            <div key={index} className="spec-section">
                                <h3 className="spec-category">{spec.category}</h3>
                                <div className="spec-grid">
                                    {spec.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="spec-card"
                                            style={{ animationDelay: `${idx * 0.05}s` }}
                                        >
                                            <div className="spec-icon">{item.icon}</div>
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* View Specs Button */}
                        <div className="view-specs-section">
                            <button className="view-specs-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                View Complete Specifications
                            </button>
                        </div>
                    </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="courses-content">
                        <div className="courses-grid">
                            {courses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className="course-card"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="course-header" style={{ background: course.color }}>
                                        <div className="course-icon">{course.icon}</div>
                                        <span className="course-level">{course.level}</span>
                                    </div>
                                    <div className="course-body">
                                        <h4>{course.title}</h4>
                                        <div className="course-duration">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="course-topics">
                                            <strong>Topics Covered:</strong>
                                            <ul>
                                                {course.topics.map((topic, idx) => (
                                                    <li key={idx}>{topic}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button className="enroll-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                <polyline points="17 11 19 13 23 9"></polyline>
                                            </svg>
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Schedule Tab */}
                {activeTab === 'schedule' && (
                    <div className="schedule-content">
                        <div className="schedule-header">
                            <h3>Weekly Lab Schedule</h3>
                            <p>Book your slot for computer lab sessions</p>
                        </div>
                        <div className="schedule-grid">
                            {schedule.map((day, index) => (
                                <div
                                    key={index}
                                    className="schedule-card"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="schedule-day">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <h4>{day.day}</h4>
                                    </div>
                                    <div className="time-slots">
                                        {day.slots.map((slot, idx) => (
                                            <button key={idx} className="slot-btn">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="computer-labs-footer">
                    <p>© 2025 InspireEdge School | તમારા વિકાસ માટે પ્રતિબદ્ધ 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default ComputerLabs;