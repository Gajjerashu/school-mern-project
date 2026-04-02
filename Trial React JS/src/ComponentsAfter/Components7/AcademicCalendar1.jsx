import React from 'react';
import './AcademicCalendar1.css';

const AcademicCalendar1 = () => {
    // Custom SVG Icons
    const CalendarIcon = () => (
        <svg className="event-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
    );

    const BookOpenIcon = () => (
        <svg className="event-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    );

    const TrophyIcon = () => (
        <svg className="event-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M14 20h4.5a2.5 2.5 0 0 0 0-5H14M6 2v6M14 6v10" />
            <circle cx="10" cy="14" r="4" />
        </svg>
    );

    const BeakerIcon = () => (
        <svg className="event-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 2v6l-4 12h14L15 8V2M9 2h6" />
        </svg>
    );

    const MusicIcon = () => (
        <svg className="event-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13M9 9l12-2" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </svg>
    );

    const AwardIcon = () => (
        <svg className="event-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.794a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16l2.31-4.679z" />
        </svg>
    );

    const firstTermEvents = [
        { text: "Classes Begin: April 1", icon: "Calendar" },
        { text: "First Assessment: May 15-20", icon: "BookOpen" },
        { text: "Summer Break: May 25 - June 15", icon: "Calendar" },
        { text: "Term 1 Exams: September 10-20", icon: "BookOpen" }
    ];

    const secondTermEvents = [
        { text: "Classes Resume: October 1", icon: "Calendar" },
        { text: "Mid-term Assessment: November 15-20", icon: "BookOpen" },
        { text: "Winter Break: December 25 - January 5", icon: "Calendar" },
        { text: "Annual Exams: March 1-15", icon: "BookOpen" }
    ];

    const specialEvents = [
        { text: "Sports Day: November 15", icon: "Trophy" },
        { text: "Science Fair: January 26", icon: "Beaker" },
        { text: "Cultural Fest: February 10-12", icon: "Music" },
        { text: "Annual Day: March 25", icon: "Award" }
    ];

    const renderIcon = (iconType) => {
        switch (iconType) {
            case 'Trophy': return <TrophyIcon />;
            case 'Beaker': return <BeakerIcon />;
            case 'Music': return <MusicIcon />;
            case 'Award': return <AwardIcon />;
            case 'BookOpen': return <BookOpenIcon />;
            default: return <CalendarIcon />;
        }
    };

    return (
        <div className="academic-calendar">
            <div className="calendar-container">
                <div className="calendar-header">
                    <h1 className="calendar-title">
                        Academic Calendar 2025-26
                    </h1>
                    <p className="calendar-subtitle">
                        Important dates and events throughout the academic year
                    </p>
                </div>

                <div className="calendar-grid">
                    {/* First Term */}
                    <div className="term-card first-term">
                        <div className="term-header">
                            <h3 className="term-title">First Term</h3>
                            <div className="term-dates">
                                April - September 2025
                            </div>
                        </div>

                        <div className="events-container">
                            {firstTermEvents.map((event, index) => (
                                <div key={index} className="event-item">
                                    {renderIcon(event.icon)}
                                    <span className="event-text">{event.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Term */}
                    <div className="term-card second-term">
                        <div className="term-header">
                            <h3 className="term-title">Second Term</h3>
                            <div className="term-dates">
                                October 2025 - March 2026
                            </div>
                        </div>

                        <div className="events-container">
                            {secondTermEvents.map((event, index) => (
                                <div key={index} className="event-item">
                                    {renderIcon(event.icon)}
                                    <span className="event-text">{event.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Special Events */}
                    <div className="term-card special-events">
                        <div className="term-header">
                            <h3 className="term-title">Special Events</h3>
                            <div className="term-dates">
                                Throughout the Year
                            </div>
                        </div>

                        <div className="events-container">
                            {specialEvents.map((event, index) => (
                                <div key={index} className="event-item">
                                    {renderIcon(event.icon)}
                                    <span className="event-text">{event.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="decorative-section">
                    <div className="decorative-dots">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="decorative-dot"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicCalendar1;