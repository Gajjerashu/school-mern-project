// src/pages/DigitalLibrary.jsx
import React, { useState } from 'react';
import './DigitalLibrary.css';

const DigitalLibrary = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', name: 'All Resources', icon: '📚' },
        { id: 'books', name: 'E-Books', icon: '📖' },
        { id: 'research', name: 'Research Papers', icon: '🔬' },
        { id: 'journals', name: 'Journals', icon: '📰' },
        { id: 'magazines', name: 'Magazines', icon: '📔' },
        { id: 'videos', name: 'Video Lectures', icon: '🎥' }
    ];

    const resources = [
        {
            id: 1,
            title: 'Introduction to Physics',
            type: 'books',
            author: 'Dr. Rajesh Patel',
            description: 'Comprehensive physics textbook for class 11-12',
            downloads: 1245,
            rating: 4.8,
            cover: '📘'
        },
        {
            id: 2,
            title: 'Advanced Chemistry',
            type: 'books',
            author: 'Prof. Meera Shah',
            description: 'Complete chemistry guide with experiments',
            downloads: 987,
            rating: 4.7,
            cover: '📗'
        },
        {
            id: 3,
            title: 'Mathematics Olympiad',
            type: 'books',
            author: 'Dr. Amit Kumar',
            description: 'Problem-solving techniques for competitive exams',
            downloads: 2156,
            rating: 4.9,
            cover: '📙'
        },
        {
            id: 4,
            title: 'Biology Research Methods',
            type: 'research',
            author: 'Dr. Priya Desai',
            description: 'Latest research methodologies in biology',
            downloads: 654,
            rating: 4.6,
            cover: '🔬'
        },
        {
            id: 5,
            title: 'Computer Science Journal',
            type: 'journals',
            author: 'Tech Publications',
            description: 'Monthly journal on latest tech trends',
            downloads: 1543,
            rating: 4.8,
            cover: '💻'
        },
        {
            id: 6,
            title: 'Science Today Magazine',
            type: 'magazines',
            author: 'Science Media',
            description: 'Popular science magazine for students',
            downloads: 876,
            rating: 4.5,
            cover: '🔭'
        },
        {
            id: 7,
            title: 'Calculus Video Series',
            type: 'videos',
            author: 'Prof. Vikram Singh',
            description: '50+ hours of calculus lectures',
            downloads: 3421,
            rating: 4.9,
            cover: '🎥'
        },
        {
            id: 8,
            title: 'English Literature',
            type: 'books',
            author: 'Dr. Anjali Mehta',
            description: 'Complete guide to English literature',
            downloads: 1123,
            rating: 4.7,
            cover: '📕'
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const stats = [
        { label: 'Total Books', value: '10,000+', icon: '📚' },
        { label: 'E-Resources', value: '5,000+', icon: '💾' },
        { label: 'Research Papers', value: '2,500+', icon: '📄' },
        { label: 'Active Users', value: '3,200+', icon: '👥' }
    ];

    return (
        <div className="library-page">
            <div className="library-container">
                {/* Header */}
                <div className="library-header">
                    <div className="school-badge">
                        <h1>InspireEdge School</h1>
                    </div>
                    <h2>Digital Library</h2>
                    <p>ડિજિટલ લાયબ્રેરી - 10,000+ books, e-resources, and research databases 🌿</p>
                </div>

                {/* Stats Section */}
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

                {/* Search Section */}
                <div className="search-section">
                    <div className="search-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search books, authors, topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="categories-section">
                    <h3 className="section-title">Browse by Category</h3>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="resources-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.name}
                        </h3>
                        <p className="resource-count">{filteredResources.length} resources found</p>
                    </div>

                    <div className="resources-grid">
                        {filteredResources.map((resource, index) => (
                            <div
                                key={resource.id}
                                className="resource-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="resource-cover">{resource.cover}</div>
                                <div className="resource-content">
                                    <h4 className="resource-title">{resource.title}</h4>
                                    <p className="resource-author">
                                        <svg className="author-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        {resource.author}
                                    </p>
                                    <p className="resource-description">{resource.description}</p>
                                    <div className="resource-meta">
                                        <div className="meta-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <span>{resource.rating}</span>
                                        </div>
                                        <div className="meta-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            <span>{resource.downloads}</span>
                                        </div>
                                    </div>
                                    <button className="access-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        </svg>
                                        Access Resource
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="library-footer">
                    <p>© 2025 InspireEdge School | તમારા વિકાસ માટે પ્રતિબદ્ધ 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default DigitalLibrary;