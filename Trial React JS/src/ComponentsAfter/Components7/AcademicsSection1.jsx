// AcademicsSection.jsx
import React, { useState } from "react";
import "./AcademicsSection1.css";

export default function AcademicsSection1() {
    const [activeProgram, setActiveProgram] = useState("primary");
    const [activeCurriculum, setActiveCurriculum] = useState("approach");

    const programs = {
        primary: {
            title: "Primary School (Nursery - Class 5)",
            desc: "Our primary education focuses on building strong foundations through play-based learning, interactive teaching methods, and holistic development.",
            subjects: [
                { icon: "📖", name: "English Language", details: "Reading, Writing, Speaking, Phonics" },
                { icon: "🔢", name: "Mathematics", details: "Numbers, Basic Operations, Shapes" },
                { icon: "🔬", name: "Environmental Science", details: "Nature Study, Basic Science Concepts" },
                { icon: "🕉️", name: "Hindi", details: "Language Skills, Literature" },
                { icon: "🎨", name: "Art & Craft", details: "Drawing, Painting, Creative Expression" },
                { icon: "⚽", name: "Physical Education", details: "Sports, Games, Physical Development" },
            ],
            quickInfo: [
                ["Class Duration", "40 minutes"],
                ["School Hours", "8:00 AM - 2:00 PM"],
                ["Class Strength", "Max 25 students"],
                ["Assessment", "Continuous Evaluation"],
                ["Medium", "English & Hindi"],
                ["Board", "CBSE"],
            ],
            curriculum: {
                approach: [
                    { title: "🌱 Play-Based Learning", text: "Interactive games & fun activities to build curiosity." },
                    { title: "📖 Phonics & Language Skills", text: "Focus on reading, writing, and communication." },
                    { title: "🤝 Value Education", text: "Instilling discipline, teamwork, and good habits." },
                ],
                activities: [
                    { title: "🎶 Music & Dance", text: "Rhymes, cultural songs, and dance activities.", bg: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)" },
                    { title: "🎨 Art & Creativity", text: "Craft work, painting, and drawing competitions.", bg: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
                    { title: "🏃 Sports Day", text: "Fun races, yoga, and physical activities.", bg: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
                ],
            },
        },
        middle: {
            title: "Middle School (Class 6 - 8)",
            desc: "The middle school curriculum bridges elementary and secondary education, focusing on conceptual understanding, critical thinking, and academic rigor.",
            subjects: [
                { icon: "📚", name: "English", details: "Literature, Grammar, Composition" },
                { icon: "📊", name: "Mathematics", details: "Algebra, Geometry, Statistics" },
                { icon: "⚗️", name: "Science", details: "Physics, Chemistry, Biology" },
                { icon: "🌍", name: "Social Science", details: "History, Geography, Civics" },
                { icon: "📝", name: "Hindi", details: "Literature, Grammar, Composition" },
                { icon: "💻", name: "Computer Science", details: "Programming, Digital Literacy" },
            ],
            quickInfo: [
                ["Class Duration", "45 minutes"],
                ["School Hours", "7:45 AM - 2:30 PM"],
                ["Class Strength", "Max 30 students"],
                ["Assessment", "Term-based + CCE"],
                ["Projects", "Interdisciplinary"],
                ["Board", "CBSE"],
            ],
            curriculum: {
                approach: [
                    { title: "🧠 Conceptual Learning", text: "Understanding concepts, encouraging analytical thinking." },
                    { title: "🔬 Inquiry-Based Learning", text: "Exploring topics via research, experiments, problem-solving." },
                    { title: "📱 Technology Integration", text: "Using digital tools and online resources." },
                ],
                assessment: [
                    { title: "Term 1 Examination", details: "Covers first half syllabus", weightage: "30%" },
                    { title: "Term 2 Examination", details: "Covers complete syllabus", weightage: "30%" },
                    { title: "Internal Assessment", details: "Tests, assignments, project work", weightage: "40%" },
                ],
                activities: [
                    { title: "🏆 Science Olympiad", text: "National & international science competitions.", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
                    { title: "🎭 Model UN", text: "Debate and diplomacy skills via mock UN.", bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
                    { title: "💻 Coding Club", text: "Intro to programming & computational thinking.", bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
                ],
            },
        },
        high: {
            title: "High School (Class 9 - 12)",
            desc: "Our high school program prepares students for board examinations and university admissions.",
            streams: [
                { icon: "🔬", name: "Science Stream", details: "PCM/PCB with Engineering & Medical prep" },
                { icon: "💼", name: "Commerce Stream", details: "Business, Economics, Accountancy" },
                { icon: "🎨", name: "Humanities", details: "History, Political Science, Psychology" },
            ],
            subjects: [
                { icon: "📖", name: "English", details: "Literature & Language" },
                { icon: "📐", name: "Mathematics", details: "Advanced Math Concepts" },
                { icon: "⚛️", name: "Science", details: "Physics, Chemistry, Biology" },
                { icon: "🏛️", name: "Social Science", details: "History, Geography, Political Science" },
            ],
            quickInfo: [
                ["Class Duration", "50 minutes"],
                ["School Hours", "7:30 AM - 3:00 PM"],
                ["Class Strength", "Max 35 students"],
                ["Board Exams", "Class 10 & 12"],
                ["Career Guidance", "Comprehensive"],
                ["Board", "CBSE"],
            ],
            curriculum: {
                approach: [
                    { title: "🎯 Exam-Focused Teaching", text: "Strategic preparation for board & entrance tests." },
                    { title: "📊 Data-Driven Learning", text: "Performance analysis & personalized plans." },
                    { title: "🎓 University Preparation", text: "Skills for higher education & careers." },
                ],
                assessment: [
                    { title: "Pre-Boards", details: "Mock CBSE exams", weightage: "Practice" },
                    { title: "Chapter Tests", details: "Topic-wise understanding", weightage: "Continuous" },
                    { title: "Board Exams", details: "CBSE Class 10 & 12", weightage: "100%" },
                ],
                activities: [
                    { title: "🏥 JEE/NEET Prep", text: "Special coaching for entrance exams.", bg: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)" },
                    { title: "🌐 Career Counseling", text: "Guidance for stream & university admissions.", bg: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)" },
                    { title: "💼 Industry Exposure", text: "Internships & guest lectures.", bg: "linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)" },
                ],
            },
        },
    };

    const current = programs[activeProgram];

    return (
        <div className="academics-container">
            {/* Header */}
            <div className="academics-header fade-in">
                <h1>Academic Excellence</h1>
                <p>Comprehensive curriculum designed to nurture critical thinking, creativity, and lifelong learning</p>
            </div>

            {/* Stats */}
            <div className="academic-stats fade-in">
                <div className="stat-card"><span className="stat-number">100%</span><span>Pass Rate</span></div>
                <div className="stat-card"><span className="stat-number">95%</span><span>University Acceptance</span></div>
                <div className="stat-card"><span className="stat-number">15+</span><span>Subjects Offered</span></div>
                <div className="stat-card"><span className="stat-number">1:12</span><span>Teacher-Student Ratio</span></div>
            </div>

            {/* Program Tabs */}
            <div className="programs-nav fade-in">
                <button className={activeProgram === "primary" ? "active" : ""} onClick={() => setActiveProgram("primary")}>Primary School</button>
                <button className={activeProgram === "middle" ? "active" : ""} onClick={() => setActiveProgram("middle")}>Middle School</button>
                <button className={activeProgram === "high" ? "active" : ""} onClick={() => setActiveProgram("high")}>High School</button>
            </div>

            {/* Program Content */}
            <div className="program-content fade-in">
                <div className="program-overview">
                    <h2>{current.title}</h2>
                    <p>{current.desc}</p>
                </div>

                <div className="program-grid">
                    <div className="subjects-section">
                        {activeProgram === "high" && (
                            <>
                                <h3>Stream Options (Class 11-12)</h3>
                                <div className="subjects-grid">
                                    {current.streams.map((s, i) => (
                                        <div key={i} className="subject-card">
                                            <span className="subject-icon">{s.icon}</span>
                                            <div className="subject-name">{s.name}</div>
                                            <div className="subject-details">{s.details}</div>
                                        </div>
                                    ))}
                                </div>
                                <h3 style={{ marginTop: "2rem" }}>Core Subjects (Class 9-10)</h3>
                            </>
                        )}

                        <div className="subjects-grid">
                            {current.subjects.map((s, i) => (
                                <div key={i} className="subject-card">
                                    <span className="subject-icon">{s.icon}</span>
                                    <div className="subject-name">{s.name}</div>
                                    <div className="subject-details">{s.details}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="quick-info">
                        <h3>Quick Information</h3>
                        {current.quickInfo.map((info, i) => (
                            <div key={i} className="info-item"><span>{info[0]}</span><span>{info[1]}</span></div>
                        ))}
                    </div>
                </div>

                {/* Curriculum Section */}
                {["primary", "middle", "high"].includes(activeProgram) && (
                    <div className="curriculum-section fade-in">
                        <h3>Curriculum Framework</h3>
                        <div className="curriculum-tabs">
                            <button className={activeCurriculum === "approach" ? "active" : ""} onClick={() => setActiveCurriculum("approach")}>Teaching Approach</button>
                            {activeProgram !== "primary" && (
                                <button className={activeCurriculum === "assessment" ? "active" : ""} onClick={() => setActiveCurriculum("assessment")}>Assessment</button>
                            )}
                            <button className={activeCurriculum === "activities" ? "active" : ""} onClick={() => setActiveCurriculum("activities")}>Activities</button>
                        </div>

                        {activeCurriculum === "approach" && (
                            <div className="curriculum-content grid-3">
                                {current.curriculum.approach.map((item, i) => (
                                    <div key={i} className="curriculum-card">
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeCurriculum === "assessment" && current.curriculum.assessment && (
                            <div className="curriculum-content assessment-timeline">
                                {current.curriculum.assessment.map((item, i) => (
                                    <div key={i} className="assessment-item">
                                        <div className="assessment-title">{item.title}</div>
                                        <div className="assessment-details">{item.details}</div>
                                        <span className="assessment-weightage">{item.weightage}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeCurriculum === "activities" && (
                            <div className="curriculum-content grid-3">
                                {current.curriculum.activities.map((item, i) => (
                                    <div key={i} className="curriculum-card" style={{ background: item.bg, color: "white" }}>
                                        <h5>{item.title}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
