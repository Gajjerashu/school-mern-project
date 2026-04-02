import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation add karyo
import "./Header2.css";

const Header2 = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Current path track karva

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        navigate("/AdminLogin");
    };

    const handleLinkClick = () => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    // ✅ Active check function
    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="nav-container">
                {/* Logo with Icon */}
                <div className="logo">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
                        <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                        <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                    </svg>
                    <span>InspireEdge Admin Panel</span>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                        <li>
                            <Link
                                to="/AfterAdmin/AdminDash"
                                onClick={handleLinkClick}
                                className={isActive("/AfterAdmin/AdminDash") ? "admin-active-link" : ""}
                            >
                                InquiryDash
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterAdmin/AdminUser"
                                onClick={handleLinkClick}
                                className={isActive("/AfterAdmin/AdminUser") ? "admin-active-link" : ""}
                            >
                                Admin Management
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterAdmin/AdminAdmission"
                                onClick={handleLinkClick}
                                className={isActive("/AfterAdmin/AdminAdmission") ? "admin-active-link" : ""}
                            >
                                AddmissionDash
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterAdmin/AdminStudent"
                                onClick={handleLinkClick}
                                className={isActive("/AfterAdmin/AdminStudent") ? "admin-active-link" : ""}
                            >
                                Admission-Student
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AfterAdmin/AdminFees"
                                onClick={handleLinkClick}
                                className={isActive("/AfterAdmin/AdminFees") ? "admin-active-link" : ""}
                            >
                                Student-Fees
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

                    {/* Mobile Menu Toggle */}
                    <div className="mobile-toggle" onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header2;