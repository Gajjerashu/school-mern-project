import React from "react";
import { Link } from "react-router-dom";
import "./ParentPortalSection1.css";

const features = [
    {
        icon: "📊",
        title: "Real-Time Grades",
        description:
            "View your child's latest grades, assignment scores, and progress reports instantly. No more waiting for report cards!",
        path: "/grades"
    },
    {
        icon: "📅",
        title: "Attendance Tracking",
        description:
            "Monitor daily attendance, late arrivals, and absences with detailed timestamps and reasons.",
        path: "/attendance"
    },
    {
        icon: "📝",
        title: "Assignment Updates",
        description:
            "Track homework assignments, submission status, due dates, and teacher feedback in real-time.",
        path: "/assignments"
    },
    {
        icon: "💬",
        title: "Teacher Communication",
        description:
            "Direct messaging with teachers, receive important notices, and schedule parent-teacher meetings online.",
        path: "/teacher-communication"
    },
    {
        icon: "🚌",
        title: "Bus Tracking",
        description:
            "Live GPS tracking of school bus, pickup/drop timings, and route changes notifications.",
        path: "/bus-tracking"
    },
    {
        icon: "💳",
        title: "Fee Management",
        description:
            "View fee statements, payment history, pending dues, and make secure online payments instantly.",
        path: "/pay"
    },
];

const ParentPortalSection1 = () => {
    return (
        <section className="parent-portal-section-1" id="parent-portal">
            <div className="parent-portal-section-1-container">
                <h2 className="parent-portal-section-1-title fade-in">Parent Portal</h2>
                <div className="parent-portal-section-1-grid">
                    {features.map((item, index) => (
                        <Link to={item.path} className="parent-portal-section-1-card-link" key={index}>
                            <div className="parent-portal-section-1-card fade-in">
                                <div className="parent-portal-section-1-icon">{item.icon}</div>
                                <h3 className="parent-portal-section-1-card-title">{item.title}</h3>
                                <p className="parent-portal-section-1-card-description">{item.description}</p>
                                <span className="parent-portal-section-1-learn-more">Learn More →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ParentPortalSection1;