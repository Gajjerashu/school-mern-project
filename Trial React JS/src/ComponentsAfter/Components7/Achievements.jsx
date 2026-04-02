// AcademicSection2.jsx
import React from "react";
import {
    BookOpen,
    Users,
    Award,
    Target,
    TrendingUp,
    CheckCircle,
    ArrowLeft,
} from "lucide-react";
import "./Achievements.css";

const Achievements = () => {
    const achievements = [
        {
            icon: <BookOpen size={32} />,
            title: "Academic Excellence",
            description:
                "Consistent top performance in state and national level examinations with innovative teaching approaches.",
        },
        {
            icon: <Users size={32} />,
            title: "Dedicated Faculty",
            description:
                "Highly qualified and experienced teachers committed to student growth and development.",
        },
        {
            icon: <Award size={32} />,
            title: "Awards & Recognition",
            description:
                "Recipient of multiple awards for excellence in education and holistic student development.",
        },
        {
            icon: <Target size={32} />,
            title: "Goal-Oriented Learning",
            description:
                "Strategic teaching methods focused on conceptual clarity and real-world application.",
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Career Growth",
            description:
                "Providing students with skills and confidence for future academic and professional success.",
        },
        {
            icon: <CheckCircle size={32} />,
            title: "Result-Oriented Approach",
            description:
                "Emphasis on measurable learning outcomes through regular tests and progress tracking.",
        },
    ];

    return (
        <section className="academics-section">
            <div className="container">

                <h2 className="section-title">Excellence in Academics</h2>
                <p className="section-subtitle">
                    Empowering students with knowledge, discipline, and creativity to
                    shape a brighter future.
                </p>

                <div className="achievement-grid">
                    {achievements.map((item, index) => (
                        <div key={index} className="achievement-card">
                            <div className="icon-wrapper">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
