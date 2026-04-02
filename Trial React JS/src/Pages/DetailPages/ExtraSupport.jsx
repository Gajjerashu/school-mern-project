// src/pages/ExtraSupport.jsx
import React, { useState } from 'react';
import './ExtraSupport.css';

const ExtraSupport = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        studentName: '',
        studentId: '',
        subject: '',
        topic: '',
        preferredDate: '',
        preferredTime: '',
        sessionType: 'doubt-clearing'
    });

    const stats = [
        { icon: '👨‍🏫', value: '25+', label: 'Expert Tutors' },
        { icon: '📚', value: '500+', label: 'Sessions/Month' },
        { icon: '⏰', value: '2-3 hrs', label: 'Daily Sessions' },
        { icon: '🎯', value: '98%', label: 'Success Rate' }
    ];

    const subjects = [
        {
            id: 1,
            name: 'Mathematics',
            icon: '📐',
            tutors: 5,
            sessions: 120,
            color: '#3b82f6',
            topics: ['Algebra', 'Geometry', 'Calculus', 'Trigonometry', 'Statistics']
        },
        {
            id: 2,
            name: 'Physics',
            icon: '⚛️',
            tutors: 4,
            sessions: 98,
            color: '#8b5cf6',
            topics: ['Mechanics', 'Electricity', 'Optics', 'Thermodynamics', 'Modern Physics']
        },
        {
            id: 3,
            name: 'Chemistry',
            icon: '🧪',
            tutors: 4,
            sessions: 105,
            color: '#10b981',
            topics: ['Organic Chemistry', 'Inorganic', 'Physical Chemistry', 'Practical']
        },
        {
            id: 4,
            name: 'Biology',
            icon: '🔬',
            tutors: 3,
            sessions: 87,
            color: '#f59e0b',
            topics: ['Botany', 'Zoology', 'Genetics', 'Ecology', 'Human Physiology']
        },
        {
            id: 5,
            name: 'English',
            icon: '📖',
            tutors: 4,
            sessions: 92,
            color: '#ef4444',
            topics: ['Grammar', 'Writing', 'Literature', 'Comprehension', 'Speaking']
        },
        {
            id: 6,
            name: 'Computer Science',
            icon: '💻',
            tutors: 3,
            sessions: 76,
            color: '#06b6d4',
            topics: ['Programming', 'Data Structures', 'Algorithms', 'Web Development']
        }
    ];

    const tutors = [
        {
            id: 1,
            name: 'Dr. Rajesh Patel',
            subject: 'Mathematics',
            experience: '15 years',
            rating: 4.9,
            students: 250,
            image: '👨‍🏫',
            specialization: 'Algebra & Calculus'
        },
        {
            id: 2,
            name: 'Prof. Meera Shah',
            subject: 'Physics',
            experience: '12 years',
            rating: 4.8,
            students: 220,
            image: '👩‍🏫',
            specialization: 'Mechanics & Electricity'
        },
        {
            id: 3,
            name: 'Dr. Amit Kumar',
            subject: 'Chemistry',
            experience: '10 years',
            rating: 4.9,
            students: 200,
            image: '👨‍🔬',
            specialization: 'Organic Chemistry'
        },
        {
            id: 4,
            name: 'Ms. Priya Desai',
            subject: 'English',
            experience: '8 years',
            rating: 4.7,
            students: 180,
            image: '👩‍💼',
            specialization: 'Grammar & Literature'
        }
    ];

    const schedule = [
        { day: 'Monday', time: '04:00 PM - 06:00 PM', available: 8, booked: 5 },
        { day: 'Tuesday', time: '04:00 PM - 06:00 PM', available: 8, booked: 6 },
        { day: 'Wednesday', time: '04:00 PM - 06:00 PM', available: 8, booked: 4 },
        { day: 'Thursday', time: '04:00 PM - 06:00 PM', available: 8, booked: 7 },
        { day: 'Friday', time: '04:00 PM - 06:00 PM', available: 8, booked: 5 },
        { day: 'Saturday', time: '10:00 AM - 12:00 PM', available: 10, booked: 8 }
    ];

    const sessionTypes = [
        {
            id: 'doubt-clearing',
            title: 'Doubt Clearing Session',
            icon: '❓',
            duration: '30-45 mins',
            description: 'One-on-one doubt solving with expert tutors',
            features: ['Individual attention', 'Concept clarification', 'Practice problems']
        },
        {
            id: 'group-tutoring',
            title: 'Group Tutoring',
            icon: '👥',
            duration: '60 mins',
            description: 'Small group sessions with peers',
            features: ['Interactive learning', 'Peer discussion', 'Cost-effective']
        },
        {
            id: 'test-prep',
            title: 'Test Preparation',
            icon: '📝',
            duration: '90 mins',
            description: 'Focused preparation for upcoming tests',
            features: ['Mock tests', 'Time management', 'Strategy building']
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBooking = (e) => {
        e.preventDefault();
        alert('Session booked successfully! You will receive confirmation shortly.');
        setBookingForm({
            studentName: '',
            studentId: '',
            subject: '',
            topic: '',
            preferredDate: '',
            preferredTime: '',
            sessionType: 'doubt-clearing'
        });
    };

    return (
        <div className="support-page">
            <div className="support-container">
                {/* Header */}
                <div className="support-header">
                    <div className="school-badge">
                        <h1>InspireEdge School</h1>
                    </div>
                    <h2>Extra Support Program</h2>
                    <p>વધારાની સહાય - After-school tutoring and doubt clearing sessions 🌿</p>
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

                {/* Session Types */}
                <div className="session-types-section">
                    <h3 className="section-title">Choose Your Session Type</h3>
                    <div className="session-types-grid">
                        {sessionTypes.map((session, index) => (
                            <div
                                key={session.id}
                                className="session-type-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="session-icon">{session.icon}</div>
                                <h4>{session.title}</h4>
                                <p className="duration">{session.duration}</p>
                                <p className="description">{session.description}</p>
                                <ul className="features-list">
                                    {session.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subjects Section */}
                <div className="subjects-section">
                    <h3 className="section-title">Available Subjects</h3>
                    <div className="subjects-grid">
                        {subjects.map((subject, index) => (
                            <div
                                key={subject.id}
                                className="subject-card"
                                style={{
                                    animationDelay: `${index * 0.05}s`,
                                    borderColor: subject.color
                                }}
                                onClick={() => setSelectedSubject(subject)}
                            >
                                <div className="subject-icon" style={{ background: `${subject.color}20` }}>
                                    {subject.icon}
                                </div>
                                <h4>{subject.name}</h4>
                                <div className="subject-stats">
                                    <span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        {subject.tutors} Tutors
                                    </span>
                                    <span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        {subject.sessions} Sessions
                                    </span>
                                </div>
                                <button className="view-topics-btn" style={{ background: subject.color }}>
                                    View Topics
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tutors Section */}
                <div className="tutors-section">
                    <h3 className="section-title">Meet Our Expert Tutors</h3>
                    <div className="tutors-grid">
                        {tutors.map((tutor, index) => (
                            <div
                                key={tutor.id}
                                className="tutor-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="tutor-image">{tutor.image}</div>
                                <div className="tutor-info">
                                    <h4>{tutor.name}</h4>
                                    <p className="subject-tag">{tutor.subject}</p>
                                    <p className="specialization">{tutor.specialization}</p>
                                    <div className="tutor-stats">
                                        <div className="stat">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            {tutor.rating}
                                        </div>
                                        <div className="stat">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                <polyline points="17 11 19 13 23 9"></polyline>
                                            </svg>
                                            {tutor.students}+ Students
                                        </div>
                                        <div className="stat">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            {tutor.experience}
                                        </div>
                                    </div>
                                    <button className="book-tutor-btn">Book Session</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule Section */}
                <div className="schedule-section">
                    <h3 className="section-title">Weekly Schedule</h3>
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
                                <p className="schedule-time">{day.time}</p>
                                <div className="availability">
                                    <div className="availability-bar">
                                        <div
                                            className="availability-fill"
                                            style={{ width: `${((day.available - day.booked) / day.available) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="availability-text">
                                        {day.available - day.booked} of {day.available} slots available
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Form */}
                <div className="booking-section">
                    <h3 className="section-title">Schedule Your Session</h3>
                    <div className="booking-form-card">
                        <form onSubmit={handleBooking} className="booking-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        Student Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={bookingForm.studentName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter student name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                        </svg>
                                        Student ID *
                                    </label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={bookingForm.studentId}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter student ID"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                        </svg>
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={bookingForm.subject}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject.id} value={subject.name}>{subject.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={bookingForm.topic}
                                        onChange={handleInputChange}
                                        placeholder="Enter specific topic"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        Preferred Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="preferredDate"
                                        value={bookingForm.preferredDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        Preferred Time *
                                    </label>
                                    <select
                                        name="preferredTime"
                                        value={bookingForm.preferredTime}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Time</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="04:30 PM">04:30 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                        <option value="05:30 PM">05:30 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    Session Type *
                                </label>
                                <select
                                    name="sessionType"
                                    value={bookingForm.sessionType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="doubt-clearing">Doubt Clearing Session</option>
                                    <option value="group-tutoring">Group Tutoring</option>
                                    <option value="test-prep">Test Preparation</option>
                                </select>
                            </div>

                            <button type="submit" className="submit-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                Schedule Session (સત્ર બુક કરો)
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="support-footer">
                    <p>© 2025 InspireEdge School | તમારા વિકાસ માટે પ્રતિબદ્ધ 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default ExtraSupport;