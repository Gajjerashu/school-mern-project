import React from "react";
import "./FeaturesSection.css";

const features = [
    {
        icon: "🎓",
        title: "Excellence in Education",
        description:
            "Our comprehensive curriculum and innovative teaching methods ensure every student reaches their full potential.",
    },
    {
        icon: "👨‍🏫",
        title: "Expert Faculty",
        description:
            "Highly qualified and experienced teachers dedicated to nurturing young minds with personalized attention.",
    },
    {
        icon: "🏢",
        title: "Modern Facilities",
        description:
            "State-of-the-art classrooms, laboratories, library, and sports facilities for holistic development.",
    },
    {
        icon: "🌟",
        title: "Extracurricular Activities",
        description:
            "Wide range of sports, arts, and cultural activities to develop well-rounded personalities.",
    },
    {
        icon: "💻",
        title: "Digital Learning",
        description:
            "Advanced technology integration with smart classrooms and online learning platforms.",
    },
    {
        icon: "🏆",
        title: "Proven Results",
        description:
            "Consistent academic excellence with 95% students securing admission in top colleges.",
    },
];

const FeaturesSection = () => {
    return (
        <section className="inspire-edge-section" id="inspireEdgeFeatures">
            <div className="inspire-edge-container">
                <h2 className="inspire-edge-section-title inspire-edge-fade-in">Why Choose InspireEdge?</h2>
                <div className="inspire-edge-features-grid">
                    {features.map((feature, index) => (
                        <div className="inspire-edge-feature-card inspire-edge-fade-in" key={index} id={`inspireEdgeCard${index + 1}`}>
                            <div className="inspire-edge-feature-icon">{feature.icon}</div>
                            <h3 className="inspire-edge-card-title">{feature.title}</h3>
                            <p className="inspire-edge-card-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;