import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, Eye, Star, Clock, FileText, Search, Filter, TrendingUp, Award, User, Calendar, Book, Bookmark } from 'lucide-react';
import './Ebook.css';

const Ebook = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001' },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002' },
    ];

    const categories = [
        { id: 'all', name: 'All Books', icon: '📚' },
        { id: 'textbook', name: 'Textbooks', icon: '📖' },
        { id: 'reference', name: 'Reference', icon: '📋' },
        { id: 'literature', name: 'Literature', icon: '📕' },
        { id: 'science', name: 'Science', icon: '🔬' },
        { id: 'story', name: 'Story Books', icon: '📘' }
    ];

    const ebooks = [
        {
            id: 'book1',
            title: 'Mathematics Grade 10 - NCERT',
            author: 'NCERT',
            subject: 'Mathematics',
            category: 'textbook',
            grade: '10th',
            pages: 326,
            size: '45 MB',
            rating: 4.8,
            downloads: 1250,
            views: 3400,
            description: 'Complete mathematics textbook covering algebra, geometry, trigonometry and statistics.',
            cover: '📐',
            publishedDate: '2024',
            language: 'English',
            format: 'PDF',
            chapters: 15,
            lastRead: '2 days ago',
            progress: 65
        },
        {
            id: 'book2',
            title: 'Science Grade 10 - Physics',
            author: 'NCERT',
            subject: 'Physics',
            category: 'textbook',
            grade: '10th',
            pages: 298,
            size: '52 MB',
            rating: 4.7,
            downloads: 1180,
            views: 3100,
            description: 'Comprehensive physics textbook covering mechanics, electricity, optics and modern physics.',
            cover: '⚡',
            publishedDate: '2024',
            language: 'English',
            format: 'PDF',
            chapters: 12,
            lastRead: '5 days ago',
            progress: 45
        },
        {
            id: 'book3',
            title: 'English Literature - Moments',
            author: 'NCERT',
            subject: 'English',
            category: 'literature',
            grade: '10th',
            pages: 156,
            size: '18 MB',
            rating: 4.9,
            downloads: 980,
            views: 2800,
            description: 'Collection of short stories and poems for English literature study.',
            cover: '📚',
            publishedDate: '2024',
            language: 'English',
            format: 'PDF',
            chapters: 10,
            lastRead: '1 day ago',
            progress: 80
        },
        {
            id: 'book4',
            title: 'Chemistry - The Complete Guide',
            author: 'Dr. Pradeep Kumar',
            subject: 'Chemistry',
            category: 'reference',
            grade: '10th',
            pages: 412,
            size: '68 MB',
            rating: 4.6,
            downloads: 856,
            views: 2400,
            description: 'Detailed reference book for chemistry with solved examples and practice questions.',
            cover: '🧪',
            publishedDate: '2023',
            language: 'English',
            format: 'PDF',
            chapters: 18,
            lastRead: null,
            progress: 0
        },
        {
            id: 'book5',
            title: 'Social Studies - History of India',
            author: 'NCERT',
            subject: 'History',
            category: 'textbook',
            grade: '10th',
            pages: 278,
            size: '42 MB',
            rating: 4.5,
            downloads: 920,
            views: 2600,
            description: 'Comprehensive history textbook covering ancient to modern Indian history.',
            cover: '🏛️',
            publishedDate: '2024',
            language: 'English',
            format: 'PDF',
            chapters: 14,
            lastRead: '3 days ago',
            progress: 55
        },
        {
            id: 'book6',
            title: 'Biology - Life Processes',
            author: 'NCERT',
            subject: 'Biology',
            category: 'science',
            grade: '10th',
            pages: 234,
            size: '38 MB',
            rating: 4.8,
            downloads: 1050,
            views: 2900,
            description: 'Study of life processes, heredity, evolution and environmental science.',
            cover: '🧬',
            publishedDate: '2024',
            language: 'English',
            format: 'PDF',
            chapters: 11,
            lastRead: '1 week ago',
            progress: 30
        },
        {
            id: 'book7',
            title: 'The Adventures of Tom Sawyer',
            author: 'Mark Twain',
            subject: 'English',
            category: 'story',
            grade: '8th-10th',
            pages: 224,
            size: '15 MB',
            rating: 4.9,
            downloads: 1420,
            views: 4200,
            description: 'Classic adventure story of a young boy growing up along the Mississippi River.',
            cover: '🏞️',
            publishedDate: '1876',
            language: 'English',
            format: 'PDF',
            chapters: 35,
            lastRead: 'Yesterday',
            progress: 90
        },
        {
            id: 'book8',
            title: 'Computer Science - Programming Basics',
            author: 'Dr. Sumita Arora',
            subject: 'Computer Science',
            category: 'textbook',
            grade: '10th',
            pages: 356,
            size: '48 MB',
            rating: 4.7,
            downloads: 890,
            views: 2500,
            description: 'Introduction to programming with Python, data structures and algorithms.',
            cover: '💻',
            publishedDate: '2024',
            language: 'English',
            format: 'PDF',
            chapters: 16,
            lastRead: '4 days ago',
            progress: 50
        }
    ];

    const currentStudent = students.find(s => s.id === selectedStudent);

    const filteredBooks = ebooks.filter(book => {
        const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const stats = {
        totalBooks: ebooks.length,
        downloaded: ebooks.filter(b => b.progress > 0).length,
        completed: ebooks.filter(b => b.progress === 100).length,
        inProgress: ebooks.filter(b => b.progress > 0 && b.progress < 100).length
    };

    const getSubjectColor = (subject) => {
        const colors = {
            'Mathematics': '#27ae60',
            'Physics': '#2ecc71',
            'Chemistry': '#1b5e20',
            'Biology': '#145a32',
            'English': '#A3D9A3',
            'History': '#27ae60',
            'Computer Science': '#2ecc71',
            'default': '#27ae60'
        };
        return colors[subject] || colors.default;
    };

    return (
        <div className="ebook-page">
            {/* Header */}
            <div className="ebook-header">
                <div className="ebook-header-circle-1"></div>
                <div className="ebook-header-circle-2"></div>

                <div className="ebook-container">
                    <button className="ebook-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="ebook-header-content">
                        <div className="ebook-header-emoji">📚</div>
                        <h1 className="ebook-header-title">E-Books Library</h1>
                        <p className="ebook-header-subtitle">
                            Digital Textbooks • Reference Books • Story Books • Download & Read Offline
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="ebook-main-content">
                {/* Student Selector */}
                <div className="ebook-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="ebook-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} - Roll No: {student.rollNo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats Grid */}
                <div className="ebook-stats-grid">
                    <div className="ebook-stat-card">
                        <div className="ebook-stat-icon" style={{ color: '#27ae60' }}>
                            <BookOpen size={40} />
                        </div>
                        <div className="ebook-stat-number">{stats.totalBooks}</div>
                        <p className="ebook-stat-label">Total Books</p>
                    </div>

                    <div className="ebook-stat-card">
                        <div className="ebook-stat-icon" style={{ color: '#2ecc71' }}>
                            <Download size={40} />
                        </div>
                        <div className="ebook-stat-number">{stats.downloaded}</div>
                        <p className="ebook-stat-label">Downloaded</p>
                    </div>

                    <div className="ebook-stat-card">
                        <div className="ebook-stat-icon" style={{ color: '#1b5e20' }}>
                            <Book size={40} />
                        </div>
                        <div className="ebook-stat-number">{stats.inProgress}</div>
                        <p className="ebook-stat-label">In Progress</p>
                    </div>

                    <div className="ebook-stat-card">
                        <div className="ebook-stat-icon" style={{ color: '#145a32' }}>
                            <Award size={40} />
                        </div>
                        <div className="ebook-stat-number">{stats.completed}</div>
                        <p className="ebook-stat-label">Completed</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="ebook-search-filter-section">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search books by title, author, or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-filter">
                        <div className="filter-header">
                            <Filter size={20} />
                            <span>Categories</span>
                        </div>
                        <div className="category-buttons">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <span className="category-icon">{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="ebook-list-section">
                    <h2 className="section-title">
                        <BookOpen size={28} />
                        Available Books ({filteredBooks.length})
                    </h2>

                    <div className="ebooks-grid">
                        {filteredBooks.map(book => (
                            <div key={book.id} className="ebook-card">
                                <div className="ebook-cover">
                                    <div className="cover-emoji">{book.cover}</div>
                                    {book.progress > 0 && (
                                        <div className="progress-badge">
                                            <Clock size={14} />
                                            {book.progress}%
                                        </div>
                                    )}
                                </div>

                                <div className="ebook-content">
                                    <div className="ebook-header-info">
                                        <span
                                            className="subject-badge"
                                            style={{ background: getSubjectColor(book.subject) }}
                                        >
                                            {book.subject}
                                        </span>
                                        <div className="rating">
                                            <Star size={14} fill="#f39c12" color="#f39c12" />
                                            <span>{book.rating}</span>
                                        </div>
                                    </div>

                                    <h3 className="ebook-title">{book.title}</h3>
                                    <p className="ebook-author">
                                        <User size={14} />
                                        {book.author}
                                    </p>
                                    <p className="ebook-description">{book.description}</p>

                                    <div className="ebook-meta">
                                        <div className="meta-item">
                                            <FileText size={14} />
                                            <span>{book.pages} pages</span>
                                        </div>
                                        <div className="meta-item">
                                            <Book size={14} />
                                            <span>{book.chapters} chapters</span>
                                        </div>
                                        <div className="meta-item">
                                            <Download size={14} />
                                            <span>{book.size}</span>
                                        </div>
                                        <div className="meta-item">
                                            <Eye size={14} />
                                            <span>{book.views} views</span>
                                        </div>
                                    </div>

                                    {book.lastRead && (
                                        <div className="last-read">
                                            <Clock size={14} />
                                            <span>Last read: {book.lastRead}</span>
                                        </div>
                                    )}

                                    {book.progress > 0 && book.progress < 100 && (
                                        <div className="progress-bar-container">
                                            <div className="progress-bar-label">
                                                <span>Reading Progress</span>
                                                <span>{book.progress}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${book.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="ebook-actions">
                                        {book.progress === 0 ? (
                                            <>
                                                <button className="action-btn primary-btn">
                                                    <Download size={18} />
                                                    Download
                                                </button>
                                                <button className="action-btn secondary-btn">
                                                    <Eye size={18} />
                                                    Preview
                                                </button>
                                            </>
                                        ) : book.progress === 100 ? (
                                            <>
                                                <button className="action-btn success-btn">
                                                    <Award size={18} />
                                                    Completed
                                                </button>
                                                <button className="action-btn secondary-btn">
                                                    <BookOpen size={18} />
                                                    Read Again
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="action-btn continue-btn">
                                                    <BookOpen size={18} />
                                                    Continue Reading
                                                </button>
                                                <button className="action-btn secondary-btn">
                                                    <Bookmark size={18} />
                                                    Bookmark
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="ebook-info-grid">
                    <div className="info-card">
                        <h3>
                            <TrendingUp size={24} />
                            Popular Books
                        </h3>
                        <ul className="popular-list">
                            {ebooks.sort((a, b) => b.downloads - a.downloads).slice(0, 3).map(book => (
                                <li key={book.id}>
                                    <span className="book-emoji">{book.cover}</span>
                                    <div>
                                        <p className="popular-title">{book.title}</p>
                                        <p className="popular-stats">{book.downloads} downloads</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-card">
                        <h3>
                            <Calendar size={24} />
                            Recently Added
                        </h3>
                        <ul className="recent-list">
                            {ebooks.filter(b => b.publishedDate === '2024').slice(0, 3).map(book => (
                                <li key={book.id}>
                                    <span className="book-emoji">{book.cover}</span>
                                    <div>
                                        <p className="recent-title">{book.title}</p>
                                        <p className="recent-date">{book.publishedDate}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-card">
                        <h3>
                            <Award size={24} />
                            Reading Tips
                        </h3>
                        <ul className="tips-list">
                            <li>📖 Read for at least 30 minutes daily</li>
                            <li>🎯 Set reading goals for each book</li>
                            <li>📝 Take notes while reading</li>
                            <li>💡 Review key concepts regularly</li>
                        </ul>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="ebook-cta-section">
                    <div className="ebook-cta-decorative"></div>
                    <h2>Need More Books?</h2>
                    <p>Request new books or report issues with existing e-books</p>
                    <div className="ebook-cta-buttons">
                        <button className="ebook-cta-button-primary">
                            <BookOpen size={18} />
                            Request New Book
                        </button>
                        <button className="ebook-cta-button-secondary">
                            <FileText size={18} />
                            Report Issue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ebook;