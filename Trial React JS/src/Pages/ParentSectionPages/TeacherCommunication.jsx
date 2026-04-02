import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Send, Calendar, Clock, User, Mail, Phone, Video, Bell, Search, Filter, Paperclip, CheckCheck } from 'lucide-react';
import './TeacherCommunication.css';

const TeacherCommunication = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedChat, setSelectedChat] = useState('teacher1');
    const [messageText, setMessageText] = useState('');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const teachers = [
        {
            id: 'teacher1',
            name: 'Dr. Meera Iyer',
            subject: 'Mathematics',
            email: 'meera.iyer@school.com',
            phone: '+91 98765 43210',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
            online: true,
            lastSeen: 'Online'
        },
        {
            id: 'teacher2',
            name: 'Mrs. Alka Verma',
            subject: 'Science',
            email: 'alka.verma@school.com',
            phone: '+91 98765 43211',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
            online: false,
            lastSeen: '2 hours ago'
        },
        {
            id: 'teacher3',
            name: 'Mr. Vivek Shah',
            subject: 'English',
            email: 'vivek.shah@school.com',
            phone: '+91 98765 43212',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            online: true,
            lastSeen: 'Online'
        },
        {
            id: 'teacher4',
            name: 'Ms. Priyanka Joshi',
            subject: 'Social Science',
            email: 'priyanka.joshi@school.com',
            phone: '+91 98765 43213',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            online: false,
            lastSeen: 'Yesterday'
        }
    ];

    const messages = {
        teacher1: [
            {
                id: 1,
                sender: 'parent',
                text: 'Good morning! I wanted to discuss Aarav\'s progress in Mathematics.',
                time: '09:15 AM',
                date: '2024-11-28',
                read: true
            },
            {
                id: 2,
                sender: 'teacher',
                text: 'Good morning! Of course, I\'d be happy to discuss. Aarav has been doing very well this semester.',
                time: '09:18 AM',
                date: '2024-11-28',
                read: true
            },
            {
                id: 3,
                sender: 'parent',
                text: 'That\'s great to hear! He mentioned struggling with quadratic equations. Can you provide some extra practice materials?',
                time: '09:20 AM',
                date: '2024-11-28',
                read: true
            },
            {
                id: 4,
                sender: 'teacher',
                text: 'Absolutely! I\'ll send some practice worksheets today. Also, I hold extra help sessions every Wednesday after school if he\'d like to attend.',
                time: '09:25 AM',
                date: '2024-11-28',
                read: true
            },
            {
                id: 5,
                sender: 'parent',
                text: 'Thank you so much! I\'ll make sure he attends next Wednesday.',
                time: '09:30 AM',
                date: '2024-11-28',
                read: true
            }
        ],
        teacher2: [
            {
                id: 1,
                sender: 'teacher',
                text: 'Hello! Just wanted to inform you about the upcoming Science Fair on December 15th. Aarav has shown great interest!',
                time: '02:30 PM',
                date: '2024-11-27',
                read: true
            },
            {
                id: 2,
                sender: 'parent',
                text: 'That sounds wonderful! What kind of project would he need to prepare?',
                time: '03:15 PM',
                date: '2024-11-27',
                read: true
            },
            {
                id: 3,
                sender: 'teacher',
                text: 'He can choose any topic related to physics, chemistry, or biology. I\'ve sent the guidelines via email.',
                time: '03:20 PM',
                date: '2024-11-27',
                read: false
            }
        ]
    };

    const notices = [
        {
            id: 1,
            title: 'Parent-Teacher Meeting',
            date: '2024-12-05',
            time: '10:00 AM - 12:00 PM',
            description: 'Monthly parent-teacher meeting to discuss student progress',
            priority: 'high',
            from: 'Administration'
        },
        {
            id: 2,
            title: 'Science Fair Registration',
            date: '2024-12-15',
            time: '09:00 AM',
            description: 'Annual science fair - registration deadline is December 1st',
            priority: 'medium',
            from: 'Mrs. Alka Verma'
        },
        {
            id: 3,
            title: 'Winter Break Schedule',
            date: '2024-12-20',
            time: 'All Day',
            description: 'School closes for winter break from Dec 20 to Jan 5',
            priority: 'low',
            from: 'Administration'
        }
    ];

    const currentTeacher = teachers.find(t => t.id === selectedChat);
    const currentMessages = messages[selectedChat] || [];

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // Handle message sending logic
            setMessageText('');
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

    return (
        <div className="teacher-comm-page">
            {/* Header */}
            <div className="teacher-comm-header">
                <div className="teacher-comm-header-circle-1"></div>
                <div className="teacher-comm-header-circle-2"></div>

                <div className="teacher-comm-container">
                    <button className="teacher-comm-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="teacher-comm-header-content">
                        <div className="teacher-comm-header-emoji">💬</div>
                        <h1 className="teacher-comm-header-title">Teacher Communication</h1>
                        <p className="teacher-comm-header-subtitle">
                            Direct Messaging • Important Notices • Schedule Meetings • Stay Connected
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="teacher-comm-main-content">
                {/* Student Selector */}
                <div className="teacher-comm-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="teacher-comm-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Main Communication Area */}
                <div className="teacher-comm-layout">
                    {/* Sidebar - Teachers List */}
                    <div className="teacher-comm-sidebar">
                        <div className="sidebar-header">
                            <h3>Teachers</h3>
                            <Search size={20} />
                        </div>

                        <div className="teachers-list">
                            {teachers.map((teacher) => (
                                <div
                                    key={teacher.id}
                                    className={`teacher-item ${selectedChat === teacher.id ? 'active' : ''}`}
                                    onClick={() => setSelectedChat(teacher.id)}
                                >
                                    <div className="teacher-item-avatar">
                                        <img src={teacher.avatar} alt={teacher.name} />
                                        {teacher.online && <span className="online-indicator"></span>}
                                    </div>
                                    <div className="teacher-item-info">
                                        <h4>{teacher.name}</h4>
                                        <p className="teacher-subject">{teacher.subject}</p>
                                        <p className="teacher-last-seen">{teacher.lastSeen}</p>
                                    </div>
                                    {messages[teacher.id] && messages[teacher.id].some(m => !m.read && m.sender === 'teacher') && (
                                        <span className="unread-badge">New</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="teacher-comm-chat-area">
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <img src={currentTeacher.avatar} alt={currentTeacher.name} className="chat-avatar" />
                                <div>
                                    <h3>{currentTeacher.name}</h3>
                                    <p className="chat-subject">{currentTeacher.subject}</p>
                                </div>
                            </div>
                            <div className="chat-actions">
                                <button className="chat-action-btn">
                                    <Phone size={20} />
                                </button>
                                <button className="chat-action-btn">
                                    <Video size={20} />
                                </button>
                                <button className="chat-action-btn">
                                    <Calendar size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="chat-messages">
                            {currentMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`message ${message.sender === 'parent' ? 'sent' : 'received'}`}
                                >
                                    <div className="message-content">
                                        <p>{message.text}</p>
                                        <div className="message-time">
                                            {message.time}
                                            {message.sender === 'parent' && (
                                                <CheckCheck size={14} color={message.read ? '#27ae60' : '#95a5a6'} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="chat-input-area">
                            <button className="attach-btn">
                                <Paperclip size={20} />
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="chat-input"
                            />
                            <button className="send-btn" onClick={handleSendMessage}>
                                <Send size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar - Teacher Info & Notices */}
                    <div className="teacher-comm-right-sidebar">
                        <div className="teacher-info-card">
                            <img src={currentTeacher.avatar} alt={currentTeacher.name} className="teacher-info-avatar" />
                            <h3>{currentTeacher.name}</h3>
                            <p className="teacher-info-subject">{currentTeacher.subject}</p>

                            <div className="teacher-contact-info">
                                <div className="contact-item">
                                    <Mail size={16} />
                                    <span>{currentTeacher.email}</span>
                                </div>
                                <div className="contact-item">
                                    <Phone size={16} />
                                    <span>{currentTeacher.phone}</span>
                                </div>
                            </div>

                            <button className="schedule-meeting-btn">
                                <Calendar size={18} />
                                Schedule Meeting
                            </button>
                        </div>

                        <div className="notices-section">
                            <h3>Important Notices</h3>
                            {notices.map((notice) => (
                                <div key={notice.id} className="notice-card">
                                    <div className="notice-header">
                                        <span
                                            className="notice-priority"
                                            style={{ background: getPriorityColor(notice.priority) }}
                                        ></span>
                                        <Bell size={16} color={getPriorityColor(notice.priority)} />
                                    </div>
                                    <h4>{notice.title}</h4>
                                    <p className="notice-description">{notice.description}</p>
                                    <div className="notice-footer">
                                        <div className="notice-date">
                                            <Calendar size={14} />
                                            {notice.date}
                                        </div>
                                        <div className="notice-time">
                                            <Clock size={14} />
                                            {notice.time}
                                        </div>
                                    </div>
                                    <p className="notice-from">From: {notice.from}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="teacher-comm-cta-section">
                    <div className="teacher-comm-cta-decorative"></div>
                    <h2>Need Immediate Assistance?</h2>
                    <p>Contact school administration for urgent matters</p>
                    <div className="teacher-comm-cta-buttons">
                        <button className="teacher-comm-cta-button-primary">
                            <Phone size={18} />
                            Call Administration
                        </button>
                        <button className="teacher-comm-cta-button-secondary">
                            <Mail size={18} />
                            Email Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherCommunication;