import React from 'react';
import { ArrowLeft, BookOpen, Users, Award, Target, TrendingUp, GraduationCap, Star, Sparkles, Trophy } from 'lucide-react';

const ExcellenceInEducation = () => {
  const benefits = [
    "Comprehensive curriculum aligned with national standards",
    "Innovative project-based learning methodologies",
    "Regular assessments & personalized feedback loops",
    "Focus on critical thinking & problem-solving",
    "Integration of life skills & values education",
    "Continuous teacher training & development",
  ];

  const programs = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Academic Excellence",
      description: "Structured curriculum emphasizing conceptual understanding and deep learning."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Personalized Learning",
      description: "Small class sizes ensuring individual attention and customized growth."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Skill Development",
      description: "Fostering creativity, communication & collaboration skills."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Goal-Oriented",
      description: "Mentoring students to achieve their personal best and beyond."
    }
  ];

  const environmentItems = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Interactive Classrooms",
      description: "Modern spaces designed to foster engagement and active participation with smart technology."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Learning",
      description: "Group-based activities that build teamwork, leadership and essential communication skills."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Achievement Focus",
      description: "An environment that celebrates milestones, personal growth, and academic victories."
    },
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
            }}>🎓</div>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '900',
              color: '#000',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>Excellence in Education</h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#000',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8',
              fontWeight: '500'
            }}>
              At InspireEdge, excellence is built through a comprehensive, student-centric journey designed to unlock potential at every stage.
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

        {/* Stats Section */}
        <div style={{
          background: 'linear-gradient(135deg, #2ECC71 0%, #27ae60 100%)',
          borderRadius: '30px',
          padding: '3rem 2rem',
          marginBottom: '5rem',
          boxShadow: '0 20px 60px rgba(46, 204, 113, 0.3)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { icon: <TrendingUp size={40} />, num: '95%', label: 'Student Success Rate' },
              { icon: <Award size={40} />, num: '50+', label: 'Global Awards' },
              { icon: <Users size={40} />, num: '15:1', label: 'Student Ratio' }
            ].map((stat, index) => (
              <div key={index} style={{ color: '#fff' }}>
                <div style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem' }}>
                  {stat.num}
                </div>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout - Benefits & Programs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
          animation: 'slideIn 0.6s ease-out'
        }}>
          {/* Benefits Card */}
          <div style={{
            background: '#E8F5E9',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '3px solid #A3D9A3'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#000', marginBottom: '2rem' }}>
              Our Core Benefits
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    padding: '1rem',
                    borderRadius: '12px',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <Star size={18} style={{ color: '#2ECC71', flexShrink: 0, marginTop: '2px' }} fill="#2ECC71" />
                  <p style={{ color: '#000', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#000', marginBottom: '2rem' }}>
              Our Excellence Programs
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {programs.map((program, index) => (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '2rem',
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
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    background: 'rgba(163, 217, 163, 0.1)',
                    borderRadius: '50%'
                  }}></div>

                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #E8F5E9, #A3D9A3)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: '#000'
                  }}>
                    {program.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#000',
                    marginBottom: '0.75rem'
                  }}>{program.title}</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#000',
                    lineHeight: '1.6',
                    margin: 0,
                    opacity: 0.8
                  }}>{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Environment */}
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
          }}>The Learning Environment</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {environmentItems.map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  padding: '2rem',
                  borderRadius: '16px',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
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
                  padding: '1.25rem',
                  color: '#27ae60',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#000', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#000', fontSize: '1rem', margin: 0, opacity: 0.8, lineHeight: '1.6' }}>
                    {item.description}
                  </p>
                </div>
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
          }}>Ready to Join InspireEdge School?</h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#000',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            position: 'relative',
            zIndex: 1
          }}>
            Unlock your child's full potential with our world-class education approach.
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
            Enquire for Admission
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcellenceInEducation;