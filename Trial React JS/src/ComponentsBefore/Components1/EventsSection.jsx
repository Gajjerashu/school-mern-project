import React, { useEffect } from "react";
import "./EventsSection.css";

const events = [
    {
        date: "March 15, 2025",
        title: "Annual Sports Day",
        description:
            "Inter-house sports competition featuring athletics, swimming, and team sports. Parents are invited to cheer for their children.",
    },
    {
        date: "April 22, 2025",
        title: "Science Exhibition",
        description:
            "Students will showcase innovative science projects and experiments. Expert judges will evaluate and award the best projects.",
    },
    {
        date: "May 10, 2025",
        title: "Cultural Fest",
        description:
            "Three-day cultural festival featuring dance, music, drama, and art competitions. Celebration of diversity and talent.",
    },
];

const EventsSection = () => {
    useEffect(() => {
        const fadeEls = document.querySelectorAll(".upcoming-events-fade-in");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("upcoming-events-visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        fadeEls.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="upcoming-events-section" id="upcomingEventsMain">
            <div className="upcoming-events-container">
                <h2 className="upcoming-events-section-title upcoming-events-fade-in">Upcoming Events</h2>
                <div className="upcoming-events-grid">
                    {events.map((event, index) => (
                        <div className="upcoming-events-card upcoming-events-fade-in" key={index} id={`upcomingEventCard${index + 1}`}>
                            <div className="upcoming-events-date">{event.date}</div>
                            <div className="upcoming-events-content">
                                <h3 className="upcoming-events-title">{event.title}</h3>
                                <p className="upcoming-events-description">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;