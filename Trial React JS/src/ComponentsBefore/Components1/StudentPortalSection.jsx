import React from "react";
import "./StudentPortalSection.css";

const features = [
    {
        icon: "📊",
        title: "View Grades",
        description:
            "Access your latest grades, test scores, and academic progress reports in real-time.",
    },
    {
        icon: "📚",
        title: "Assignments",
        description:
            "Check homework, upcoming assignments, deadlines, and submission status.",
    },
    {
        icon: "📅",
        title: "Attendance",
        description:
            "Monitor your daily attendance record, absences, and punctuality statistics.",
    },
    {
        icon: "📖",
        title: "Course Materials",
        description:
            "Download study materials, lecture notes, and educational resources shared by teachers.",
    },
    {
        icon: "💬",
        title: "Message Teachers",
        description:
            "Communicate directly with your teachers for doubts, queries, and guidance.",
    },
    {
        icon: "🎯",
        title: "Achievements",
        description:
            "View your awards, certificates, sports achievements, and extracurricular records.",
    },
];

const StudentPortalSection = () => {
    return (
        <section className="student-portal-main-section" id="studentPortalMainSection">
            <div className="student-portal-main-container">
                <h2 className="student-portal-section-title student-portal-fade-in">Student Portal</h2>

                <div className="student-portal-features-grid">
                    {features.map((item, index) => (
                        <div className="student-portal-feature-card student-portal-fade-in" key={index} id={`studentPortalCard${index + 1}`}>
                            <div className="student-portal-feature-icon">{item.icon}</div>
                            <h3 className="student-portal-card-title">{item.title}</h3>
                            <p className="student-portal-card-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentPortalSection;