import React from 'react';
import { ArrowLeft, Trophy, TrendingUp, Award, Star, Target, GraduationCap, Sparkles } from 'lucide-react';

const ProvenResults = () => {
    const benefits = [
        "Consistent high pass percentage in board examinations",
        "95% students secure admission in top colleges and universities",
        "Regular toppers in district and state-level competitions",
        "Strong foundation for competitive exam preparation",
        "Holistic development leading to all-round success",
        "Individual attention ensuring every student achieves their potential"
    ];

    const achievements = [
        {
            icon: <Trophy className="w-12 h-12" />,
            title: "Academic Excellence",
            description: "Consistently achieving 98%+ pass rates in board exams with numerous subject toppers and distinction holders."
        },
        {
            icon: <Award className="w-12 h-12" />,
            title: "College Admissions",
            description: "95% of our students secure admission in prestigious colleges including IITs, NITs, and top universities."
        },
        {
            icon: <Star className="w-12 h-12" />,
            title: "Competition Success",
            description: "Regular winners at state and national level Olympiads, science fairs, and academic competitions."
        },
        {
            icon: <Target className="w-12 h-12" />,
            title: "Career Readiness",
            description: "Strong foundation for competitive exams like JEE, NEET, UPSC, and other professional entrance tests."
        },
        {
            icon: <TrendingUp className="w-12 h-12" />,
            title: "Overall Development",
            description: "Students excel not just academically but also in sports, arts, leadership, and community service."
        },
        {
            icon: <GraduationCap className="w-12 h-12" />,
            title: "Alumni Success",
            description: "Our alumni are successful professionals in various fields including medicine, engineering, business, and civil services."
        }
    ];

    const statistics = [
        { value: "98%", label: "Board Exam Pass Rate", icon: <Trophy size={56} />, color: '#27ae60' },
        { value: "95%", label: "Top College Admissions", icon: <GraduationCap size={56} />, color: '#2ecc71' },
        { value: "150+", label: "Annual Awards Won", icon: <Award size={56} />, color: '#1b5e20' },
        { value: "85%", label: "Distinction Holders", icon: <Star size={56} />, color: '#145a32' },
        { value: "50+", label: "Subject Toppers", icon: <TrendingUp size={56} />, color: '#27ae60' },
        { value: "100+", label: "Competition Winners", icon: <Trophy size={56} />, color: '#2ecc71' }
    ];

    const testimonials = [
        {
            text: "InspireEdge gave me the perfect foundation for my IIT journey. The teachers' dedication and personalized attention made all the difference.",
            author: "Raj Patel",
            achievement: "IIT Bombay Graduate"
        },
        {
            text: "The holistic approach at InspireEdge helped me excel not just in academics but also in sports and leadership. It shaped my personality.",
            author: "Priya Sharma",
            achievement: "NEET Topper"
        },
        {
            text: "Thanks to InspireEdge's excellent teaching and guidance, I secured admission in my dream college. The support was incredible throughout.",
            author: "Arjun Desai",
            achievement: "NIT Surat Graduate"
        }
    ];

    const yearlyResults = [
        { year: "2023-24", rate: "99.2%", color: "#27ae60" },
        { year: "2022-23", rate: "98.8%", color: "#2ecc71" },
        { year: "2021-22", rate: "98.5%", color: "#145a32" }
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

                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '5rem',
                            marginBottom: '1rem',
                            animation: 'float 3s ease-in-out infinite'
                        }}>🏆</div>
                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: '#000',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>Proven Results</h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}>
                            Our track record speaks for itself with outstanding academic results and prestigious achievements.
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
                            <Trophy className="w-8 h-8" style={{ color: '#fff' }} />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#000', marginBottom: '1rem' }}>
                            Excellence That Speaks Volumes
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            At InspireEdge School, results represent the dreams we help students achieve, the potential we unlock, and the futures we build.
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
                            Consistent Success
                        </h3>
                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            Our experienced faculty, modern facilities, and personalized attention ensure every student gets the support they need to excel.
                        </p>
                    </div>
                </div>

                {/* Statistics Grid */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem',
                    position: 'relative'
                }}>
                    Our Achievement Numbers
                    <div style={{
                        width: '100px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #A3D9A3, #2ECC71)',
                        margin: '1rem auto 0'
                    }}></div>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {statistics.map((stat, index) => (
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
                                {stat.value}
                            </div>
                            <p style={{ fontSize: '1.1rem', color: '#000', margin: 0, fontWeight: '600' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Achievements Grid */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>Areas of Excellence</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {achievements.map((achievement, index) => (
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
                                {achievement.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#000',
                                marginBottom: '1rem'
                            }}>{achievement.title}</h3>
                            <p style={{
                                fontSize: '1rem',
                                color: '#000',
                                lineHeight: '1.7'
                            }}>{achievement.description}</p>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
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
                    }}>Result Highlights</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {benefits.map((benefit, index) => (
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
                                    {benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>Success Stories</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '2rem',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                border: '2px solid #E8F5E9',
                                transition: 'transform 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} style={{ color: '#f4b400' }} fill="#f4b400" />
                                ))}
                            </div>
                            <p style={{ fontStyle: 'italic', color: '#000', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                "{testimonial.text}"
                            </p>
                            <div style={{ borderTop: '2px solid #E8F5E9', paddingTop: '1rem' }}>
                                <p style={{ fontWeight: '700', color: '#000', marginBottom: '0.25rem' }}>
                                    {testimonial.author}
                                </p>
                                <p style={{ color: '#27ae60', fontSize: '0.875rem', margin: 0, fontWeight: '600' }}>
                                    {testimonial.achievement}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Yearly Results */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>Consistent Excellence Over the Years</h2>

                <div style={{ marginBottom: '5rem' }}>
                    {yearlyResults.map((data, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#fff',
                                padding: '2rem',
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
                            <div>
                                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#000', marginBottom: '0.25rem' }}>
                                    Academic Year {data.year}
                                </p>
                                <p style={{ color: '#000', margin: 0, opacity: 0.8 }}>
                                    Board Exam Results
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '3rem', fontWeight: '900', color: data.color, marginBottom: 0 }}>
                                    {data.rate}
                                </p>
                                <p style={{ fontSize: '0.875rem', color: '#000', margin: 0 }}>
                                    Pass Rate
                                </p>
                            </div>
                        </div>
                    ))}
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
                    }}>Be Part of Our Success Story</h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#000',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        Join InspireEdge and achieve excellence in your academic journey
                    </p>
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
                            transition: 'all 0.3s',
                            position: 'relative',
                            zIndex: 1
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
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProvenResults;