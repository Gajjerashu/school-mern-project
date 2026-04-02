import React from "react";
import { Link } from "react-router-dom";
import "./FacultySection1.css";

const faculty = [
    {
        icon: "🏫",
        title: "Primary School",
        description:
            "Classes 1 to 5 — Building strong basics in all subjects with fun-based learning, storytelling, and activity-driven education.",
        path: "/prime-school",
    },
    {
        icon: "🏛️",
        title: "Middle Level School",
        description:
            "Classes 6 to 8 — Expanding knowledge with critical thinking, skill development, and creative learning opportunities.",
        path: "/middle-level-school",
    },
    {
        icon: "🎓",
        title: "Higher Secondary School",
        description:
            "Classes 9 to 12 — Preparing students for higher education and career paths with advanced concepts and guidance.",
        path: "/higher-secondary-school",
    },
];

const FacultySection1 = () => {
    return (
        <section className="faculty-section-1" id="faculty">
            <div className="faculty-section-1-container">
                <h2 className="faculty-section-1-title fade-in">Our School Faculty</h2>
                <div className="faculty-section-1-grid">
                    {faculty.map((item, index) => (
                        <Link to={item.path} className="faculty-section-1-card-link" key={index}>
                            <div className="faculty-section-1-card fade-in">
                                <div className="faculty-section-1-icon">{item.icon}</div>
                                <h3 className="faculty-section-1-card-title">{item.title}</h3>
                                <p className="faculty-section-1-card-description">{item.description}</p>
                                <span className="faculty-section-1-learn-more">Learn More →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FacultySection1;