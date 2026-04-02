import React, { useState } from 'react';
import { ArrowLeft, Award, Trophy, Star, Medal, Target, TrendingUp, Calendar, User, BookOpen, Clock, Download, Share2, Filter, Crown, Zap } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
    const [selectedStudent, setSelectedStudent] = useState('student1');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const students = [
        { id: 'student1', name: 'Aarav Patel', grade: '10th', rollNo: '2024001', totalPoints: 2850 },
        { id: 'student2', name: 'Diya Sharma', grade: '8th', rollNo: '2024002', totalPoints: 2340 },
    ];

    const achievements = [
        {
            id: 'ach1',
            title: 'Perfect Attendance',
            description: 'Attended school for 30 consecutive days without absence',
            icon: '🎯',
            category: 'attendance',
            points: 100,
            earned: true,
            earnedDate: '2025-11-15',
            rarity: 'gold',
            progress: 100,
            total: 30,
            current: 30
        },
        {
            id: 'ach2',
            title: 'Academic Excellence',
            description: 'Scored above 90% in all subjects in mid-term exams',
            icon: '📚',
            category: 'academic',
            points: 200,
            earned: true,
            earnedDate: '2025-10-20',
            rarity: 'platinum',
            progress: 100,
            total: 5,
            current: 5
        },
        {
            id: 'ach3',
            title: 'Mathematics Master',
            description: 'Solved 100 math problems correctly',
            icon: '🔢',
            category: 'academic',
            points: 150,
            earned: true,
            earnedDate: '2025-11-01',
            rarity: 'gold',
            progress: 100,
            total: 100,
            current: 100
        },
        {
            id: 'ach4',
            title: 'Science Champion',
            description: 'Complete all science lab experiments with distinction',
            icon: '🔬',
            category: 'academic',
            points: 180,
            earned: false,
            earnedDate: null,
            rarity: 'gold',
            progress: 75,
            total: 12,
            current: 9
        },
        {
            id: 'ach5',
            title: 'Book Worm',
            description: 'Read 20 books from the school library',
            icon: '📖',
            category: 'reading',
            points: 120,
            earned: false,
            earnedDate: null,
            rarity: 'silver',
            progress: 65,
            total: 20,
            current: 13
        },
        {
            id: 'ach6',
            title: 'Sports Star',
            description: 'Participated in 10 different sports activities',
            icon: '⚽',
            category: 'sports',
            points: 150,
            earned: true,
            earnedDate: '2025-09-25',
            rarity: 'gold',
            progress: 100,
            total: 10,
            current: 10
        },
        {
            id: 'ach7',
            title: 'Team Player',
            description: 'Successfully completed 5 group projects',
            icon: '🤝',
            category: 'collaboration',
            points: 100,
            earned: true,
            earnedDate: '2025-10-10',
            rarity: 'silver',
            progress: 100,
            total: 5,
            current: 5
        },
        {
            id: 'ach8',
            title: 'Early Bird',
            description: 'Arrived at school before 7:45 AM for 50 days',
            icon: '🌅',
            category: 'attendance',
            points: 80,
            earned: false,
            earnedDate: null,
            rarity: 'bronze',
            progress: 60,
            total: 50,
            current: 30
        },
        {
            id: 'ach9',
            title: 'Creative Genius',
            description: 'Won 3 art & craft competitions',
            icon: '🎨',
            category: 'creative',
            points: 200,
            earned: true,
            earnedDate: '2025-11-20',
            rarity: 'platinum',
            progress: 100,
            total: 3,
            current: 3
        },
        {
            id: 'ach10',
            title: 'Assignment Hero',
            description: 'Submitted 50 assignments on time',
            icon: '📝',
            category: 'academic',
            points: 120,
            earned: false,
            earnedDate: null,
            rarity: 'silver',
            progress: 84,
            total: 50,
            current: 42
        },
        {
            id: 'ach11',
            title: 'Quiz Master',
            description: 'Score 100% in 10 quizzes',
            icon: '🧠',
            category: 'academic',
            points: 150,
            earned: false,
            earnedDate: null,
            rarity: 'gold',
            progress: 70,
            total: 10,
            current: 7
        },
        {
            id: 'ach12',
            title: 'Tech Wizard',
            description: 'Complete 15 computer programming challenges',
            icon: '💻',
            category: 'academic',
            points: 180,
            earned: true,
            earnedDate: '2025-11-28',
            rarity: 'gold',
            progress: 100,
            total: 15,
            current: 15
        }
    ];

    const categories = [
        { id: 'all', name: 'All Achievements', icon: '🏆' },
        { id: 'academic', name: 'Academic', icon: '📚' },
        { id: 'sports', name: 'Sports', icon: '⚽' },
        { id: 'attendance', name: 'Attendance', icon: '🎯' },
        { id: 'reading', name: 'Reading', icon: '📖' },
        { id: 'creative', name: 'Creative', icon: '🎨' },
        { id: 'collaboration', name: 'Team Work', icon: '🤝' }
    ];

    const currentStudent = students.find(s => s.id === selectedStudent);

    const filteredAchievements = selectedCategory === 'all'
        ? achievements
        : achievements.filter(a => a.category === selectedCategory);

    const stats = {
        total: achievements.length,
        earned: achievements.filter(a => a.earned).length,
        inProgress: achievements.filter(a => !a.earned && a.progress > 0).length,
        totalPoints: achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0)
    };

    const getRarityColor = (rarity) => {
        const colors = {
            'platinum': '#E5E4E2',
            'gold': '#FFD700',
            'silver': '#C0C0C0',
            'bronze': '#CD7F32'
        };
        return colors[rarity] || '#27ae60';
    };

    const getRarityBorder = (rarity) => {
        const colors = {
            'platinum': '#B9B8B5',
            'gold': '#DAA520',
            'silver': '#A8A8A8',
            'bronze': '#B8732C'
        };
        return colors[rarity] || '#27ae60';
    };

    const levelInfo = {
        current: Math.floor(currentStudent.totalPoints / 500) + 1,
        nextLevel: Math.floor(currentStudent.totalPoints / 500) + 2,
        currentPoints: currentStudent.totalPoints % 500,
        requiredPoints: 500,
        progress: (currentStudent.totalPoints % 500) / 500 * 100
    };

    return (
        <div className="achievements-page">
            {/* Header */}
            <div className="achievements-header">
                <div className="achievements-header-circle-1"></div>
                <div className="achievements-header-circle-2"></div>

                <div className="achievements-container">
                    <button className="achievements-back-button" onClick={() => window.history.back()}>
                        <ArrowLeft size={20} />
                        Back to Portal
                    </button>

                    <div className="achievements-header-content">
                        <div className="achievements-header-emoji">🏆</div>
                        <h1 className="achievements-header-title">Achievements & Rewards</h1>
                        <p className="achievements-header-subtitle">
                            Track Progress • Earn Badges • Unlock Rewards • Celebrate Success
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="achievements-main-content">
                {/* Student Selector */}
                <div className="achievements-selector-section">
                    <label>Select Student:</label>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="achievements-select"
                    >
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.name} - Grade {student.grade} - Points: {student.totalPoints}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Level Progress Card */}
                <div className="achievements-level-card">
                    <div className="level-header">
                        <div className="level-badge">
                            <Crown size={32} color="#FFD700" />
                            <div className="level-info">
                                <span className="level-label">Current Level</span>
                                <span className="level-number">{levelInfo.current}</span>
                            </div>
                        </div>
                        <div className="points-display">
                            <Zap size={24} color="#f39c12" />
                            <span className="points-number">{currentStudent.totalPoints}</span>
                            <span className="points-label">Total Points</span>
                        </div>
                    </div>
                    <div className="level-progress-container">
                        <div className="level-progress-info">
                            <span>Level {levelInfo.current}</span>
                            <span>{levelInfo.currentPoints} / {levelInfo.requiredPoints} XP</span>
                            <span>Level {levelInfo.nextLevel}</span>
                        </div>
                        <div className="level-progress-bar">
                            <div
                                className="level-progress-fill"
                                style={{ width: `${levelInfo.progress}%` }}
                            ></div>
                        </div>
                        <p className="level-next">
                            {levelInfo.requiredPoints - levelInfo.currentPoints} points to next level!
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="achievements-stats-grid">
                    <div className="achievements-stat-card">
                        <div className="achievements-stat-icon" style={{ color: '#27ae60' }}>
                            <Trophy size={40} />
                        </div>
                        <div className="achievements-stat-number">{stats.total}</div>
                        <p className="achievements-stat-label">Total Achievements</p>
                    </div>

                    <div className="achievements-stat-card">
                        <div className="achievements-stat-icon" style={{ color: '#2ecc71' }}>
                            <Award size={40} />
                        </div>
                        <div className="achievements-stat-number">{stats.earned}</div>
                        <p className="achievements-stat-label">Earned</p>
                    </div>

                    <div className="achievements-stat-card">
                        <div className="achievements-stat-icon" style={{ color: '#1b5e20' }}>
                            <Target size={40} />
                        </div>
                        <div className="achievements-stat-number">{stats.inProgress}</div>
                        <p className="achievements-stat-label">In Progress</p>
                    </div>

                    <div className="achievements-stat-card">
                        <div className="achievements-stat-icon" style={{ color: '#145a32' }}>
                            <Star size={40} />
                        </div>
                        <div className="achievements-stat-number">{stats.totalPoints}</div>
                        <p className="achievements-stat-label">Points Earned</p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="achievements-filter-section">
                    <div className="filter-header">
                        <Filter size={24} />
                        <span>Filter by Category</span>
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

                {/* Achievements Grid */}
                <div className="achievements-list-section">
                    <h2 className="section-title">
                        <Award size={28} />
                        {selectedCategory === 'all' ? 'All Achievements' : categories.find(c => c.id === selectedCategory)?.name} ({filteredAchievements.length})
                    </h2>

                    <div className="achievements-grid">
                        {filteredAchievements.map(achievement => (
                            <div
                                key={achievement.id}
                                className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                                style={{ borderColor: achievement.earned ? getRarityBorder(achievement.rarity) : '#E8F5E9' }}
                            >
                                <div
                                    className="achievement-icon-wrapper"
                                    style={{
                                        background: achievement.earned
                                            ? `linear-gradient(135deg, ${getRarityColor(achievement.rarity)}, ${getRarityBorder(achievement.rarity)})`
                                            : '#f8fdf9'
                                    }}
                                >
                                    <div className={`achievement-icon ${achievement.earned ? '' : 'locked-icon'}`}>
                                        {achievement.icon}
                                    </div>
                                    {achievement.earned && (
                                        <div className="achievement-checkmark">✓</div>
                                    )}
                                </div>

                                <div className="achievement-content">
                                    <div className="achievement-header">
                                        <h3 className="achievement-title">{achievement.title}</h3>
                                        <span
                                            className="rarity-badge"
                                            style={{
                                                background: getRarityColor(achievement.rarity),
                                                color: achievement.rarity === 'platinum' || achievement.rarity === 'silver' ? '#000' : '#fff'
                                            }}
                                        >
                                            {achievement.rarity.toUpperCase()}
                                        </span>
                                    </div>

                                    <p className="achievement-description">{achievement.description}</p>

                                    <div className="achievement-points">
                                        <Star size={16} fill="#f39c12" color="#f39c12" />
                                        <span>{achievement.points} Points</span>
                                    </div>

                                    {achievement.earned ? (
                                        <div className="achievement-earned-info">
                                            <Calendar size={16} />
                                            <span>Earned on {achievement.earnedDate}</span>
                                        </div>
                                    ) : (
                                        <div className="achievement-progress">
                                            <div className="progress-header">
                                                <span>Progress: {achievement.current} / {achievement.total}</span>
                                                <span>{achievement.progress}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${achievement.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {achievement.earned && (
                                        <div className="achievement-actions">
                                            <button className="share-btn">
                                                <Share2 size={16} />
                                                Share
                                            </button>
                                            <button className="download-btn">
                                                <Download size={16} />
                                                Certificate
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard Section */}
                <div className="achievements-leaderboard-section">
                    <h2 className="section-title">
                        <TrendingUp size={28} />
                        Class Leaderboard
                    </h2>
                    <div className="leaderboard-card">
                        <div className="leaderboard-item rank-1">
                            <div className="rank-badge gold">
                                <Medal size={24} />
                                <span>1</span>
                            </div>
                            <div className="student-info">
                                <User size={20} />
                                <div>
                                    <p className="student-name">Aarav Patel</p>
                                    <p className="student-class">Grade 10th A</p>
                                </div>
                            </div>
                            <div className="student-points">
                                <Star size={18} fill="#FFD700" color="#FFD700" />
                                <span>2850 pts</span>
                            </div>
                        </div>

                        <div className="leaderboard-item rank-2">
                            <div className="rank-badge silver">
                                <Medal size={24} />
                                <span>2</span>
                            </div>
                            <div className="student-info">
                                <User size={20} />
                                <div>
                                    <p className="student-name">Diya Sharma</p>
                                    <p className="student-class">Grade 8th B</p>
                                </div>
                            </div>
                            <div className="student-points">
                                <Star size={18} fill="#C0C0C0" color="#C0C0C0" />
                                <span>2340 pts</span>
                            </div>
                        </div>

                        <div className="leaderboard-item rank-3">
                            <div className="rank-badge bronze">
                                <Medal size={24} />
                                <span>3</span>
                            </div>
                            <div className="student-info">
                                <User size={20} />
                                <div>
                                    <p className="student-name">Rohan Mehta</p>
                                    <p className="student-class">Grade 10th B</p>
                                </div>
                            </div>
                            <div className="student-points">
                                <Star size={18} fill="#CD7F32" color="#CD7F32" />
                                <span>2180 pts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="achievements-cta-section">
                    <div className="achievements-cta-decorative"></div>
                    <h2>Keep Earning Achievements!</h2>
                    <p>Stay motivated and unlock more badges and rewards</p>
                    <div className="achievements-cta-buttons">
                        <button className="achievements-cta-button-primary">
                            <Target size={18} />
                            View All Challenges
                        </button>
                        <button className="achievements-cta-button-secondary">
                            <Download size={18} />
                            Download Certificate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievements;