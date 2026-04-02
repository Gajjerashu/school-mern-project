import React from 'react';
import { ArrowLeft, BookOpen, Users, Microscope, Globe, Calculator, Palette, Trophy, CheckCircle, Star, Sparkles, TrendingUp } from 'lucide-react';

const MiddleSchool = () => {
    const subjects = [
        {
            icon: <BookOpen className="w-12 h-12" />,
            title: "Language Arts",
            description: "English, Hindi, and optional third language with focus on reading, writing, and communication skills."
        },
        {
            icon: <Calculator className="w-12 h-12" />,
            title: "Mathematics",
            description: "Algebra, geometry, and practical mathematics building strong analytical and problem-solving abilities."
        },
        {
            icon: <Microscope className="w-12 h-12" />,
            title: "Science",
            description: "Physics, Chemistry, and Biology with hands-on experiments and project-based learning."
        },
        {
            icon: <Globe className="w-12 h-12" />,
            title: "Social Studies",
            description: "History, Geography, Civics, and Economics developing global awareness and critical thinking."
        },
        {
            icon: <Palette className="w-12 h-12" />,
            title: "Arts & Culture",
            description: "Visual arts, music, and cultural activities nurturing creativity and self-expression."
        },
        {
            icon: <Trophy className="w-12 h-12" />,
            title: "Physical Education",
            description: "Sports, yoga, and fitness activities promoting physical health and team spirit."
        }
    ];

    const features = [
        "Interactive smart classrooms with digital learning tools",
        "Experienced teachers with specialized subject expertise",
        "Regular assessments and personalized feedback",
        "Project-based learning and practical experiments",
        "Life skills development and career orientation",
        "Co-curricular activities and club participation",
        "Parent-teacher collaboration for student progress",
        "Preparation for board examinations and beyond"
    ];

    const outcomes = [
        { icon: <CheckCircle className="w-6 h-6" />, text: "Strong foundation in core subjects for high school success" },
        { icon: <Star className="w-6 h-6" />, text: "Development of critical thinking and analytical skills" },
        { icon: <Sparkles className="w-6 h-6" />, text: "Enhanced communication and presentation abilities" },
        { icon: <TrendingUp className="w-6 h-6" />, text: "Increased confidence and leadership qualities" },
        { icon: <Users className="w-6 h-6" />, text: "Better time management and organizational skills" },
        { icon: <Trophy className="w-6 h-6" />, text: "Awareness of career options and future planning" }
    ];

    const stats = [
        { num: "6–8", label: "Classes", icon: <BookOpen size={56} />, color: '#27ae60' },
        { num: "15:1", label: "Student Ratio", icon: <Users size={56} />, color: '#2ecc71' },
        { num: "20+", label: "Subjects", icon: <Globe size={56} />, color: '#1b5e20' },
        { num: "100%", label: "Success Rate", icon: <Trophy size={56} />, color: '#145a32' }
    ];

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #f0fdf4 100%)',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>

            {/* Floating Header */}
            <div style={{
                background: 'linear-gradient(135deg, #A3D9A3 0%, #2ECC71 100%)',
                padding: '3rem 1rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
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

                    {/* FIXED EMOJI + HEADING BLOCK */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '5rem',
                            marginBottom: '1rem',
                            animation: 'float 3s ease-in-out infinite'
                        }}>📚</div>

                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: '#000',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>Middle School</h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}>
                            Class 6 to 8 — A transformative phase building foundations for lifelong learning.
                        </p>
                    </div>
                </div>
            </div>

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

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>

                {/* Intro Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem',
                    animation: 'slideIn 0.6s ease-out'
                }}>

                    <div style={{
                        background: '#E8F5E9',
                        borderRadius: '24px',
                        padding: '3rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        border: '3px solid #A3D9A3'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #2ECC71, #27ae60)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <Users className="w-8 h-8" style={{ color: '#fff' }} />
                        </div>

                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#000', marginBottom: '1rem' }}>
                            Building Tomorrow's Leaders
                        </h2>

                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            Middle school is a crucial stage in a student's journey. At InspireEdge, our program balances academic rigor with emotional and social growth.
                        </p>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #A3D9A3 0%, #2ECC71 100%)',
                        borderRadius: '24px',
                        padding: '3rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#000', marginBottom: '1rem' }}>
                            Transformative Learning
                        </h3>

                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            We inspire curiosity, teamwork, and leadership while developing critical thinking and diverse subject knowledge.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {stats.map((stat, index) => (
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
                            <div style={{ color: stat.color, marginBottom: '1rem' }}>
                                {stat.icon}
                            </div>

                            <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#000', marginBottom: '0.5rem' }}>
                                {stat.num}
                            </div>

                            <p style={{ fontSize: '1.1rem', color: '#000', margin: 0, fontWeight: '600' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Subjects */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>
                    Comprehensive Curriculum
                    <div style={{
                        width: '100px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #A3D9A3, #2ECC71)',
                        margin: '1rem auto 0'
                    }}></div>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '2.5rem',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                border: '2px solid #E8F5E9',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
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
                            <div style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '-30px',
                                width: '100px',
                                height: '100px',
                                background: 'rgba(163, 217, 163, 0.1)',
                                borderRadius: '50%'
                            }}></div>

                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #E8F5E9, #A3D9A3)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: '#000'
                            }}>
                                {subject.icon}
                            </div>

                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#000',
                                marginBottom: '1rem'
                            }}>
                                {subject.title}
                            </h3>

                            <p style={{
                                fontSize: '1rem',
                                color: '#000',
                                lineHeight: '1.7'
                            }}>
                                {subject.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Features */}
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
                    }}>Why Choose Our Middle School</h2>

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
                                    <Star size={20} style={{ color: '#fff' }} />
                                </div>

                                <p style={{ color: '#000', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Outcomes */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>
                    Expected Learning Outcomes
                </h2>

                <div style={{ marginBottom: '5rem' }}>
                    {outcomes.map((outcome, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                gap: '1.5rem',
                                alignItems: 'center',
                                background: '#fff',
                                padding: '1.5rem 2rem',
                                borderRadius: '16px',
                                marginBottom: '1rem',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                                borderLeft: '4px solid #2ECC71',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(10px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(46, 204, 113, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                            }}
                        >
                            {outcome.icon}
                            <p style={{ margin: 0, color: '#000', fontSize: '1.1rem' }}>{outcome.text}</p>
                        </div>
                    ))}

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
                        }}>Enroll Your Child Today</h2>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            marginBottom: '2rem',
                            maxWidth: '600px',
                            margin: '0 auto 2rem',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            Give your child the perfect foundation for academic and personal growth.
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
                                Schedule a Visit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiddleSchool;
