import React from "react";
import { Link } from "react-router-dom";
import "./AcademicsSection1.css";

const academics = [
    {
        icon: "🏫",
        title: "Primary School",
        description:
            "Nursery to Class 5 - Foundation building with play-based learning, basic literacy, numeracy, and social skills development.",
        path: "/primary-school",
    },
    {
        icon: "📚",
        title: "Middle School",
        description:
            "Class 6 to 8 - Comprehensive curriculum covering all subjects with focus on critical thinking and practical application.",
        path: "/middle-school",
    },
    {
        icon: "🎯",
        title: "High School",
        description:
            "Class 9 to 12 - Specialized streams (Science, Commerce, Arts) with board exam preparation and career guidance.",
        path: "/high-school",
    },
];

const AcademicsSection1 = () => {
    return (
        <section className="academics-section-1" id="academics">
            <div className="academics-section-1-container">
                <h2 className="academics-section-1-title fade-in">Academic Programs</h2>
                <div className="academics-section-1-grid">
                    {academics.map((item, index) => (
                        <Link to={item.path} className="academics-section-1-card-link" key={index}>
                            <div className="academics-section-1-card fade-in">
                                <div className="academics-section-1-icon">{item.icon}</div>
                                <h3 className="academics-section-1-card-title">{item.title}</h3>
                                <p className="academics-section-1-card-description">{item.description}</p>
                                <span className="academics-section-1-learn-more">Learn More →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicsSection1;