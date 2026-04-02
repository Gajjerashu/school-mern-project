import React from 'react';
import { ArrowLeft, Music, Palette, Trophy, Drama, Camera, Globe, Star, Sparkles, Award } from 'lucide-react';
import "./ExcellenceInEducation.css";
const ExtracurricularActivities = () => {
    const benefits = [
        "Develops creativity, confidence, and leadership skills",
        "Provides platform for talent exploration and expression",
        "Builds teamwork, discipline, and time management abilities",
        "Enhances physical fitness and mental wellbeing",
        "Prepares students for competitions and performances",
        "Creates opportunities for personal growth and social connections"
    ];

    const activities = [
        {
            icon: <Trophy className="w-12 h-12" />,
            title: "Sports & Athletics",
            description: "Cricket, football, basketball, badminton, table tennis, athletics, yoga, and various indoor/outdoor sports with professional coaching."
        },
        {
            icon: <Music className="w-12 h-12" />,
            title: "Music & Dance",
            description: "Vocal and instrumental music training, classical and contemporary dance classes, orchestra, and regular cultural performances."
        },
        {
            icon: <Palette className="w-12 h-12" />,
            title: "Arts & Crafts",
            description: "Painting, sketching, pottery, sculpture, creative arts, and various craft activities to nurture artistic expression."
        },
        {
            icon: <Drama className="w-12 h-12" />,
            title: "Drama & Theater",
            description: "Acting workshops, theater productions, public speaking, debate competitions, and dramatic arts training."
        },
        {
            icon: <Camera className="w-12 h-12" />,
            title: "Photography & Media",
            description: "Photography club, video production, journalism, school magazine, and digital media creation activities."
        },
        {
            icon: <Globe className="w-12 h-12" />,
            title: "Cultural Activities",
            description: "Annual day celebrations, cultural festivals, heritage programs, language clubs, and inter-school competitions."
        }
    ];

    const clubs = [
        { icon: <Sparkles className="w-6 h-6" />, text: "Science & Robotics Club" },
        { icon: <Palette className="w-6 h-6" />, text: "Literature & Creative Writing Club" },
        { icon: <Trophy className="w-6 h-6" />, text: "Mathematics & Quiz Club" },
        { icon: <Globe className="w-6 h-6" />, text: "Environmental & Nature Club" },
        { icon: <Award className="w-6 h-6" />, text: "Community Service Club" },
        { icon: <Camera className="w-6 h-6" />, text: "Technology & Innovation Club" },
        { icon: <Music className="w-6 h-6" />, text: "Music & Dance Club" },
        { icon: <Drama className="w-6 h-6" />, text: "Sports & Fitness Club" }
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
                        }}>🌟</div>
                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: '#000',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>Extracurricular Activities</h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}>
                            At InspireEdge, we believe in developing well-rounded personalities through extensive extracurricular activities.
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
                            Beyond the Classroom
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            Education is not just about textbooks and exams. We provide a vibrant ecosystem of activities that allow students to explore their interests and discover hidden talents.
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
                            Holistic Development
                        </h3>
                        <p style={{ fontSize: '1.1rem', color: '#000', lineHeight: '1.8' }}>
                            Our programs develop creativity, leadership, teamwork, and self-confidence while students participate in competitions, cultural events, and community service.
                        </p>
                    </div>
                </div>

                {/* Activities Grid */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem',
                    position: 'relative'
                }}>
                    Our Activity Programs
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
                    {activities.map((activity, index) => (
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
                                {activity.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#000',
                                marginBottom: '1rem'
                            }}>{activity.title}</h3>
                            <p style={{
                                fontSize: '1rem',
                                color: '#000',
                                lineHeight: '1.7'
                            }}>{activity.description}</p>
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
                    }}>Benefits of Participation</h2>
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

                {/* Clubs Section */}
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '3rem'
                }}>Student Clubs & Societies</h2>
                <div style={{ marginBottom: '5rem' }}>
                    {clubs.map((club, index) => (
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
                                {club.icon}
                            </div>
                            <p style={{ color: '#000', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                                {club.text}
                            </p>
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
                    }}>Discover Your Passion</h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#000',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        Join InspireEdge and explore endless opportunities for growth and self-discovery.
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
                        View Activity Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtracurricularActivities;