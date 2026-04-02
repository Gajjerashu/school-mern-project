import React from "react";
import { Link } from "react-router-dom";
import "./Footer1.css";

const Footer1 = () => {
    return (
        <footer className="footer1-main">
            <div className="footer1-container">
                {/* Footer Top Section */}
                <div className="footer1-top">
                    {/* About Section with Logo */}
                    <div className="footer1-column">
                        <div className="footer1-logo">
                            <svg className="footer1-logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="#16a34a">
                                <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                                <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                            </svg>
                            <span>InspireEdge School</span>
                        </div>
                        <p className="footer1-description">
                            Empowering students through innovative education and holistic development. Building tomorrow's leaders today.
                        </p>
                        <div className="footer1-social">
                            <a href="#" className="footer1-social-link" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="footer1-social-link" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="footer1-social-link" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#" className="footer1-social-link" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Academic Programs */}
                    <div className="footer1-column">
                        <h3 className="footer1-heading">Academic Programs</h3>
                        <ul className="footer1-links">
                            <li><Link to="/primary-school">Primary School</Link></li>
                            <li><Link to="/middle-school">Middle School</Link></li>
                            <li><Link to="/high-school">High School</Link></li>
                            <li><Link to="/digital-library">Digital Library</Link></li>
                            <li><Link to="/science-labs">Science Labs</Link></li>
                            <li><Link to="/computer-labs">Computer Labs</Link></li>
                        </ul>
                    </div>

                    {/* Student Resources */}
                    <div className="footer1-column">
                        <h3 className="footer1-heading">Student Resources</h3>
                        <ul className="footer1-links">
                            <li><Link to="/academic-dashboard">Academic Dashboard</Link></li>
                            <li><Link to="/assignment-tracker">Assignment Tracker</Link></li>
                            <li><Link to="/class-schedule">Class Schedule</Link></li>
                            <li><Link to="/ebook">E-Books</Link></li>
                            <li><Link to="/achievements">Achievements</Link></li>
                            <li><Link to="/preparation">Exam Preparation</Link></li>
                        </ul>
                    </div>

                    {/* Parent Portal */}
                    <div className="footer1-column">
                        <h3 className="footer1-heading">Parent Portal</h3>
                        <ul className="footer1-links">
                            <li><Link to="/grades">Real-Time Grades</Link></li>
                            <li><Link to="/attendance">Attendance Tracking</Link></li>
                            <li><Link to="/assignments">Assignments</Link></li>
                            <li><Link to="/teacher-communication">Teacher Communication</Link></li>
                            <li><Link to="/bus-tracking">Bus Tracking</Link></li>
                            <li><Link to="/pay">Fee Payment</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer1-bottom">
                    <p className="footer1-copyright">
                        © 2025 InspireEdge School. All rights reserved.
                    </p>
                    <div className="footer1-legal">
                        <Link to="/Contact">Contact Us</Link>
                        <span className="footer1-divider">|</span>
                        <Link to="/">Privacy Policy</Link>
                        <span className="footer1-divider">|</span>
                        <Link to="/">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer1;