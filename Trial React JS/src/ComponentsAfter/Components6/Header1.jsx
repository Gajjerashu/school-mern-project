import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation add karyo
import "./Header1.css";

const Header1 = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Current path track karva

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Login");
    };

    const handleLinkClick = () => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    // ✅ Active check function
    const isActive = (path) => location.pathname === path;

    return (
        <header className="header1">
            <div className="header1-nav-container">
                {/* Logo */}
                <div className="header1-logo">
                    <svg className="header1-logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="#16a34a">
                        <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                        <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                    </svg>
                    <span>InspireEdge School</span>
                </div>

                {/* Navigation */}
                <nav className="header1-nav">
                    <ul className={`header1-nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                        <li>
                            <Link
                                to="/AfterLogin/Home1"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/Home1") ? "active-link" : ""}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterLogin/Academics"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/Academics") ? "active-link" : ""}
                            >
                                Academics
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterLogin/Students"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/Students") ? "active-link" : ""}
                            >
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterLogin/Syllabus"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/Syllabus") ? "active-link" : ""}
                            >
                                Syllabus
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterLogin/MockTest"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/MockTest") ? "active-link" : ""}
                            >
                                MockTest
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterLogin/Fees"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/Fees") ? "active-link" : ""}
                            >
                                Fees
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterLogin/Response"
                                onClick={handleLinkClick}
                                className={isActive("/AfterLogin/Response") ? "active-link" : ""}
                            >
                                Response
                            </Link>
                        </li>
                        <li>
                            <button className="header1-btn-logout" onClick={handleLogout}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                                </svg>
                                Logout
                            </button>
                        </li>
                    </ul>

                    <div className="header1-mobile-toggle" onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header1;