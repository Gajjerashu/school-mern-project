import React from 'react';
import { ArrowLeft, BookOpen, Atom, Calculator, TrendingUp, Briefcase, Users, Trophy, CheckCircle, Target, Star, Sparkles } from 'lucide-react';

const HighSchool = () => {
    const streams = [
        {
            icon: <Atom className="w-12 h-12" />,
            title: "Science Stream",
            description: "Physics, Chemistry, Biology/Mathematics preparing students for medical and engineering entrance exams like NEET, JEE."
        },
        {
            icon: <TrendingUp className="w-12 h-12" />,
            title: "Commerce Stream",
            description: "Accounting, Business Studies, Economics for future CA, MBA, and business professionals with practical knowledge."
        },
        {
            icon: <BookOpen className="w-12 h-12" />,
            title: "Arts Stream",
            description: "History, Political Science, Psychology, Sociology for students pursuing humanities, law, and social sciences."
        }
    ];

    const features = [
        "Experienced faculty specialized in board exam preparation",
        "Regular mock tests and practice papers",
        "Career counseling and college admission guidance",
        "Competitive exam preparation (JEE, NEET, CA, CLAT)",
        "Modern laboratories and digital learning resources",
        "Individual attention and doubt clearing sessions",
        "Personality development and soft skills training",
        "Industry visits and guest lectures from professionals"
    ];

    const outcomes = [
        { icon: <CheckCircle className="w-6 h-6" />, text: "Excellent board exam results with high distinction rates" },
        { icon: <Star className="w-6 h-6" />, text: "Admission to top colleges and universities" },
        { icon: <Trophy className="w-6 h-6" />, text: "Strong foundation for competitive entrance exams" },
        { icon: <Target className="w-6 h-6" />, text: "Clear career direction and professional readiness" },
        { icon: <Users className="w-6 h-6" />, text: "Leadership skills and confidence building" },
        { icon: <Sparkles className="w-6 h-6" />, text: "Research aptitude and analytical thinking" }
    ];

    const achievements = [
        { icon: <Trophy size={56} />, stat: "50+", label: "Board Toppers", desc: "Students scoring 90%+ annually", color: '#27ae60' },
        { icon: <Target size={56} />, stat: "85%", label: "IIT/NEET Success", desc: "Clearing entrance exams", color: '#2ecc71' },
        { icon: <Briefcase size={56} />, stat: "95%", label: "Top Colleges", desc: "Premier institution admissions", color: '#1b5e20' },
        { icon: <Users size={56} />, stat: "100%", label: "Career Ready", desc: "Personalized guidance", color: '#145a32' }
    ];

    const competitiveExams = [
        { name: "JEE", field: "Engineering", color: '#27ae60' },
        { name: "NEET", field: "Medical", color: '#2ecc71' },
        { name: "CA", field: "Chartered Accountancy", color: '#1b5e20' },
        { name: "CLAT", field: "Law", color: '#145a32' }
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
                        }}>🎯</div>
                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: '#000',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>High School</h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}>
                            Class 9 to 12 - The defining years building foundations for future careers.
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

                {/* Hero Introduction */}
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
                            <Target className="w-8 h-8" style={{ color: '#fff' }} />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#000', marginBottom: '1rem' }}>
                            Preparing for Excellence
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            High school at InspireEdge is where dreams take shape and futures are built with specialized streams in Science, Commerce, and Arts.
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
                            Expert Mentorship
                        </h3>
                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            Our expert faculty and proven methodologies ensure comprehensive preparation for board examinations and competitive entrance tests.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
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

                {/* Streams Grid */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem',
                    position: 'relative'
                }}>
                    Choose Your Stream
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
                    {streams.map((stream, index) => (
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
                                {stream.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#000',
                                marginBottom: '1rem'
                            }}>{stream.title}</h3>
                            <p style={{
                                fontSize: '1rem',
                                color: '#000',
                                lineHeight: '1.7'
                            }}>{stream.description}</p>
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
                    }}>Why Choose Our High School Program</h2>
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

                {/* Outcomes Section */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>Student Success Outcomes</h2>
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
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(46, 204, 113, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                            }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, #E8F5E9, #A3D9A3)',
                                borderRadius: '12px',
                                padding: '1rem',
                                color: '#27ae60'
                            }}>
                                {outcome.icon}
                            </div>
                            <p style={{ color: '#000', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                                {outcome.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Competitive Exams */}
                <div style={{
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '3rem',
                    marginBottom: '5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    border: '2px solid #E8F5E9'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        textAlign: 'center',
                        color: '#000',
                        marginBottom: '1.5rem'
                    }}>Competitive Exam Preparation</h2>
                    <p style={{ textAlign: 'center', color: '#000', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        We offer specialized coaching and guidance for various competitive entrance exams:
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {competitiveExams.map((exam, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'linear-gradient(135deg, #E8F5E9, #A3D9A3)',
                                    padding: '2rem',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <h4 style={{ fontSize: '1.75rem', fontWeight: '800', color: exam.color, marginBottom: '0.5rem' }}>
                                    {exam.name}
                                </h4>
                                <p style={{ color: '#000', fontSize: '0.9rem', margin: 0 }}>
                                    {exam.field}
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
                    }}>Shape Your Future with Us</h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#000',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        Join our high school program and get the best preparation for your dream career
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

export default HighSchool;