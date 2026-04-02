import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, BookOpen, User, MapPin, Bell, Download, Video, FileText, AlertCircle, Award, TrendingUp } from 'lucide-react';
import './ClassSchedule.css';

const ClassSchedule = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedDay, setSelectedDay] = useState('monday');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001', section: 'A' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002', section: 'B' },
    ];

    const weekDays = [
        { id: 'monday', name: 'Monday', short: 'MON' },
        { id: 'tuesday', name: 'Tuesday', short: 'TUE' },
        { id: 'wednesday', name: 'Wednesday', short: 'WED' },
        { id: 'thursday', name: 'Thursday', short: 'THU' },
        { id: 'friday', name: 'Friday', short: 'FRI' },
        { id: 'saturday', name: 'Saturday', short: 'SAT' }
    ];

    const schedule = {
        monday: [
            { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', room: 'Room 201', type: 'lecture', topic: 'Quadratic Equations' },
            { time: '08:45 - 09:30', subject: 'English', teacher: 'Mrs. Anjali Shah', room: 'Room 105', type: 'lecture', topic: 'Essay Writing' },
            { time: '09:30 - 10:15', subject: 'Science', teacher: 'Mr. Rajesh Kumar', room: 'Lab 1', type: 'lab', topic: 'Chemistry Practicals' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '10:30 - 11:15', subject: 'Social Studies', teacher: 'Mr. Vikram Desai', room: 'Room 303', type: 'lecture', topic: 'Indian History' },
            { time: '11:15 - 12:00', subject: 'Hindi', teacher: 'Mrs. Kavita Joshi', room: 'Room 108', type: 'lecture', topic: 'कहानी लेखन' },
            { time: '12:00 - 12:45', subject: 'Computer Science', teacher: 'Mr. Amit Patel', room: 'Computer Lab', type: 'practical', topic: 'Python Programming' },
            { time: '12:45 - 01:30', subject: 'Lunch Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '01:30 - 02:15', subject: 'Physical Education', teacher: 'Mr. Suresh Yadav', room: 'Sports Ground', type: 'sports', topic: 'Basketball' },
            { time: '02:15 - 03:00', subject: 'Art & Craft', teacher: 'Mrs. Meera Dave', room: 'Art Room', type: 'activity', topic: 'Painting' }
        ],
        tuesday: [
            { time: '08:00 - 08:45', subject: 'Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 202', type: 'lecture', topic: 'Physics - Motion' },
            { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', room: 'Room 201', type: 'lecture', topic: 'Trigonometry' },
            { time: '09:30 - 10:15', subject: 'English', teacher: 'Mrs. Anjali Shah', room: 'Room 105', type: 'lecture', topic: 'Grammar' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '10:30 - 11:15', subject: 'Hindi', teacher: 'Mrs. Kavita Joshi', room: 'Room 108', type: 'lecture', topic: 'व्याकरण' },
            { time: '11:15 - 12:00', subject: 'Computer Science', teacher: 'Mr. Amit Patel', room: 'Computer Lab', type: 'practical', topic: 'Web Development' },
            { time: '12:00 - 12:45', subject: 'Social Studies', teacher: 'Mr. Vikram Desai', room: 'Room 303', type: 'lecture', topic: 'Geography' },
            { time: '12:45 - 01:30', subject: 'Lunch Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '01:30 - 02:15', subject: 'Music', teacher: 'Mr. Dhruv Sharma', room: 'Music Room', type: 'activity', topic: 'Classical Music' },
            { time: '02:15 - 03:00', subject: 'Library Period', teacher: 'Mrs. Ritu Parikh', room: 'Library', type: 'activity', topic: 'Reading Session' }
        ],
        wednesday: [
            { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', room: 'Room 201', type: 'lecture', topic: 'Statistics' },
            { time: '08:45 - 09:30', subject: 'Science', teacher: 'Mr. Rajesh Kumar', room: 'Lab 1', type: 'lab', topic: 'Biology Lab' },
            { time: '09:30 - 10:15', subject: 'Social Studies', teacher: 'Mr. Vikram Desai', room: 'Room 303', type: 'lecture', topic: 'Economics' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '10:30 - 11:15', subject: 'English', teacher: 'Mrs. Anjali Shah', room: 'Room 105', type: 'lecture', topic: 'Literature' },
            { time: '11:15 - 12:00', subject: 'Hindi', teacher: 'Mrs. Kavita Joshi', room: 'Room 108', type: 'lecture', topic: 'कविता' },
            { time: '12:00 - 12:45', subject: 'Computer Science', teacher: 'Mr. Amit Patel', room: 'Computer Lab', type: 'practical', topic: 'Database' },
            { time: '12:45 - 01:30', subject: 'Lunch Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '01:30 - 02:15', subject: 'Physical Education', teacher: 'Mr. Suresh Yadav', room: 'Sports Ground', type: 'sports', topic: 'Cricket' },
            { time: '02:15 - 03:00', subject: 'Value Education', teacher: 'Mrs. Pooja Mehta', room: 'Room 110', type: 'lecture', topic: 'Life Skills' }
        ],
        thursday: [
            { time: '08:00 - 08:45', subject: 'English', teacher: 'Mrs. Anjali Shah', room: 'Room 105', type: 'lecture', topic: 'Comprehension' },
            { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', room: 'Room 201', type: 'lecture', topic: 'Geometry' },
            { time: '09:30 - 10:15', subject: 'Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 202', type: 'lecture', topic: 'Chemistry' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '10:30 - 11:15', subject: 'Computer Science', teacher: 'Mr. Amit Patel', room: 'Computer Lab', type: 'practical', topic: 'AI Basics' },
            { time: '11:15 - 12:00', subject: 'Social Studies', teacher: 'Mr. Vikram Desai', room: 'Room 303', type: 'lecture', topic: 'Civics' },
            { time: '12:00 - 12:45', subject: 'Hindi', teacher: 'Mrs. Kavita Joshi', room: 'Room 108', type: 'lecture', topic: 'निबंध लेखन' },
            { time: '12:45 - 01:30', subject: 'Lunch Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '01:30 - 02:15', subject: 'Dance', teacher: 'Mrs. Nisha Kapoor', room: 'Dance Hall', type: 'activity', topic: 'Folk Dance' },
            { time: '02:15 - 03:00', subject: 'Career Guidance', teacher: 'Mr. Karan Modi', room: 'Room 115', type: 'lecture', topic: 'Career Options' }
        ],
        friday: [
            { time: '08:00 - 08:45', subject: 'Science', teacher: 'Mr. Rajesh Kumar', room: 'Lab 1', type: 'lab', topic: 'Physics Lab' },
            { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', room: 'Room 201', type: 'lecture', topic: 'Algebra' },
            { time: '09:30 - 10:15', subject: 'English', teacher: 'Mrs. Anjali Shah', room: 'Room 105', type: 'lecture', topic: 'Creative Writing' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '10:30 - 11:15', subject: 'Social Studies', teacher: 'Mr. Vikram Desai', room: 'Room 303', type: 'lecture', topic: 'Current Affairs' },
            { time: '11:15 - 12:00', subject: 'Computer Science', teacher: 'Mr. Amit Patel', room: 'Computer Lab', type: 'practical', topic: 'Project Work' },
            { time: '12:00 - 12:45', subject: 'Hindi', teacher: 'Mrs. Kavita Joshi', room: 'Room 108', type: 'lecture', topic: 'वार्तालाप' },
            { time: '12:45 - 01:30', subject: 'Lunch Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '01:30 - 02:15', subject: 'Club Activities', teacher: 'Various', room: 'Multiple', type: 'activity', topic: 'Science/Drama/Quiz' },
            { time: '02:15 - 03:00', subject: 'Assembly', teacher: 'All Teachers', room: 'Main Hall', type: 'assembly', topic: 'Weekly Assembly' }
        ],
        saturday: [
            { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Priya Mehta', room: 'Room 201', type: 'lecture', topic: 'Revision' },
            { time: '08:45 - 09:30', subject: 'Science', teacher: 'Mr. Rajesh Kumar', room: 'Room 202', type: 'lecture', topic: 'Revision' },
            { time: '09:30 - 10:15', subject: 'English', teacher: 'Mrs. Anjali Shah', room: 'Room 105', type: 'lecture', topic: 'Test Preparation' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: null, room: 'Cafeteria', type: 'break', topic: null },
            { time: '10:30 - 11:15', subject: 'Extra Classes', teacher: 'Various', room: 'Multiple', type: 'activity', topic: 'Doubt Clearing' },
            { time: '11:15 - 12:00', subject: 'Sports Day', teacher: 'Mr. Suresh Yadav', room: 'Sports Ground', type: 'sports', topic: 'All Sports' }
        ]
    };

    const currentStudent = students.find(s => s.id === selectedStudent);
    const todaySchedule = schedule[selectedDay];

    const getClassTypeColor = (type) => {
        const colors = {
            'lecture': '#27ae60',
            'lab': '#2ecc71',
            'practical': '#1b5e20',
            'sports': '#145a32',
            'activity': '#A3D9A3',
            'break': '#95a5a6',
            'assembly': '#3498db'
        };
        return colors[type] || '#27ae60';
    };

    const getClassTypeIcon = (type) => {
        switch (type) {
            case 'lecture': return <BookOpen size={20} />;
            case 'lab': return <FileText size={20} />;
            case 'practical': return <Video size={20} />;
            case 'sports': return <Award size={20} />;
            case 'activity': return <Bell size={20} />;
            case 'break': return <Clock size={20} />;
            case 'assembly': return <User size={20} />;
            default: return <BookOpen size={20} />;
        }
    };

    const stats = {
        totalClasses: todaySchedule.filter(c => c.type !== 'break').length,
        lectures: todaySchedule.filter(c => c.type === 'lecture').length,
        practicals: todaySchedule.filter(c => c.type === 'lab' || c.type === 'practical').length,
        activities: todaySchedule.filter(c => c.type === 'activity' || c.type === 'sports').length
    };

    return (
        <div className="class-schedule-page">
            {/* Header */}
            <div className="class-schedule-header">
                <div className="class-schedule-header-circle-1"></div>
                <div className="class-schedule-header-circle-2"></div>

                <div className="class-schedule-container">
                    <button className="class-schedule-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="class-schedule-header-content">
                        <div className="class-schedule-header-emoji">📅</div>
                        <h1 className="class-schedule-header-title">Class Schedule</h1>
                        <p className="class-schedule-header-subtitle">
                            Daily Timetable • Class Timings • Teacher Details • Room Numbers
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="class-schedule-main-content">
                {/* Student Selector */}
                <div className="class-schedule-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="class-schedule-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} - Section {student.section}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="class-schedule-stats-grid">
                    <div className="class-schedule-stat-card">
                        <div className="class-schedule-stat-icon" style={{ color: '#27ae60' }}>
                            <BookOpen size={40} />
                        </div>
                        <div className="class-schedule-stat-number">{stats.totalClasses}</div>
                        <p className="class-schedule-stat-label">Total Classes</p>
                    </div>

                    <div className="class-schedule-stat-card">
                        <div className="class-schedule-stat-icon" style={{ color: '#2ecc71' }}>
                            <User size={40} />
                        </div>
                        <div className="class-schedule-stat-number">{stats.lectures}</div>
                        <p className="class-schedule-stat-label">Lectures</p>
                    </div>

                    <div className="class-schedule-stat-card">
                        <div className="class-schedule-stat-icon" style={{ color: '#1b5e20' }}>
                            <FileText size={40} />
                        </div>
                        <div className="class-schedule-stat-number">{stats.practicals}</div>
                        <p className="class-schedule-stat-label">Practicals/Labs</p>
                    </div>

                    <div className="class-schedule-stat-card">
                        <div className="class-schedule-stat-icon" style={{ color: '#145a32' }}>
                            <Award size={40} />
                        </div>
                        <div className="class-schedule-stat-number">{stats.activities}</div>
                        <p className="class-schedule-stat-label">Activities</p>
                    </div>
                </div>

                {/* Day Selector */}
                <div className="class-schedule-day-selector">
                    <h2 className="section-title">
                        <Calendar size={28} />
                        Select Day
                    </h2>
                    <div className="day-buttons">
                        {weekDays.map(day => (
                            <button
                                key={day.id}
                                className={`day-btn ${selectedDay === day.id ? 'active' : ''}`}
                                onClick={() => setSelectedDay(day.id)}
                            >
                                <span className="day-short">{day.short}</span>
                                <span className="day-full">{day.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Schedule Timeline */}
                <div className="class-schedule-timeline-section">
                    <h2 className="section-title">
                        <Clock size={28} />
                        {weekDays.find(d => d.id === selectedDay)?.name}'s Schedule
                    </h2>

                    <div className="schedule-timeline">
                        {todaySchedule.map((classItem, index) => (
                            <div key={index} className={`schedule-item ${classItem.type}`}>
                                <div className="schedule-time">
                                    <Clock size={18} />
                                    <span>{classItem.time}</span>
                                </div>

                                <div
                                    className="schedule-card"
                                    style={{ borderLeftColor: getClassTypeColor(classItem.type) }}
                                >
                                    <div className="schedule-card-header">
                                        <div className="schedule-subject">
                                            <div
                                                className="subject-icon"
                                                style={{ background: getClassTypeColor(classItem.type) }}
                                            >
                                                {getClassTypeIcon(classItem.type)}
                                            </div>
                                            <h3>{classItem.subject}</h3>
                                        </div>
                                        <span
                                            className="class-type-badge"
                                            style={{ background: getClassTypeColor(classItem.type) }}
                                        >
                                            {classItem.type.toUpperCase()}
                                        </span>
                                    </div>

                                    {classItem.teacher && (
                                        <div className="schedule-details">
                                            <div className="detail-item">
                                                <User size={16} />
                                                <span>{classItem.teacher}</span>
                                            </div>
                                            <div className="detail-item">
                                                <MapPin size={16} />
                                                <span>{classItem.room}</span>
                                            </div>
                                            {classItem.topic && (
                                                <div className="detail-item topic">
                                                    <BookOpen size={16} />
                                                    <span>Topic: {classItem.topic}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {!classItem.teacher && (
                                        <div className="break-info">
                                            <MapPin size={16} />
                                            <span>{classItem.room}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="class-schedule-info-grid">
                    <div className="info-card">
                        <h3>
                            <Bell size={24} />
                            Important Notes
                        </h3>
                        <ul className="info-list">
                            <li>Classes start at 8:00 AM sharp</li>
                            <li>Lunch break: 12:45 PM - 1:30 PM</li>
                            <li>School ends at 3:00 PM</li>
                            <li>Saturday classes till 12:00 PM only</li>
                        </ul>
                    </div>

                    <div className="info-card">
                        <h3>
                            <Download size={24} />
                            Download Options
                        </h3>
                        <div className="download-buttons">
                            <button className="download-btn">
                                <Download size={18} />
                                Weekly Schedule PDF
                            </button>
                            <button className="download-btn">
                                <Calendar size={18} />
                                Add to Calendar
                            </button>
                        </div>
                    </div>

                    <div className="info-card">
                        <h3>
                            <AlertCircle size={24} />
                            Today's Highlights
                        </h3>
                        <div className="highlights">
                            <div className="highlight-item">
                                <TrendingUp size={18} color="#27ae60" />
                                <span>{stats.lectures} Regular Classes</span>
                            </div>
                            <div className="highlight-item">
                                <Award size={18} color="#2ecc71" />
                                <span>{stats.practicals} Lab Sessions</span>
                            </div>
                            <div className="highlight-item">
                                <Bell size={18} color="#1b5e20" />
                                <span>{stats.activities} Special Activities</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="class-schedule-cta-section">
                    <div className="class-schedule-cta-decorative"></div>
                    <h2>Need Schedule Updates?</h2>
                    <p>Get notifications for timetable changes and special classes</p>
                    <div className="class-schedule-cta-buttons">
                        <button className="class-schedule-cta-button-primary">
                            <Bell size={18} />
                            Enable Notifications
                        </button>
                        <button className="class-schedule-cta-button-secondary">
                            <Download size={18} />
                            Download Full Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassSchedule;