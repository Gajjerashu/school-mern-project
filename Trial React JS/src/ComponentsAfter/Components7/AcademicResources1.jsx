import React from "react";
import { Link } from "react-router-dom";   // ✅ routing added
import "./AcademicResources1.css";

const resourcesData = [
    {
        icon: "📚",
        title: "Digital Library",
        description: "10,000+ books, e-resources, and research databases",
        buttonText: "Access Library",
        link: "/digital-library",   // ✅ page link
    },
    {
        icon: "🔬",
        title: "Science Labs",
        description: "State-of-the-art Physics, Chemistry, and Biology laboratories",
        buttonText: "Virtual Tour",
        link: "/science-labs",     // ✅ page link
    },
    {
        icon: "💻",
        title: "Computer Labs",
        description: "Latest technology with high-speed internet and software",
        buttonText: "View Specs",
        link: "/computer-labs",   // ✅ page link
    },
    {
        icon: "🌐",
        title: "Online Learning",
        description: "LMS platform with recorded lectures and assignments",
        buttonText: "Login Portal",
        link: "/online-learning", // ✅ page link
    },
    {
        icon: "👨‍🏫",
        title: "Extra Support",
        description: "After-school tutoring and doubt clearing sessions",
        buttonText: "Schedule Session",
        link: "/extra-support",   // ✅ page link
    },
    {
        icon: "🎯",
        title: "Career Guidance",
        description: "Professional counselors for academic and career advice",
        buttonText: "Book Consultation",
        link: "/career-guidance", // ✅ page link
    },
];

const AcademicResources1 = () => {
    return (
        <div className="resources-section">
            <h2 className="section-title-acd">Academic Resources</h2>
            <p className="section-subtitle">
                Comprehensive learning resources and support systems
            </p>

            <div className="resources-grid">
                {resourcesData.map((resource, index) => (
                    <div className="resource-card" key={index}>
                        <span className="resource-icon">{resource.icon}</span>
                        <h4 className="resource-title">{resource.title}</h4>
                        <p className="resource-description">{resource.description}</p>

                        {/* ✅ ROUTING BUTTON */}
                        <Link to={resource.link} className="btn btn-success">
                            {resource.buttonText}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicResources1;
