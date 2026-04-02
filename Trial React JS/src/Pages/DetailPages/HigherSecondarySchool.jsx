import React, { useState } from 'react';
import { ArrowLeft, Star, Trophy, Target, Award, Users, GraduationCap, CheckCircle } from 'lucide-react';
import './HigherSecondarySchool.css';

const HigherSecondarySchool = () => {
    const [activeGrade, setActiveGrade] = useState('grade9');

    const grade9Teachers = [
        {
            name: "Ms. Nidhi Sharma",
            designation: "Grade 9 - Class Teacher",
            qualification: "M.Ed, M.A. (Psychology)",
            experience: "12 years",
            specialization: "Adolescent Learning",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            description: "Helps students adapt to secondary level academics with focus on study techniques, habits and motivation."
        },
        {
            name: "Mr. Amit Joshi",
            designation: "Grade 9 - Mathematics",
            qualification: "M.Sc Mathematics, B.Ed",
            experience: "14 years",
            specialization: "Algebra & Geometry",
            image: "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=400",
            description: "Builds strong foundations in algebra, geometry and problem solving for higher studies."
        },
        {
            name: "Mrs. Ritu Bhandari",
            designation: "Grade 9 - Science",
            qualification: "M.Sc Physics, M.Ed",
            experience: "13 years",
            specialization: "Practical Labs",
            image: "https://images.unsplash.com/photo-1531123414780-f1b164f8f2d0?w=400",
            description: "Encourages hands-on experiments and inquiry-based learning to make science intuitive and fun."
        },
        {
            name: "Mr. Sandeep Rao",
            designation: "Grade 9 - English",
            qualification: "MA English, B.Ed",
            experience: "11 years",
            specialization: "Writing Skills",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
            description: "Focuses on comprehension, grammar and expression to prepare students for assessments."
        },
        {
            name: "Ms. Kavya Menon",
            designation: "Grade 9 - Social Science",
            qualification: "MA History, M.Ed",
            experience: "10 years",
            specialization: "History & Civics",
            image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400",
            description: "Teaches historical thinking, map skills and current affairs through projects."
        }
    ];

    const grade10Teachers = [
        {
            name: "Mr. Rakesh Bhat",
            designation: "Grade 10 - Class Teacher",
            qualification: "M.Ed, M.Sc (Education)",
            experience: "15 years",
            specialization: "Exam Strategy",
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
            description: "Guides Grade 10 students through board-style preparations and revision techniques."
        },
        {
            name: "Dr. Meera Iyer",
            designation: "Grade 10 - Mathematics",
            qualification: "Ph.D. Mathematics, M.Sc",
            experience: "16 years",
            specialization: "Board Preparation",
            image: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400",
            description: "Focuses on problem solving, mock tests and quick methods for board examinations."
        },
        {
            name: "Mrs. Alka Verma",
            designation: "Grade 10 - Science",
            qualification: "M.Sc Biology, NET",
            experience: "14 years",
            specialization: "Integrated Science",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            description: "Covers physics, chemistry and biology with exam-focused demonstrations."
        },
        {
            name: "Mr. Vivek Shah",
            designation: "Grade 10 - English",
            qualification: "MA English, CELTA",
            experience: "13 years",
            specialization: "Literature",
            image: "https://images.unsplash.com/photo-1531123414780-9f3d6b4a0e2f?w=400",
            description: "Prepares students for board reading and writing with model answers."
        },
        {
            name: "Ms. Priyanka Joshi",
            designation: "Grade 10 - Social Science",
            qualification: "MA Political Science, M.Ed",
            experience: "12 years",
            specialization: "Modern History",
            image: "https://images.unsplash.com/photo-1524504388940-3c0a6f3b7e9b?w=400",
            description: "Prepares students for map work and source-based questions."
        }
    ];

    const grade11Teachers = [
        {
            name: "Dr. Neha Shah",
            designation: "Grade 11 - Class Teacher",
            qualification: "Ph.D. Education, M.Ed",
            experience: "20 years",
            specialization: "Student Mentorship",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            description: "Guides students through Class 11 transition with focus on study plans."
        },
        {
            name: "Mr. Karan Mehta",
            designation: "Grade 11 - Physics",
            qualification: "M.Sc Physics, B.Ed",
            experience: "18 years",
            specialization: "Mechanics",
            image: "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=400",
            description: "Builds strong conceptual base in physics through labs and problem-solving."
        },
        {
            name: "Mrs. Shweta Iqbal",
            designation: "Grade 11 - Chemistry",
            qualification: "M.Sc Chemistry, NET",
            experience: "16 years",
            specialization: "Organic Chemistry",
            image: "https://images.unsplash.com/photo-1531123414780-f1b164f8f2d0?w=400",
            description: "Focuses on reaction mechanisms and numerical proficiency."
        },
        {
            name: "Mr. Vikram Desai",
            designation: "Grade 11 - Mathematics",
            qualification: "M.Sc Mathematics, M.Phil",
            experience: "17 years",
            specialization: "Calculus",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
            description: "Teaches rigorous mathematics for boards and entrance exams."
        },
        {
            name: "Ms. Anjali Rao",
            designation: "Grade 11 - English",
            qualification: "MA English, CELTA",
            experience: "15 years",
            specialization: "Communication",
            image: "https://images.unsplash.com/photo-1531123414780-9f3d6b4a0e2f?w=400",
            description: "Develops advanced reading and writing skills for academics."
        }
    ];

    const grade12Teachers = [
        {
            name: "Dr. Suresh Patil",
            designation: "Grade 12 - Class Teacher",
            qualification: "Ph.D. Education, M.Ed",
            experience: "22 years",
            specialization: "Exam Strategy",
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
            description: "Expert in final year preparation with revision strategy and improvement plans."
        },
        {
            name: "Mrs. Rina Kapoor",
            designation: "Grade 12 - Biology",
            qualification: "M.Sc Biology, M.Phil",
            experience: "19 years",
            specialization: "Genetics",
            image: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400",
            description: "Delivers concise concepts with lab demonstrations and exam-focused revisions."
        },
        {
            name: "Mr. Rohit Bhatia",
            designation: "Grade 12 - Mathematics",
            qualification: "Ph.D. Mathematics, M.Sc",
            experience: "20 years",
            specialization: "Advanced Calculus",
            image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400",
            description: "Covers board problems and competitive exam techniques with mock tests."
        },
        {
            name: "Ms. Leena D'Souza",
            designation: "Grade 12 - Chemistry",
            qualification: "Ph.D. Chemistry, NET",
            experience: "18 years",
            specialization: "Physical Chemistry",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            description: "Focus on concept clarity and numerical practice for boards."
        },
        {
            name: "Mr. Aditya Nair",
            designation: "Grade 12 - English",
            qualification: "MA English Literature, M.Ed",
            experience: "16 years",
            specialization: "Critical Analysis",
            image: "https://images.unsplash.com/photo-1524504388940-3c0a6f3b7e9b?w=400",
            description: "Prepares students for board exams with analysis and essays."
        }
    ];

    const allGrades = {
        grade9: { teachers: grade9Teachers, title: "Grade 9", subtitle: "Secondary Foundation" },
        grade10: { teachers: grade10Teachers, title: "Grade 10", subtitle: "Board Preparation" },
        grade11: { teachers: grade11Teachers, title: "Grade 11", subtitle: "Higher Studies Foundation" },
        grade12: { teachers: grade12Teachers, title: "Grade 12", subtitle: "Board Excellence" }
    };

    const achievements = [
        { icon: <Trophy size={56} />, stat: "98%", label: "Board Success", desc: "Students scoring distinction", color: '#27ae60' },
        { icon: <Target size={56} />, stat: "20+", label: "Expert Faculty", desc: "Years of experience", color: '#2ecc71' },
        { icon: <Award size={56} />, stat: "100%", label: "University Ready", desc: "College admissions", color: '#1b5e20' },
        { icon: <Users size={56} />, stat: "800+", label: "Alumni Success", desc: "Career achievements", color: '#145a32' }
    ];

    const features = [
        "Board examination focused curriculum",
        "Career counseling and stream guidance",
        "Competitive exam preparation",
        "Advanced laboratory facilities",
        "Regular mock tests",
        "Individual mentoring",
        "College admission guidance",
        "Personality development"
    ];

    return (
        <div className="higher-secondary-page">
            <div className="higher-secondary-header">
                <div className="higher-secondary-header-circle-1"></div>
                <div className="higher-secondary-header-circle-2"></div>

                <div className="higher-secondary-container">
                    <button className="higher-secondary-back-button" onClick={() => window.history.back()}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: '2px solid rgba(0,0,0,0.1)',
                            color: '#000',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                            marginBottom: '2rem'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.3)';
                            e.target.style.transform = 'translateX(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.2)';
                            e.target.style.transform = 'translateX(0)';
                        }}
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>

                    <div className="higher-secondary-header-content">
                        <div className="higher-secondary-header-emoji">🎓</div>
                        <h1 className="higher-secondary-header-title">Secondary & Higher Secondary</h1>
                        <p className="higher-secondary-header-subtitle">
                            Grades 9-12 • Board Excellence • Career Ready
                        </p>
                    </div>
                </div>
            </div>

            <div className="higher-secondary-main-content">
                <div className="higher-secondary-stats-grid">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="higher-secondary-stat-card">
                            <div className="higher-secondary-stat-icon" style={{ color: achievement.color }}>
                                {achievement.icon}
                            </div>
                            <div className="higher-secondary-stat-number">{achievement.stat}</div>
                            <p className="higher-secondary-stat-label">{achievement.label}</p>
                            <p className="higher-secondary-stat-desc">{achievement.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="higher-secondary-tabs-wrapper">
                    <div className="higher-secondary-tabs-container">
                        {Object.keys(allGrades).map((gradeKey) => (
                            <button
                                key={gradeKey}
                                onClick={() => setActiveGrade(gradeKey)}
                                className={`higher-secondary-tab ${activeGrade === gradeKey ? 'active' : ''}`}
                            >
                                {allGrades[gradeKey].title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="higher-secondary-grade-banner">
                    <h2 className="higher-secondary-grade-title">
                        <Star size={40} color="#27ae60" fill="#27ae60" />
                        {allGrades[activeGrade].title}
                    </h2>
                    <p className="higher-secondary-grade-subtitle">
                        {allGrades[activeGrade].subtitle}
                    </p>
                </div>

                <h2 className="higher-secondary-section-title">Our Expert Faculty</h2>
                <div className="higher-secondary-section-underline"></div>

                <div className="higher-secondary-teachers-grid">
                    {allGrades[activeGrade].teachers.map((teacher, index) => (
                        <div key={index} className="higher-secondary-teacher-card">
                            <div className="higher-secondary-teacher-image-wrapper">
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    className="higher-secondary-teacher-image"
                                />
                                <div className="higher-secondary-teacher-badge">
                                    <Star size={14} fill="#000" />
                                    {teacher.experience}
                                </div>
                            </div>

                            <div className="higher-secondary-teacher-content">
                                <h3 className="higher-secondary-teacher-name">{teacher.name}</h3>
                                <p className="higher-secondary-teacher-designation">{teacher.designation}</p>
                                <div className="higher-secondary-teacher-specialization">
                                    {teacher.specialization}
                                </div>
                                <div className="higher-secondary-teacher-qualification">
                                    <GraduationCap size={18} color="#27ae60" />
                                    <span>{teacher.qualification}</span>
                                </div>
                                <p className="higher-secondary-teacher-description">
                                    {teacher.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="higher-secondary-features-section">
                    <h2>Why Choose Our Secondary Program</h2>
                    <div className="higher-secondary-features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="higher-secondary-feature-card">
                                <div className="higher-secondary-feature-icon-box">
                                    <CheckCircle size={20} style={{ color: '#fff' }} />
                                </div>
                                <p>{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="higher-secondary-cta-section">
                    <div className="higher-secondary-cta-decorative"></div>
                    <h2>Achieve Board Excellence</h2>
                    <p>Join our secondary program for comprehensive board preparation</p>
                    <div className="higher-secondary-cta-buttons">
                        <button className="higher-secondary-cta-button-primary">
                            Apply for Admission
                        </button>
                        <button className="higher-secondary-cta-button-secondary">
                            Download Prospectus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HigherSecondarySchool;