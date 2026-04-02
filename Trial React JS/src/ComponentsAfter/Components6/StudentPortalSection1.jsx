import React from "react";
import { Link } from "react-router-dom";
import "./StudentPortalSection1.css";

const studentFeatures = [
    {
        icon: "📚",
        title: "Academic Dashboard",
        description: "View your grades, GPA, subject-wise performance, and academic progress charts at a glance.",
        path: "/academic-dashboard"
    },
    {
        icon: "📋",
        title: "Assignment Tracker",
        description: "Check pending homework, submit assignments online, view teacher feedback, and track deadlines.",
        path: "/assignment-tracker"
    },
    {
        icon: "🕐",
        title: "Class Schedule",
        description: "Access your daily timetable, room numbers, teacher details, and any schedule changes instantly.",
        path: "/class-schedule"
    },
    {
        icon: "📖",
        title: "Digital Library",
        description: "Access e-books, research materials, past papers, and educational resources 24/7 from anywhere.",
        path: "/ebook"
    },
    {
        icon: "🏆",
        title: "Achievements",
        description: "Track your certificates, awards, extracurricular participation, and build your digital portfolio.",
        path: "/achievements"
    },
    {
        icon: "🎯",
        title: "Exam Preparation",
        description: "Access mock tests, previous papers, study materials, and exam schedules all in one place.",
        path: "/preparation"
    },
];

const StudentPortalSection1 = () => {
    return (
        <section className="student-portal-section-1" id="student-portal">
            <div className="student-portal-section-1-container">
                <h2 className="student-portal-section-1-title fade-in">Student Portal</h2>
                <div className="student-portal-section-1-grid">
                    {studentFeatures.map((item, index) => (
                        <Link to={item.path} className="student-portal-section-1-card-link" key={index}>
                            <div className="student-portal-section-1-card fade-in">
                                <div className="student-portal-section-1-icon">{item.icon}</div>
                                <h3 className="student-portal-section-1-card-title">{item.title}</h3>
                                <p className="student-portal-section-1-card-description">{item.description}</p>
                                <span className="student-portal-section-1-learn-more">Learn More →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentPortalSection1;