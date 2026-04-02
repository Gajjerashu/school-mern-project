// src/pages/ScienceLabs.jsx
import React, { useState } from 'react';
import './ScienceLabs.css';

const ScienceLabs = () => {
    const [activeLab, setActiveLab] = useState('physics');
    const [selectedExperiment, setSelectedExperiment] = useState(null);

    const labs = [
        {
            id: 'physics',
            name: 'Physics Lab',
            icon: '⚛️',
            color: '#3b82f6',
            description: 'State-of-the-art Physics laboratory with modern equipment'
        },
        {
            id: 'chemistry',
            name: 'Chemistry Lab',
            icon: '🧪',
            color: '#8b5cf6',
            description: 'Well-equipped Chemistry lab for practical experiments'
        },
        {
            id: 'biology',
            name: 'Biology Lab',
            icon: '🔬',
            color: '#10b981',
            description: 'Advanced Biology laboratory with microscopy facilities'
        }
    ];

    const experiments = {
        physics: [
            {
                id: 1,
                title: "Newton's Laws of Motion",
                level: 'Class 9-10',
                duration: '45 mins',
                equipment: ['Trolley', 'Pulley', 'Weights', 'Timer'],
                description: 'Study the relationship between force, mass, and acceleration',
                image: '🎯'
            },
            {
                id: 2,
                title: 'Ohm\'s Law Verification',
                level: 'Class 10-12',
                duration: '60 mins',
                equipment: ['Ammeter', 'Voltmeter', 'Resistors', 'Battery'],
                description: 'Verify the relationship between voltage, current, and resistance',
                image: '⚡'
            },
            {
                id: 3,
                title: 'Light Refraction Study',
                level: 'Class 10',
                duration: '50 mins',
                equipment: ['Glass Prism', 'Light Source', 'Protractor'],
                description: 'Observe and measure the refraction of light through different media',
                image: '🌈'
            },
            {
                id: 4,
                title: 'Simple Pendulum',
                level: 'Class 9',
                duration: '40 mins',
                equipment: ['Thread', 'Bob', 'Stand', 'Stop Watch'],
                description: 'Determine the acceleration due to gravity using simple pendulum',
                image: '⏱️'
            }
        ],
        chemistry: [
            {
                id: 5,
                title: 'Acid-Base Titration',
                level: 'Class 11-12',
                duration: '60 mins',
                equipment: ['Burette', 'Pipette', 'Beaker', 'Indicators'],
                description: 'Determine the concentration of unknown acid using titration',
                image: '💧'
            },
            {
                id: 6,
                title: 'pH Value Testing',
                level: 'Class 10',
                duration: '45 mins',
                equipment: ['pH Paper', 'Test Tubes', 'Solutions'],
                description: 'Test the pH values of various household solutions',
                image: '🧬'
            },
            {
                id: 7,
                title: 'Chemical Reactions',
                level: 'Class 9-10',
                duration: '50 mins',
                equipment: ['Test Tubes', 'Chemicals', 'Bunsen Burner'],
                description: 'Observe different types of chemical reactions',
                image: '💥'
            },
            {
                id: 8,
                title: 'Salt Analysis',
                level: 'Class 12',
                duration: '90 mins',
                equipment: ['Test Tubes', 'Reagents', 'Flame Test Equipment'],
                description: 'Identify unknown salt using systematic analysis',
                image: '🧂'
            }
        ],
        biology: [
            {
                id: 9,
                title: 'Cell Structure Study',
                level: 'Class 9-11',
                duration: '60 mins',
                equipment: ['Microscope', 'Slides', 'Onion Peel', 'Stains'],
                description: 'Observe plant and animal cell structures under microscope',
                image: '🔬'
            },
            {
                id: 10,
                title: 'Photosynthesis Experiment',
                level: 'Class 10',
                duration: '120 mins',
                equipment: ['Plants', 'Beakers', 'Iodine Solution'],
                description: 'Demonstrate the process of photosynthesis in green plants',
                image: '🌱'
            },
            {
                id: 11,
                title: 'Blood Group Testing',
                level: 'Class 11-12',
                duration: '45 mins',
                equipment: ['Blood Samples', 'Antisera', 'Slides'],
                description: 'Determine blood groups using antigen-antibody reactions',
                image: '🩸'
            },
            {
                id: 12,
                title: 'Dissection Study',
                level: 'Class 11-12',
                duration: '90 mins',
                equipment: ['Specimens', 'Dissection Kit', 'Magnifier'],
                description: 'Study internal anatomy through careful dissection',
                image: '🦴'
            }
        ]
    };

    const facilities = [
        { icon: '🔬', title: 'Advanced Microscopes', description: '20+ Digital Microscopes' },
        { icon: '🧪', title: 'Safety Equipment', description: 'Fire Safety & First Aid' },
        { icon: '💻', title: 'Digital Tools', description: 'Lab Simulation Software' },
        { icon: '📚', title: 'Reference Library', description: '500+ Lab Manuals' },
        { icon: '👨‍🔬', title: 'Expert Faculty', description: 'Experienced Lab Instructors' },
        { icon: '🔐', title: 'Safe Environment', description: 'WHO Safety Standards' }
    ];

    const currentLab = labs.find(lab => lab.id === activeLab);
    const currentExperiments = experiments[activeLab];

    return (
        <div className="labs-page">
            <div className="labs-container">
                {/* Header */}
                <div className="labs-header">
                    <div className="school-badge">
                        <h1>InspireEdge School</h1>
                    </div>
                    <h2>Science Laboratories</h2>
                    <p>વિજ્ઞાન પ્રયોગશાળાઓ - State-of-the-art Physics, Chemistry, and Biology laboratories 🌿</p>
                </div>

                {/* Lab Selector */}
                <div className="lab-selector">
                    {labs.map((lab) => (
                        <button
                            key={lab.id}
                            className={`lab-btn ${activeLab === lab.id ? 'active' : ''}`}
                            onClick={() => setActiveLab(lab.id)}
                            style={{ '--lab-color': lab.color }}
                        >
                            <span className="lab-icon">{lab.icon}</span>
                            <div className="lab-btn-content">
                                <h3>{lab.name}</h3>
                                <p>{lab.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Virtual Tour Banner */}
                <div className="tour-banner">
                    <div className="tour-content">
                        <div className="tour-icon">🎥</div>
                        <div className="tour-text">
                            <h3>Take a Virtual Tour</h3>
                            <p>Explore our {currentLab.name} in 360° virtual reality</p>
                        </div>
                    </div>
                    <button className="tour-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Start Virtual Tour
                    </button>
                </div>

                {/* Facilities Grid */}
                <div className="facilities-section">
                    <h3 className="section-title">Laboratory Facilities</h3>
                    <div className="facilities-grid">
                        {facilities.map((facility, index) => (
                            <div
                                key={index}
                                className="facility-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="facility-icon">{facility.icon}</div>
                                <h4>{facility.title}</h4>
                                <p>{facility.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experiments Section */}
                <div className="experiments-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            {currentLab.icon} {currentLab.name} Experiments
                        </h3>
                        <p className="experiments-count">{currentExperiments.length} experiments available</p>
                    </div>

                    <div className="experiments-grid">
                        {currentExperiments.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="experiment-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                                onClick={() => setSelectedExperiment(exp)}
                            >
                                <div className="experiment-image">{exp.image}</div>
                                <div className="experiment-content">
                                    <div className="experiment-header">
                                        <h4>{exp.title}</h4>
                                        <span className="level-badge">{exp.level}</span>
                                    </div>
                                    <p className="experiment-description">{exp.description}</p>

                                    <div className="experiment-meta">
                                        <div className="meta-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            <span>{exp.duration}</span>
                                        </div>
                                        <div className="meta-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                            </svg>
                                            <span>{exp.equipment.length} items</span>
                                        </div>
                                    </div>

                                    <button className="book-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        Book Lab Session
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experiment Detail Modal */}
                {selectedExperiment && (
                    <div className="modal-overlay" onClick={() => setSelectedExperiment(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedExperiment(null)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <div className="modal-header">
                                <div className="modal-icon">{selectedExperiment.image}</div>
                                <h3>{selectedExperiment.title}</h3>
                                <span className="level-badge">{selectedExperiment.level}</span>
                            </div>
                            <div className="modal-body">
                                <p>{selectedExperiment.description}</p>
                                <div className="modal-info">
                                    <div className="info-item">
                                        <strong>Duration:</strong> {selectedExperiment.duration}
                                    </div>
                                    <div className="info-item">
                                        <strong>Equipment Required:</strong>
                                        <ul>
                                            {selectedExperiment.equipment.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button className="modal-book-btn">
                                    Book This Experiment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="labs-footer">
                    <p>© 2025 InspireEdge School | તમારા વિકાસ માટે પ્રતિબદ્ધ 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default ScienceLabs;