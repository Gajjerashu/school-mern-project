import React from "react";
import "./AcademicsSection.css";

const academics = [
    {
        icon: "🏫",
        title: "Primary School",
        description:
            "Nursery to Class 5 - Foundation building with play-based learning, basic literacy, numeracy, and social skills development.",
    },
    {
        icon: "📚",
        title: "Middle School",
        description:
            "Class 6 to 8 - Comprehensive curriculum covering all subjects with focus on critical thinking and practical application.",
    },
    {
        icon: "🎯",
        title: "High School",
        description:
            "Class 9 to 12 - Specialized streams (Science, Commerce, Arts) with board exam preparation and career guidance.",
    },
];

const AcademicsSection = () => {
    return (
        <section className="academic-program-section" id="academicProgramsMain">
            <div className="academic-program-container">
                <h2 className="academic-program-section-title academic-program-fade-in">Academic Programs</h2>
                <div className="academic-program-features-grid">
                    {academics.map((item, index) => (
                        <div className="academic-program-feature-card academic-program-fade-in" key={index} id={`academicCard${index + 1}`}>
                            <div className="academic-program-feature-icon">{item.icon}</div>
                            <h3 className="academic-program-card-title">{item.title}</h3>
                            <p className="academic-program-card-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicsSection;