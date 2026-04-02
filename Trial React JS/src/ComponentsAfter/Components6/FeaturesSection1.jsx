import React from "react";
import { Link } from "react-router-dom";
import "./FeaturesSection1.css";

const features = [
    {
        icon: "🎓",
        title: "Excellence in Education",
        description:
            "Our comprehensive curriculum and innovative teaching methods ensure every student reaches their full potential.",
        link: "/excellence-in-education"
    },
    {
        icon: "👨‍🏫",
        title: "Expert Faculty",
        description:
            "Highly qualified and experienced teachers dedicated to nurturing young minds with personalized attention.",
        link: "/expert-faculty"
    },
    {
        icon: "🏢",
        title: "Modern Facilities",
        description:
            "State-of-the-art classrooms, laboratories, library, and sports facilities for holistic development.",
        link: "/modern-facilities"
    },
    {
        icon: "🌟",
        title: "Extracurricular Activities",
        description:
            "Wide range of sports, arts, and cultural activities to develop well-rounded personalities.",
        link: "/extracurricular-activities"
    },
    {
        icon: "💻",
        title: "Digital Learning",
        description:
            "Advanced technology integration with smart classrooms and online learning platforms.",
        link: "/digital-learning"
    },
    {
        icon: "🏆",
        title: "Proven Results",
        description:
            "Consistent academic excellence with 95% students securing admission in top colleges.",
        link: "/proven-results"
    },
];

const FeaturesSection1 = () => {
    return (
        <section className="features-section-1" id="whyChooseInspireEdge">
            <div className="features-section-1-container">
                <h2 className="features-section-1-title fade-in">Why Choose InspireEdge?</h2>
                <div className="features-section-1-grid">
                    {features.map((feature, index) => (
                        <Link to={feature.link} key={index} className="features-section-1-card-link">
                            <div className="features-section-1-card fade-in">
                                <div className="features-section-1-icon">{feature.icon}</div>
                                <h3 className="features-section-1-card-title">{feature.title}</h3>
                                <p className="features-section-1-card-description">{feature.description}</p>
                                <div className="features-section-1-learn-more">Learn More →</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection1;