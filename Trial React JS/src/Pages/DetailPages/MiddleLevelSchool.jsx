import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Award, Heart, Brain, Target, Star, ChevronRight, Sparkles, GraduationCap, CheckCircle, Trophy } from 'lucide-react';

const MiddleLevelSchool = () => {
    const [activeGrade, setActiveGrade] = useState('grade6');

    // Grade 6 Teachers
    const grade6Teachers = [
        {
            name: "Dr. Anita Deshmukh",
            designation: "Grade 6 - Class Teacher",
            qualification: "Ph.D. Education, M.Ed",
            experience: "18 years",
            specialization: "Adolescent Psychology",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
            description: "Expert in transition from primary to middle school. Focuses on building confidence and study habits for teenage learners."
        },
        {
            name: "Mr. Sanjay Kulkarni",
            designation: "Grade 6 - Mathematics",
            qualification: "M.Sc Mathematics, B.Ed",
            experience: "16 years",
            specialization: "Algebra & Geometry",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            description: "Introduces algebraic concepts, advanced geometry, and mathematical reasoning for competitive examinations."
        },
        {
            name: "Mrs. Kavita Rao",
            designation: "Grade 6 - Science Teacher",
            qualification: "M.Sc Physics, M.Ed",
            experience: "15 years",
            specialization: "Physical Sciences",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
            description: "Makes physics and chemistry concepts clear through lab experiments and real-world applications."
        },
        {
            name: "Mr. Rahul Joshi",
            designation: "Grade 6 - English Teacher",
            qualification: "MA English Literature, B.Ed",
            experience: "14 years",
            specialization: "Literature & Communication",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            description: "Develops advanced reading comprehension, essay writing, and effective communication skills."
        },
        {
            name: "Mrs. Sunita Sharma",
            designation: "Grade 6 - Social Science",
            qualification: "MA History, M.Ed",
            experience: "13 years",
            specialization: "Ancient History",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            description: "Teaches world history, geography, and civics through interactive projects and discussions."
        }
    ];

    // Grade 7 Teachers
    const grade7Teachers = [
        {
            name: "Mr. Prakash Menon",
            designation: "Grade 7 - Class Teacher",
            qualification: "M.Ed, M.Sc Biology",
            experience: "17 years",
            specialization: "Life Sciences",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            description: "Prepares students for NCERT advanced concepts. Focus on research-based learning and project work."
        },
        {
            name: "Mrs. Priya Nair",
            designation: "Grade 7 - Mathematics",
            qualification: "M.Sc Mathematics, M.Phil",
            experience: "16 years",
            specialization: "Applied Mathematics",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
            description: "Teaches rational numbers, linear equations, data handling, and prepares for math olympiads."
        },
        {
            name: "Dr. Rajesh Kumar",
            designation: "Grade 7 - Science Teacher",
            qualification: "Ph.D. Chemistry, B.Ed",
            experience: "15 years",
            specialization: "Chemistry",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
            description: "Introduces chemical reactions, acids-bases, and organic chemistry through practical demonstrations."
        },
        {
            name: "Mrs. Meera Patel",
            designation: "Grade 7 - English Teacher",
            qualification: "MA English, CELTA Certified",
            experience: "14 years",
            specialization: "Grammar & Composition",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            description: "Advanced grammar, creative writing, debate, and public speaking training for competitions."
        },
        {
            name: "Mr. Arun Verma",
            designation: "Grade 7 - Social Science",
            qualification: "MA Political Science, B.Ed",
            experience: "13 years",
            specialization: "Civics & Geography",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
            description: "Teaches Indian constitution, world geography, and develops critical thinking about current affairs."
        }
    ];

    // Grade 8 Teachers
    const grade8Teachers = [
        {
            name: "Mrs. Lakshmi Iyer",
            designation: "Grade 8 - Class Teacher",
            qualification: "M.Ed, MA Economics",
            experience: "19 years",
            specialization: "Economics & Commerce",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
            description: "Prepares students for high school transition. Introduces career counseling and stream selection guidance."
        },
        {
            name: "Dr. Vikram Singh",
            designation: "Grade 8 - Mathematics",
            qualification: "Ph.D. Mathematics, M.Sc",
            experience: "18 years",
            specialization: "Advanced Mathematics",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
            description: "Teaches quadratic equations, coordinate geometry, mensuration for board exam preparation."
        },
        {
            name: "Mrs. Sneha Reddy",
            designation: "Grade 8 - Science Teacher",
            qualification: "M.Sc Biology, M.Phil",
            experience: "16 years",
            specialization: "Biology",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
            description: "Covers human biology, genetics, ecology with lab practicals and field studies."
        },
        {
            name: "Mr. Arjun Malhotra",
            designation: "Grade 8 - English Teacher",
            qualification: "MA English Literature, B.Ed",
            experience: "15 years",
            specialization: "Literature Analysis",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
            description: "Advanced literature study, essay writing for board exams, and competitive exam preparation."
        },
        {
            name: "Mrs. Geeta Kapoor",
            designation: "Grade 8 - Social Science",
            qualification: "MA History, M.Ed",
            experience: "14 years",
            specialization: "Modern History",
            image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
            description: "Teaches modern Indian history, freedom struggle, world wars, and contemporary politics."
        }
    ];

    const allGrades = {
        grade6: { teachers: grade6Teachers, title: "Grade 6", subtitle: "Foundation of Middle School" },
        grade7: { teachers: grade7Teachers, title: "Grade 7", subtitle: "Building Advanced Concepts" },
        grade8: { teachers: grade8Teachers, title: "Grade 8", subtitle: "Pre-High School Excellence" }
    };

    const achievements = [
        { icon: <Trophy size={56} />, stat: "95%", label: "Excellence Rate", desc: "Students achieving distinction", color: '#27ae60' },
        { icon: <Target size={56} />, stat: "18+", label: "Experienced Faculty", desc: "Years of teaching expertise", color: '#2ecc71' },
        { icon: <Award size={56} />, stat: "100%", label: "Success Stories", desc: "Students progressing to high school", color: '#1b5e20' },
        { icon: <Users size={56} />, stat: "500+", label: "Happy Students", desc: "Growing annually", color: '#145a32' }
    ];

    const features = [
        "Expert faculty specialized in middle school curriculum",
        "Interactive learning with modern teaching methods",
        "Regular assessments and progress tracking",
        "Holistic development programs",
        "Advanced laboratories for practical learning",
        "Individual attention and mentoring",
        "Extracurricular activities and sports",
        "Preparation for competitive examinations"
    ];

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #f0fdf4 100%)',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #A3D9A3 0%, #2ECC71 100%)',
                padding: '3rem 1rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    top: '-100px',
                    right: '-50px'
                }}></div>
                <div style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    bottom: '-50px',
                    left: '-30px'
                }}></div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <button
                        onClick={() => window.history.back()}
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

                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '5rem',
                            marginBottom: '1rem',
                            animation: 'float 3s ease-in-out infinite'
                        }}>📖</div>
                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: '#000',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>Middle Level School</h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}>
                            Academic Excellence • Grades 6-8 • Preparing Future Achievers
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'linear-gradient(135deg, #E8F5E9 0%, #fff 100%)',
                                borderRadius: '20px',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                border: '2px solid #A3D9A3',
                                transition: 'transform 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ color: achievement.color, marginBottom: '1rem' }}>
                                {achievement.icon}
                            </div>
                            <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#000', marginBottom: '0.5rem' }}>
                                {achievement.stat}
                            </div>
                            <p style={{ fontSize: '1.1rem', color: '#000', margin: 0, fontWeight: '600', marginBottom: '0.5rem' }}>
                                {achievement.label}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#000', margin: 0, opacity: 0.7 }}>
                                {achievement.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Grade Tabs */}
                <div style={{
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '1rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    border: '2px solid #E8F5E9',
                    marginBottom: '3rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {Object.keys(allGrades).map((gradeKey) => (
                            <button
                                key={gradeKey}
                                onClick={() => setActiveGrade(gradeKey)}
                                style={{
                                    background: activeGrade === gradeKey
                                        ? 'linear-gradient(135deg, #2ECC71, #27ae60)'
                                        : 'transparent',
                                    color: activeGrade === gradeKey ? '#000' : '#000',
                                    border: 'none',
                                    padding: '1rem 2.5rem',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    boxShadow: activeGrade === gradeKey ? '0 8px 20px rgba(46, 204, 113, 0.3)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeGrade !== gradeKey) {
                                        e.target.style.background = 'rgba(163, 217, 163, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeGrade !== gradeKey) {
                                        e.target.style.background = 'transparent';
                                    }
                                }}
                            >
                                {allGrades[gradeKey].title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grade Info Banner */}
                <div style={{
                    background: '#E8F5E9',
                    borderRadius: '24px',
                    padding: '3rem',
                    marginBottom: '4rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    border: '3px solid #A3D9A3'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#000',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <Star size={40} color="#27ae60" fill="#27ae60" />
                        {allGrades[activeGrade].title}
                    </h2>
                    <p style={{
                        color: '#27ae60',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        margin: 0
                    }}>
                        {allGrades[activeGrade].subtitle}
                    </p>
                </div>

                {/* Section Title */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '1rem'
                }}>Our Expert Faculty</h2>
                <div style={{
                    width: '100px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #A3D9A3, #2ECC71)',
                    margin: '0 auto 3rem'
                }}></div>

                {/* Teachers Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {allGrades[activeGrade].teachers.map((teacher, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#fff',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                border: '2px solid #E8F5E9',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(46, 204, 113, 0.2)';
                                e.currentTarget.style.borderColor = '#2ECC71';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = '#E8F5E9';
                            }}
                        >
                            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'linear-gradient(135deg, #2ECC71, #27ae60)',
                                    color: '#000',
                                    padding: '8px 18px',
                                    borderRadius: '25px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }}>
                                    <Star size={14} fill="#000" />
                                    {teacher.experience}
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: '#000',
                                    marginBottom: '0.5rem'
                                }}>{teacher.name}</h3>

                                <p style={{
                                    color: '#27ae60',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    marginBottom: '1rem'
                                }}>{teacher.designation}</p>

                                <div style={{
                                    background: 'linear-gradient(135deg, #E8F5E9, #A3D9A3)',
                                    color: '#000',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    display: 'inline-block',
                                    marginBottom: '1rem'
                                }}>
                                    {teacher.specialization}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <GraduationCap size={18} color="#27ae60" />
                                    <span style={{ color: '#000', fontSize: '0.95rem', fontWeight: '500' }}>
                                        {teacher.qualification}
                                    </span>
                                </div>

                                <p style={{
                                    color: '#000',
                                    fontSize: '1rem',
                                    lineHeight: '1.7',
                                    margin: 0,
                                    paddingTop: '1rem',
                                    borderTop: '2px solid #E8F5E9'
                                }}>
                                    {teacher.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #E8F5E9 0%, #A3D9A3 100%)',
                    borderRadius: '30px',
                    padding: '3rem',
                    marginBottom: '5rem',
                    boxShadow: '0 15px 50px rgba(0,0,0,0.08)'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        textAlign: 'center',
                        color: '#000',
                        marginBottom: '3rem'
                    }}>Why Choose Our Middle School Program</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                style={{
                                    background: '#fff',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div style={{
                                    background: 'linear-gradient(135deg, #2ECC71, #27ae60)',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    flexShrink: 0
                                }}>
                                    <CheckCircle size={20} style={{ color: '#fff' }} />
                                </div>
                                <p style={{ color: '#000', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #2ECC71 0%, #27ae60 100%)',
                    borderRadius: '30px',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(46, 204, 113, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '400px',
                        height: '400px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        top: '-200px',
                        right: '-100px'
                    }}></div>

                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        color: '#000',
                        marginBottom: '1rem',
                        position: 'relative',
                        zIndex: 1
                    }}>Build Strong Foundations</h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#000',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        Join our middle school program for comprehensive education and holistic development
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <button
                            style={{
                                background: '#fff',
                                color: '#000',
                                border: 'none',
                                padding: '1.25rem 3rem',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                            }}
                        >
                            Apply for Admission
                        </button>
                        <button
                            style={{
                                background: 'transparent',
                                color: '#000',
                                border: '2px solid #000',
                                padding: '1.25rem 3rem',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#fff';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Download Prospectus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiddleLevelSchool;