import React from "react";
import "./ParentPortalSection.css";

const features = [
    {
        icon: "📊",
        title: "Real-Time Grades",
        description:
            "View your child's latest grades, assignment scores, and progress reports instantly. No more waiting for report cards!",
    },
    {
        icon: "📅",
        title: "Attendance Tracking",
        description:
            "Monitor daily attendance, late arrivals, and absences with detailed timestamps and reasons.",
    },
    {
        icon: "📝",
        title: "Assignment Updates",
        description:
            "Track homework assignments, submission status, due dates, and teacher feedback in real-time.",
    },
    {
        icon: "💬",
        title: "Teacher Communication",
        description:
            "Direct messaging with teachers, receive important notices, and schedule parent-teacher meetings online.",
    },
    {
        icon: "🚌",
        title: "Bus Tracking",
        description:
            "Live GPS tracking of school bus, pickup/drop timings, and route changes notifications.",
    },
    {
        icon: "💳",
        title: "Fee Management",
        description:
            "View fee statements, payment history, pending dues, and make secure online payments instantly.",
    },
];

const ParentPortalSection = () => {
    return (
        <section className="parent-portal-main-section" id="parentPortalMainSection">
            <div className="parent-portal-main-container">
                <h2 className="parent-portal-section-title parent-portal-fade-in">Parent Portal</h2>

                <div className="parent-portal-features-grid">
                    {features.map((item, index) => (
                        <div className="parent-portal-feature-card parent-portal-fade-in" key={index} id={`parentPortalCard${index + 1}`}>
                            <div className="parent-portal-feature-icon">{item.icon}</div>
                            <h3 className="parent-portal-card-title">{item.title}</h3>
                            <p className="parent-portal-card-description">{item.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ParentPortalSection;