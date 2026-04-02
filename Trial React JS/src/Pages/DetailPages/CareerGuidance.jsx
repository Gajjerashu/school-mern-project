// src/pages/CareerGuidance.jsx
import React, { useState } from 'react';
import './CareerGuidance.css';

const CareerGuidance = () => {
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [consultationForm, setConsultationForm] = useState({
        studentName: '',
        studentId: '',
        class: '',
        email: '',
        phone: '',
        careerInterest: '',
        message: '',
        consultationType: 'academic',
        preferredDate: '',
        preferredTime: ''
    });

    const stats = [
        { icon: '👨‍💼', value: '15+', label: 'Expert Counselors' },
        { icon: '🎓', value: '2,000+', label: 'Students Guided' },
        { icon: '💼', value: '50+', label: 'Career Paths' },
        { icon: '🏆', value: '95%', label: 'Success Rate' }
    ];

    const counselors = [
        {
            id: 1,
            name: 'Dr. Rajesh Sharma',
            designation: 'Senior Career Counselor',
            specialization: 'Engineering & Technology',
            experience: '20 years',
            qualification: 'Ph.D. in Career Counseling',
            rating: 4.9,
            students: 500,
            image: '👨‍💼',
            expertise: ['Engineering Guidance', 'Entrance Exam Prep', 'College Selection'],
            availability: 'Mon, Wed, Fri'
        },
        {
            id: 2,
            name: 'Dr. Meera Patel',
            designation: 'Academic Counselor',
            specialization: 'Medical & Healthcare',
            experience: '15 years',
            qualification: 'M.D., Career Counseling Expert',
            rating: 4.8,
            students: 450,
            image: '👩‍⚕️',
            expertise: ['Medical Career Path', 'NEET Guidance', 'Healthcare Options'],
            availability: 'Tue, Thu, Sat'
        },
        {
            id: 3,
            name: 'Prof. Amit Kumar',
            designation: 'Career Development Advisor',
            specialization: 'Commerce & Business',
            experience: '18 years',
            qualification: 'MBA, Certified Career Coach',
            rating: 4.9,
            students: 480,
            image: '👨‍💼',
            expertise: ['Business Management', 'Finance Career', 'Entrepreneurship'],
            availability: 'Mon, Wed, Fri'
        },
        {
            id: 4,
            name: 'Ms. Priya Desai',
            designation: 'Psychology Counselor',
            specialization: 'Arts & Humanities',
            experience: '12 years',
            qualification: 'M.A. Psychology, Career Advisor',
            rating: 4.7,
            students: 400,
            image: '👩‍🏫',
            expertise: ['Arts & Design', 'Psychology Career', 'Creative Fields'],
            availability: 'Tue, Thu, Sat'
        },
        {
            id: 5,
            name: 'Dr. Vikram Singh',
            designation: 'IT & Tech Career Advisor',
            specialization: 'Computer Science & IT',
            experience: '16 years',
            qualification: 'Ph.D. Computer Science',
            rating: 4.9,
            students: 520,
            image: '👨‍💻',
            expertise: ['Software Engineering', 'Data Science', 'AI & ML Careers'],
            availability: 'Mon, Wed, Fri'
        },
        {
            id: 6,
            name: 'Ms. Anjali Mehta',
            designation: 'Study Abroad Counselor',
            specialization: 'International Education',
            experience: '10 years',
            qualification: 'M.Ed., Study Abroad Expert',
            rating: 4.8,
            students: 380,
            image: '👩‍✈️',
            expertise: ['Foreign Universities', 'Scholarship Guidance', 'Visa Process'],
            availability: 'Tue, Thu, Sat'
        }
    ];

    const careerPaths = [
        {
            id: 1,
            category: 'Engineering & Technology',
            icon: '⚙️',
            color: '#3b82f6',
            careers: [
                'Computer Science Engineer',
                'Mechanical Engineer',
                'Civil Engineer',
                'Electrical Engineer',
                'Electronics Engineer',
                'Aerospace Engineer'
            ]
        },
        {
            id: 2,
            category: 'Medical & Healthcare',
            icon: '🏥',
            color: '#ef4444',
            careers: [
                'Doctor (MBBS)',
                'Dentist',
                'Pharmacist',
                'Nursing',
                'Physiotherapist',
                'Medical Research'
            ]
        },
        {
            id: 3,
            category: 'Commerce & Business',
            icon: '💼',
            color: '#10b981',
            careers: [
                'Chartered Accountant',
                'Business Management',
                'Finance & Banking',
                'Marketing Manager',
                'Entrepreneur',
                'Stock Market Analyst'
            ]
        },
        {
            id: 4,
            category: 'Arts & Design',
            icon: '🎨',
            color: '#f59e0b',
            careers: [
                'Graphic Designer',
                'Fashion Designer',
                'Interior Designer',
                'Fine Arts',
                'Animation',
                'Photography'
            ]
        },
        {
            id: 5,
            category: 'Science & Research',
            icon: '🔬',
            color: '#8b5cf6',
            careers: [
                'Research Scientist',
                'Biotechnology',
                'Environmental Science',
                'Physics Researcher',
                'Chemistry Lab',
                'Space Science'
            ]
        },
        {
            id: 6,
            category: 'Law & Legal',
            icon: '⚖️',
            color: '#06b6d4',
            careers: [
                'Lawyer',
                'Judge',
                'Legal Advisor',
                'Corporate Lawyer',
                'Criminal Lawyer',
                'Legal Consultant'
            ]
        }
    ];

    const services = [
        {
            icon: '🎯',
            title: 'Career Assessment',
            description: 'Personality tests and aptitude analysis to find the right career'
        },
        {
            icon: '📚',
            title: 'Academic Planning',
            description: 'Subject selection and stream guidance for better future'
        },
        {
            icon: '🎓',
            title: 'College Counseling',
            description: 'Best college and university selection guidance'
        },
        {
            icon: '📝',
            title: 'Entrance Exam Prep',
            description: 'Guidance for JEE, NEET, CA, and other competitive exams'
        },
        {
            icon: '🌍',
            title: 'Study Abroad',
            description: 'International education and scholarship opportunities'
        },
        {
            icon: '💡',
            title: 'Career Workshops',
            description: 'Regular seminars and workshops on various career options'
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Rahul Patel',
            class: 'Class 12 - Science',
            message: 'The career guidance helped me choose the right engineering college. Now I am studying at IIT!',
            rating: 5,
            image: '👨‍🎓'
        },
        {
            id: 2,
            name: 'Sneha Shah',
            class: 'Class 12 - Commerce',
            message: 'Dr. Sharma guided me perfectly for CA preparation. His advice was invaluable.',
            rating: 5,
            image: '👩‍🎓'
        },
        {
            id: 3,
            name: 'Arjun Kumar',
            class: 'Class 10',
            message: 'Thanks to the counselors, I chose the right stream and now pursuing my dream career.',
            rating: 5,
            image: '👨‍🎓'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConsultationForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Consultation booking submitted successfully! Our counselor will contact you soon.');
        setConsultationForm({
            studentName: '',
            studentId: '',
            class: '',
            email: '',
            phone: '',
            careerInterest: '',
            message: '',
            consultationType: 'academic',
            preferredDate: '',
            preferredTime: ''
        });
    };

    return (
        <div className="guidance-page">
            <div className="guidance-container">
                {/* Header */}
                <div className="guidance-header">
                    <div className="school-badge">
                        <h1>InspireEdge School</h1>
                    </div>
                    <h2>Career Guidance Center</h2>
                    <p>કારકિર્દી માર્ગદર્શન - Professional counselors for academic and career advice 🌿</p>
                </div>

                {/* Stats Grid */}
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

                {/* Services Section */}
                <div className="services-section">
                    <h3 className="section-title">Our Services</h3>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h4>{service.title}</h4>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Career Paths Section */}
                <div className="career-paths-section">
                    <h3 className="section-title">Explore Career Paths</h3>
                    <div className="career-paths-grid">
                        {careerPaths.map((path, index) => (
                            <div
                                key={path.id}
                                className="career-path-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="path-header" style={{ background: path.color }}>
                                    <div className="path-icon">{path.icon}</div>
                                    <h4>{path.category}</h4>
                                </div>
                                <ul className="careers-list">
                                    {path.careers.map((career, idx) => (
                                        <li key={idx}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="9 11 12 14 22 4"></polyline>
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                            </svg>
                                            {career}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Counselors Section */}
                <div className="counselors-section">
                    <h3 className="section-title">Meet Our Expert Counselors</h3>
                    <div className="counselors-grid">
                        {counselors.map((counselor, index) => (
                            <div
                                key={counselor.id}
                                className="counselor-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="counselor-image">{counselor.image}</div>
                                <div className="counselor-info">
                                    <h4>{counselor.name}</h4>
                                    <p className="designation">{counselor.designation}</p>
                                    <p className="specialization">{counselor.specialization}</p>
                                    <div className="qualification-badge">{counselor.qualification}</div>

                                    <div className="counselor-stats">
                                        <div className="stat">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            {counselor.rating}
                                        </div>
                                        <div className="stat">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            {counselor.experience}
                                        </div>
                                        <div className="stat">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                            </svg>
                                            {counselor.students}+ Students
                                        </div>
                                    </div>

                                    <div className="expertise">
                                        <strong>Expertise:</strong>
                                        <div className="expertise-tags">
                                            {counselor.expertise.map((exp, idx) => (
                                                <span key={idx} className="expertise-tag">{exp}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="availability">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        Available: {counselor.availability}
                                    </p>

                                    <button
                                        className="book-consultation-btn"
                                        onClick={() => setSelectedCounselor(counselor)}
                                    >
                                        Book Consultation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="testimonials-section">
                    <h3 className="section-title">Student Success Stories</h3>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="testimonial-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="testimonial-image">{testimonial.image}</div>
                                <div className="testimonial-content">
                                    <div className="rating">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="message">"{testimonial.message}"</p>
                                    <h4>{testimonial.name}</h4>
                                    <p className="class">{testimonial.class}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Consultation Form */}
                <div className="consultation-section">
                    <h3 className="section-title">Book Your Free Consultation</h3>
                    <div className="consultation-form-card">
                        <form onSubmit={handleSubmit} className="consultation-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        Student Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={consultationForm.studentName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter student name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                        </svg>
                                        Student ID *
                                    </label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={consultationForm.studentId}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter student ID"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        </svg>
                                        Class *
                                    </label>
                                    <select
                                        name="class"
                                        value={consultationForm.class}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        <option value="Class 8">Class 8</option>
                                        <option value="Class 9">Class 9</option>
                                        <option value="Class 10">Class 10</option>
                                        <option value="Class 11">Class 11</option>
                                        <option value="Class 12">Class 12</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={consultationForm.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={consultationForm.phone}
                                        onChange={handleInputChange}
                                        required
                                        maxLength="10"
                                        placeholder="10 digit phone number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        Consultation Type *
                                    </label>
                                    <select
                                        name="consultationType"
                                        value={consultationForm.consultationType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="academic">Academic Counseling</option>
                                        <option value="career">Career Guidance</option>
                                        <option value="college">College Selection</option>
                                        <option value="entrance">Entrance Exam Prep</option>
                                        <option value="abroad">Study Abroad</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        Preferred Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="preferredDate"
                                        value={consultationForm.preferredDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        Preferred Time *
                                    </label>
                                    <select
                                        name="preferredTime"
                                        value={consultationForm.preferredTime}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Time</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    Career Interest / Message
                                </label>
                                <textarea
                                    name="message"
                                    value={consultationForm.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Tell us about your career interests or any questions..."
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                Book Free Consultation (મફત પરામર્શ બુક કરો)
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="guidance-footer">
                    <p>© 2025 InspireEdge School | તમારા વિકાસ માટે પ્રતિબદ્ધ 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default CareerGuidance;