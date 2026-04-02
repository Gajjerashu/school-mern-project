import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Award, Heart, Brain, Target, Star, ChevronRight } from 'lucide-react';

const PrimeSchool = () => {
    const [activeGrade, setActiveGrade] = useState('grade1');

    // Grade 1 Teachers
    const grade1Teachers = [
        {
            name: "Mrs. Priya Sharma",
            designation: "Grade 1 - Class Teacher",
            qualification: "M.Ed, B.Ed in Early Childhood",
            experience: "15 years",
            specialization: "Foundational Literacy",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
            description: "Expert in phonics and early reading skills. Creates engaging activities to build strong language foundations."
        },
        {
            name: "Ms. Anjali Verma",
            designation: "Grade 1 - English Teacher",
            qualification: "MA English, B.Ed",
            experience: "12 years",
            specialization: "Creative Writing",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
            description: "Makes learning fun through stories, rhymes, and interactive games. Develops reading comprehension."
        },
        {
            name: "Mr. Rajesh Kumar",
            designation: "Grade 1 - Math Teacher",
            qualification: "M.Sc Mathematics, B.Ed",
            experience: "10 years",
            specialization: "Number Sense",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            description: "Uses manipulatives and visual aids to teach counting, addition, subtraction through playful methods."
        },
        {
            name: "Mrs. Meera Patel",
            designation: "Grade 1 - EVS Teacher",
            qualification: "M.Sc Botany, B.Ed",
            experience: "11 years",
            specialization: "Nature Studies",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            description: "Introduces children to plants, animals, and environment through hands-on nature exploration."
        },
        {
            name: "Ms. Kavita Singh",
            designation: "Grade 1 - Art Teacher",
            qualification: "BFA, Diploma in Art Education",
            experience: "9 years",
            specialization: "Creative Arts",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            description: "Nurtures creativity through drawing, coloring, clay modeling, and craft activities."
        }
    ];

    // Grade 2 Teachers
    const grade2Teachers = [
        {
            name: "Mrs. Sneha Gupta",
            designation: "Grade 2 - Class Teacher",
            qualification: "M.Ed, MA English",
            experience: "14 years",
            specialization: "Reading Fluency",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
            description: "Builds reading confidence and comprehension. Introduces chapter books and story writing."
        },
        {
            name: "Mr. Vikram Desai",
            designation: "Grade 2 - Math Teacher",
            qualification: "M.Sc Mathematics, B.Ed",
            experience: "13 years",
            specialization: "Mental Math",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            description: "Teaches multiplication, division basics, word problems through practical examples."
        },
        {
            name: "Mrs. Pooja Reddy",
            designation: "Grade 2 - Science Teacher",
            qualification: "M.Sc Physics, B.Ed",
            experience: "10 years",
            specialization: "Elementary Science",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            description: "Conducts simple experiments to teach basic scientific concepts and observation skills."
        },
        {
            name: "Mr. Amit Joshi",
            designation: "Grade 2 - Social Studies",
            qualification: "MA History, B.Ed",
            experience: "11 years",
            specialization: "Community Studies",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            description: "Teaches about family, community, helpers, and basic geography through activities."
        },
        {
            name: "Mrs. Ritu Malhotra",
            designation: "Grade 2 - Hindi Teacher",
            qualification: "MA Hindi, B.Ed",
            experience: "9 years",
            specialization: "Hindi Literature",
            image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
            description: "Develops Hindi reading and writing skills through stories, poems, and conversations."
        }
    ];

    // Grade 3 Teachers
    const grade3Teachers = [
        {
            name: "Mr. Karan Malhotra",
            designation: "Grade 3 - Class Teacher",
            qualification: "M.Ed, M.Sc Physics",
            experience: "16 years",
            specialization: "STEM Education",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
            description: "Introduces scientific thinking and problem-solving skills. Makes learning engaging and practical."
        },
        {
            name: "Mrs. Deepa Nair",
            designation: "Grade 3 - English Teacher",
            qualification: "MA English Literature, B.Ed",
            experience: "14 years",
            specialization: "Grammar & Composition",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
            description: "Teaches paragraph writing, grammar rules, and develops reading comprehension skills."
        },
        {
            name: "Mr. Suresh Iyer",
            designation: "Grade 3 - Mathematics",
            qualification: "M.Sc Mathematics, B.Ed",
            experience: "12 years",
            specialization: "Problem Solving",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
            description: "Focuses on multiplication tables, fractions, geometry basics through interactive methods."
        },
        {
            name: "Mrs. Nisha Kapoor",
            designation: "Grade 3 - Science Teacher",
            qualification: "M.Sc Chemistry, B.Ed",
            experience: "13 years",
            specialization: "Experimental Science",
            image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
            description: "Conducts lab experiments teaching life science, matter, energy concepts hands-on."
        },
        {
            name: "Mr. Arun Chopra",
            designation: "Grade 3 - Social Studies",
            qualification: "MA Geography, B.Ed",
            experience: "11 years",
            specialization: "Geography",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
            description: "Teaches map reading, Indian states, world geography through projects and models."
        }
    ];

    // Grade 4 Teachers
    const grade4Teachers = [
        {
            name: "Mrs. Rina Thomas",
            designation: "Grade 4 - Class Teacher",
            qualification: "M.Ed, MA Political Science",
            experience: "15 years",
            specialization: "Critical Thinking",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
            description: "Develops analytical and reasoning skills. Prepares students for advanced academic challenges."
        },
        {
            name: "Mr. Arjun Patel",
            designation: "Grade 4 - Mathematics",
            qualification: "M.Sc Mathematics, B.Ed",
            experience: "13 years",
            specialization: "Advanced Math",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
            description: "Teaches decimals, measurements, data handling, and prepares for math olympiads."
        },
        {
            name: "Mrs. Shalini Rao",
            designation: "Grade 4 - English Teacher",
            qualification: "MA English, CELTA Certified",
            experience: "14 years",
            specialization: "Creative Writing",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
            description: "Teaches essay writing, comprehension, vocabulary building through literature study."
        },
        {
            name: "Mr. Prakash Menon",
            designation: "Grade 4 - Science Teacher",
            qualification: "M.Sc Biology, B.Ed",
            experience: "12 years",
            specialization: "Life Sciences",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
            description: "Explores human body, ecosystems, and environmental science through experiments."
        },
        {
            name: "Mrs. Geeta Sharma",
            designation: "Grade 4 - Social Studies",
            qualification: "MA History, B.Ed",
            experience: "11 years",
            specialization: "Indian History",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
            description: "Teaches ancient civilizations, Indian freedom struggle, and civics engagingly."
        }
    ];

    // Grade 5 Teachers
    const grade5Teachers = [
        {
            name: "Dr. Ramesh Kumar",
            designation: "Grade 5 - Principal & Head",
            qualification: "Ph.D. Education, M.Ed",
            experience: "20 years",
            specialization: "Educational Leadership",
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
            description: "Prepares students for middle school transition. Focuses on competitive exam readiness."
        },
        {
            name: "Mrs. Lakshmi Iyer",
            designation: "Grade 5 - Mathematics",
            qualification: "M.Sc Mathematics, M.Phil",
            experience: "16 years",
            specialization: "Advanced Mathematics",
            image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
            description: "Teaches algebra basics, advanced geometry, percentage, ratio for competitive exams."
        },
        {
            name: "Mr. Rohan Mehta",
            designation: "Grade 5 - English Teacher",
            qualification: "MA English Literature, B.Ed",
            experience: "15 years",
            specialization: "Literature & Grammar",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
            description: "Advanced grammar, essay writing, comprehension, and public speaking training."
        },
        {
            name: "Mrs. Priyanka Jain",
            designation: "Grade 5 - Science Teacher",
            qualification: "M.Sc Chemistry, Ph.D. Scholar",
            experience: "14 years",
            specialization: "General Science",
            image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400",
            description: "Comprehensive science coverage - physics, chemistry, biology for competitive exams."
        },
        {
            name: "Mr. Vivek Singh",
            designation: "Grade 5 - Social Science",
            qualification: "MA Political Science, B.Ed",
            experience: "13 years",
            specialization: "Civics & History",
            image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400",
            description: "Indian constitution, world history, current affairs, and research project guidance."
        }
    ];

    const allGrades = {
        grade1: { teachers: grade1Teachers, title: "Grade 1", subtitle: "Foundation Building" },
        grade2: { teachers: grade2Teachers, title: "Grade 2", subtitle: "Skills Development" },
        grade3: { teachers: grade3Teachers, title: "Grade 3", subtitle: "Conceptual Learning" },
        grade4: { teachers: grade4Teachers, title: "Grade 4", subtitle: "Advanced Concepts" },
        grade5: { teachers: grade5Teachers, title: "Grade 5", subtitle: "Pre-Middle School" }
    };

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

                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 1rem' }}>
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
                        }}>🎓</div>
                        <h1 style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: '#000',
                            marginBottom: '1rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>Prime School</h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#000',
                            maxWidth: '800px',
                            margin: '0 auto',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}>
                            Excellence in Education • Grades 1-5 • Building Tomorrow's Leaders
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
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 1rem' }}>

                {/* Grade Tabs */}
                <div style={{
                    background: '#fff',
                    borderRadius: '25px',
                    padding: '1.5rem',
                    boxShadow: '0 15px 50px rgba(46, 125, 50, 0.15)',
                    marginBottom: '3rem',
                    border: '2px solid #E8F5E9'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                    }}>
                        {Object.keys(allGrades).map((gradeKey) => (
                            <button
                                key={gradeKey}
                                onClick={() => setActiveGrade(gradeKey)}
                                style={{
                                    background: activeGrade === gradeKey ? 'linear-gradient(135deg, #2ECC71, #27ae60)' : 'transparent',
                                    border: 'none',
                                    color: activeGrade === gradeKey ? '#fff' : '#2e7d32',
                                    padding: '1rem 2rem',
                                    borderRadius: '20px',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    boxShadow: activeGrade === gradeKey ? '0 8px 25px rgba(76, 175, 80, 0.4)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeGrade !== gradeKey) {
                                        e.target.style.background = 'rgba(46, 204, 113, 0.1)';
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
                    background: 'linear-gradient(135deg, #E8F5E9 0%, #f1f8f4 100%)',
                    padding: '2.5rem',
                    borderRadius: '20px',
                    marginBottom: '3rem',
                    borderLeft: '6px solid #2ECC71',
                    boxShadow: '0 10px 30px rgba(46, 125, 50, 0.1)'
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
                        <Star size={35} style={{ color: '#2ECC71' }} fill="#2ECC71" />
                        {allGrades[activeGrade].title}
                    </h2>
                    <p style={{
                        color: '#2ECC71',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        margin: 0
                    }}>
                        {allGrades[activeGrade].subtitle}
                    </p>
                </div>

                {/* Section Heading */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: '#000',
                        marginBottom: '0.5rem'
                    }}>Our Expert Faculty</h2>
                    <p style={{
                        color: '#4a5568',
                        fontSize: '1.2rem'
                    }}>Meet the dedicated teachers of {allGrades[activeGrade].title}</p>
                </div>

                {/* Teachers Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}>
                    {allGrades[activeGrade].teachers.map((teacher, index) => (
                        <div
                            key={index}
                            style={{
                                background: '#fff',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                border: '2px solid #E8F5E9',
                                boxShadow: '0 15px 45px rgba(46, 125, 50, 0.08)',
                                transition: 'all 0.5s',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-15px)';
                                e.currentTarget.style.boxShadow = '0 25px 60px rgba(46, 125, 50, 0.2)';
                                e.currentTarget.style.borderColor = '#c8e6c9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 15px 45px rgba(46, 125, 50, 0.08)';
                                e.currentTarget.style.borderColor = '#E8F5E9';
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                height: '320px',
                                overflow: 'hidden',
                                background: 'linear-gradient(135deg, #f1f8f4, #e8f5e9)'
                            }}>
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'linear-gradient(135deg, #2ECC71, #27ae60)',
                                    color: '#fff',
                                    padding: '8px 18px',
                                    borderRadius: '25px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    <Star size={14} fill="white" />
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
                                <div style={{
                                    color: '#2ECC71',
                                    fontWeight: '700',
                                    fontSize: '1.05rem',
                                    marginBottom: '1rem'
                                }}>{teacher.designation}</div>

                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{
                                        background: '#f1f8f4',
                                        color: '#2e7d32',
                                        padding: '6px 14px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        border: '1px solid #e8f5e9'
                                    }}>{teacher.specialization}</span>
                                </div>

                                <div style={{
                                    color: '#4a5568',
                                    fontSize: '0.95rem',
                                    marginBottom: '1rem',
                                    fontWeight: '500'
                                }}>
                                    🎓 {teacher.qualification}
                                </div>

                                <p style={{
                                    color: '#4a5568',
                                    fontSize: '1rem',
                                    lineHeight: '1.7',
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '2px solid #f1f8f4',
                                    margin: 0
                                }}>
                                    {teacher.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrimeSchool;