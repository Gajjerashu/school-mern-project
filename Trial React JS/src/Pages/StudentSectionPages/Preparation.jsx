import React, { useState } from 'react';
import { ArrowLeft, BookOpen, FileText, Video, Headphones, Download, Play, Clock, CheckCircle, Star, TrendingUp, Target, Calendar, Award, BookMarked, PenTool } from 'lucide-react';
import './Preparation.css';

const Preparation = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedSubject, setSelectedSubject] = useState('all');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const subjects = [
        { id: 'all', name: 'All Subjects', icon: '📚' },
        { id: 'mathematics', name: 'Mathematics', icon: '🔢' },
        { id: 'science', name: 'Science', icon: '🔬' },
        { id: 'english', name: 'English', icon: '📖' },
        { id: 'social', name: 'Social Studies', icon: '🌍' },
        { id: 'hindi', name: 'Hindi', icon: '🇮🇳' }
    ];

    const materials = [
        {
            id: 'mat1',
            title: 'Quadratic Equations - Complete Guide',
            subject: 'mathematics',
            type: 'notes',
            description: 'Comprehensive study notes covering all concepts of quadratic equations with solved examples.',
            duration: '45 min read',
            pages: 28,
            size: '5.2 MB',
            difficulty: 'intermediate',
            completed: true,
            rating: 4.8,
            downloads: 1250,
            lastAccessed: '2 days ago',
            topics: ['Standard Form', 'Solving Methods', 'Word Problems', 'Graphs'],
            icon: '📐'
        },
        {
            id: 'mat2',
            title: 'Chemistry Lab Experiments Video Series',
            subject: 'science',
            type: 'video',
            description: 'Step-by-step video tutorials for all chemistry lab experiments in the curriculum.',
            duration: '2 hrs 15 min',
            episodes: 12,
            size: '850 MB',
            difficulty: 'beginner',
            completed: false,
            rating: 4.9,
            downloads: 980,
            lastAccessed: '5 days ago',
            topics: ['Acids & Bases', 'Chemical Reactions', 'Salts', 'pH Testing'],
            icon: '🧪'
        },
        {
            id: 'mat3',
            title: 'English Grammar Revision Notes',
            subject: 'english',
            type: 'notes',
            description: 'Complete revision notes for English grammar covering all important topics.',
            duration: '30 min read',
            pages: 22,
            size: '3.8 MB',
            difficulty: 'beginner',
            completed: true,
            rating: 4.7,
            downloads: 1420,
            lastAccessed: '1 day ago',
            topics: ['Tenses', 'Voice', 'Narration', 'Articles'],
            icon: '📝'
        },
        {
            id: 'mat4',
            title: 'Physics Formulas Audio Revision',
            subject: 'science',
            type: 'audio',
            description: 'Audio format revision of all important physics formulas and concepts.',
            duration: '45 min',
            episodes: 8,
            size: '120 MB',
            difficulty: 'intermediate',
            completed: false,
            rating: 4.6,
            downloads: 756,
            lastAccessed: null,
            topics: ['Motion', 'Force', 'Energy', 'Light'],
            icon: '⚡'
        },
        {
            id: 'mat5',
            title: 'Indian History - Complete Timeline',
            subject: 'social',
            type: 'notes',
            description: 'Detailed timeline of Indian history from ancient to modern period.',
            duration: '1 hr read',
            pages: 45,
            size: '8.5 MB',
            difficulty: 'intermediate',
            completed: false,
            rating: 4.8,
            downloads: 892,
            lastAccessed: '3 days ago',
            topics: ['Ancient India', 'Medieval Period', 'British Rule', 'Independence'],
            icon: '🏛️'
        },
        {
            id: 'mat6',
            title: 'Mathematics Practice Problems',
            subject: 'mathematics',
            type: 'practice',
            description: '500+ practice problems with detailed solutions for board exam preparation.',
            duration: 'Self-paced',
            pages: 65,
            size: '12 MB',
            difficulty: 'advanced',
            completed: false,
            rating: 4.9,
            downloads: 1580,
            lastAccessed: 'Yesterday',
            topics: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
            icon: '🎯'
        },
        {
            id: 'mat7',
            title: 'Hindi Grammar & Composition',
            subject: 'hindi',
            type: 'notes',
            description: 'व्याकरण और रचना के सभी महत्वपूर्ण टॉपिक्स के नोट्स।',
            duration: '40 min read',
            pages: 35,
            size: '6.2 MB',
            difficulty: 'intermediate',
            completed: true,
            rating: 4.7,
            downloads: 634,
            lastAccessed: '4 days ago',
            topics: ['व्याकरण', 'निबंध', 'पत्र लेखन', 'कहानी'],
            icon: '📜'
        },
        {
            id: 'mat8',
            title: 'Science Revision Video Lectures',
            subject: 'science',
            type: 'video',
            description: 'Complete revision of biology concepts with animations and diagrams.',
            duration: '3 hrs',
            episodes: 15,
            size: '1.2 GB',
            difficulty: 'intermediate',
            completed: false,
            rating: 4.8,
            downloads: 1120,
            lastAccessed: '1 week ago',
            topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology'],
            icon: '🧬'
        },
        {
            id: 'mat9',
            title: 'Geography Map Practice',
            subject: 'social',
            type: 'practice',
            description: 'Interactive map practice for political and physical geography of India and world.',
            duration: 'Self-paced',
            pages: 40,
            size: '15 MB',
            difficulty: 'beginner',
            completed: false,
            rating: 4.5,
            downloads: 723,
            lastAccessed: null,
            topics: ['Indian States', 'World Countries', 'Rivers', 'Mountains'],
            icon: '🗺️'
        },
        {
            id: 'mat10',
            title: 'English Literature Summary',
            subject: 'english',
            type: 'notes',
            description: 'Chapter-wise summaries of all literature lessons with character analysis.',
            duration: '50 min read',
            pages: 38,
            size: '7 MB',
            difficulty: 'intermediate',
            completed: true,
            rating: 4.9,
            downloads: 1340,
            lastAccessed: '2 days ago',
            topics: ['Prose', 'Poetry', 'Drama', 'Character Study'],
            icon: '📖'
        }
    ];

    const currentStudent = students.find(s => s.id === selectedStudent);

    const filteredMaterials = selectedSubject === 'all'
        ? materials
        : materials.filter(m => m.subject === selectedSubject);

    const stats = {
        totalMaterials: materials.length,
        completed: materials.filter(m => m.completed).length,
        inProgress: materials.filter(m => m.lastAccessed && !m.completed).length,
        notStarted: materials.filter(m => !m.lastAccessed && !m.completed).length
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'notes': return <FileText size={20} />;
            case 'video': return <Video size={20} />;
            case 'audio': return <Headphones size={20} />;
            case 'practice': return <PenTool size={20} />;
            default: return <BookOpen size={20} />;
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            'notes': '#27ae60',
            'video': '#2ecc71',
            'audio': '#1b5e20',
            'practice': '#145a32'
        };
        return colors[type] || '#27ae60';
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            'beginner': '#3498db',
            'intermediate': '#f39c12',
            'advanced': '#e74c3c'
        };
        return colors[difficulty] || '#95a5a6';
    };

    return (
        <div className="preparation-page">
            {/* Header */}
            <div className="preparation-header">
                <div className="preparation-header-circle-1"></div>
                <div className="preparation-header-circle-2"></div>

                <div className="preparation-container">
                    <button className="preparation-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="preparation-header-content">
                        <div className="preparation-header-emoji">📚</div>
                        <h1 className="preparation-header-title">Exam Preparation</h1>
                        <p className="preparation-header-subtitle">
                            Study Materials • Video Lectures • Practice Tests • Revision Notes
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="preparation-main-content">
                {/* Student Selector */}
                <div className="preparation-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="preparation-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} - Roll No: {student.rollNo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="preparation-stats-grid">
                    <div className="preparation-stat-card">
                        <div className="preparation-stat-icon" style={{ color: '#27ae60' }}>
                            <BookOpen size={40} />
                        </div>
                        <div className="preparation-stat-number">{stats.totalMaterials}</div>
                        <p className="preparation-stat-label">Total Materials</p>
                    </div>

                    <div className="preparation-stat-card">
                        <div className="preparation-stat-icon" style={{ color: '#2ecc71' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div className="preparation-stat-number">{stats.completed}</div>
                        <p className="preparation-stat-label">Completed</p>
                    </div>

                    <div className="preparation-stat-card">
                        <div className="preparation-stat-icon" style={{ color: '#1b5e20' }}>
                            <Clock size={40} />
                        </div>
                        <div className="preparation-stat-number">{stats.inProgress}</div>
                        <p className="preparation-stat-label">In Progress</p>
                    </div>

                    <div className="preparation-stat-card">
                        <div className="preparation-stat-icon" style={{ color: '#145a32' }}>
                            <Target size={40} />
                        </div>
                        <div className="preparation-stat-number">{stats.notStarted}</div>
                        <p className="preparation-stat-label">Not Started</p>
                    </div>
                </div>

                {/* Subject Filter */}
                <div className="preparation-filter-section">
                    <div className="filter-header">
                        <BookMarked size={24} />
                        <span>Select Subject</span>
                    </div>
                    <div className="subject-buttons">
                        {subjects.map(subject => (
                            <button
                                key={subject.id}
                                className={`subject-btn ${selectedSubject === subject.id ? 'active' : ''}`}
                                onClick={() => setSelectedSubject(subject.id)}
                            >
                                <span className="subject-icon">{subject.icon}</span>
                                <span>{subject.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Materials List */}
                <div className="preparation-list-section">
                    <h2 className="section-title">
                        <FileText size={28} />
                        Study Materials ({filteredMaterials.length})
                    </h2>

                    <div className="materials-grid">
                        {filteredMaterials.map(material => (
                            <div key={material.id} className="material-card">
                                <div className="material-header">
                                    <div
                                        className="material-type-badge"
                                        style={{ background: getTypeColor(material.type) }}
                                    >
                                        {getTypeIcon(material.type)}
                                        <span>{material.type.toUpperCase()}</span>
                                    </div>
                                    {material.completed && (
                                        <div className="completed-badge">
                                            <CheckCircle size={18} />
                                            <span>Completed</span>
                                        </div>
                                    )}
                                </div>

                                <div className="material-icon">{material.icon}</div>

                                <h3 className="material-title">{material.title}</h3>
                                <p className="material-description">{material.description}</p>

                                <div className="material-meta">
                                    <div className="meta-item">
                                        <Clock size={14} />
                                        <span>{material.duration}</span>
                                    </div>
                                    <div className="meta-item">
                                        <FileText size={14} />
                                        <span>{material.pages ? `${material.pages} pages` : `${material.episodes} episodes`}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Download size={14} />
                                        <span>{material.size}</span>
                                    </div>
                                </div>

                                <div className="material-rating">
                                    <Star size={16} fill="#f39c12" color="#f39c12" />
                                    <span>{material.rating}</span>
                                    <span className="downloads">({material.downloads} downloads)</span>
                                </div>

                                <div
                                    className="difficulty-badge"
                                    style={{ background: getDifficultyColor(material.difficulty) }}
                                >
                                    {material.difficulty.toUpperCase()}
                                </div>

                                <div className="material-topics">
                                    <p className="topics-label">Topics Covered:</p>
                                    <div className="topics-list">
                                        {material.topics.slice(0, 3).map((topic, idx) => (
                                            <span key={idx} className="topic-tag">{topic}</span>
                                        ))}
                                        {material.topics.length > 3 && (
                                            <span className="topic-tag more">+{material.topics.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                {material.lastAccessed && (
                                    <div className="last-accessed">
                                        <Calendar size={14} />
                                        <span>Last accessed: {material.lastAccessed}</span>
                                    </div>
                                )}

                                <div className="material-actions">
                                    {material.completed ? (
                                        <>
                                            <button className="action-btn review-btn">
                                                <Play size={18} />
                                                Review Again
                                            </button>
                                            <button className="action-btn download-btn">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </>
                                    ) : material.lastAccessed ? (
                                        <>
                                            <button className="action-btn continue-btn">
                                                <Play size={18} />
                                                Continue
                                            </button>
                                            <button className="action-btn download-btn">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="action-btn start-btn">
                                                <Play size={18} />
                                                Start Learning
                                            </button>
                                            <button className="action-btn download-btn">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Study Tips Section */}
                <div className="preparation-tips-section">
                    <h2 className="section-title">
                        <Award size={28} />
                        Exam Preparation Tips
                    </h2>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <div className="tip-icon" style={{ background: '#E8F5E9' }}>
                                <Clock size={32} color="#27ae60" />
                            </div>
                            <h3>Time Management</h3>
                            <p>Create a study schedule and allocate time for each subject. Take regular breaks every 45-50 minutes.</p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon" style={{ background: '#E8F5E9' }}>
                                <BookOpen size={32} color="#2ecc71" />
                            </div>
                            <h3>Regular Revision</h3>
                            <p>Revise completed topics regularly. Make short notes and flashcards for quick revision.</p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon" style={{ background: '#E8F5E9' }}>
                                <Target size={32} color="#1b5e20" />
                            </div>
                            <h3>Practice Tests</h3>
                            <p>Solve previous year papers and sample papers. Practice time-bound mock tests regularly.</p>
                        </div>

                        <div className="tip-card">
                            <div className="tip-icon" style={{ background: '#E8F5E9' }}>
                                <TrendingUp size={32} color="#145a32" />
                            </div>
                            <h3>Stay Healthy</h3>
                            <p>Get adequate sleep, eat healthy food, and exercise regularly. A healthy body leads to a sharp mind.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="preparation-cta-section">
                    <div className="preparation-cta-decorative"></div>
                    <h2>Need Study Guidance?</h2>
                    <p>Connect with teachers for personalized study plans and doubt clearing</p>
                    <div className="preparation-cta-buttons">
                        <button className="preparation-cta-button-primary">
                            <BookOpen size={18} />
                            Request Study Plan
                        </button>
                        <button className="preparation-cta-button-secondary">
                            <Download size={18} />
                            Download All Materials
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preparation;