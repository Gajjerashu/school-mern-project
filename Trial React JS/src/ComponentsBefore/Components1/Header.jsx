import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const dropdownTimerRef = useRef(null);

    // ✅ Clear timer on component unmount
    useEffect(() => {
        return () => {
            if (dropdownTimerRef.current) {
                clearTimeout(dropdownTimerRef.current);
            }
        };
    }, []);

    // ✅ Handle mouse enter - open dropdown and clear any close timer
    const handleMouseEnter = () => {
        if (dropdownTimerRef.current) {
            clearTimeout(dropdownTimerRef.current);
        }
        setIsLoginOpen(true);
    };

    // ✅ Handle mouse leave - set timer to close after 10 seconds
    const handleMouseLeave = () => {
        dropdownTimerRef.current = setTimeout(() => {
            setIsLoginOpen(false);
        }, 10000); // 10 seconds delay
    };

    // ✅ Close dropdown immediately when clicking on a link
    const handleLinkClick = () => {
        if (dropdownTimerRef.current) {
            clearTimeout(dropdownTimerRef.current);
        }
        setIsLoginOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="nav-container">
                <div className="logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="#16a34a">
                        <path d="M16 2L4 8v12c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2zm0 3.2l9 5.1v9.2c0 6-4.2 11.5-9 12.8-4.8-1.3-9-6.8-9-12.8v-9.2l9-5.1z" />
                        <path d="M12 16l3 3 6-6-1.5-1.5L15 16l-1.5-1.5L12 16z" />
                    </svg>
                    InspireEdge School
                </div>

                <nav>
                    <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>

                        <li>
                            <Link to="/" onClick={handleLinkClick}>
                                Home
                            </Link>
                        </li>

                        <li
                            className="has-dropdown"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="login-link">
                                Login
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                                    <path d="M5 6L0 0h10L5 6z" />
                                </svg>
                            </span>

                            {isLoginOpen && (
                                <div
                                    className="dropdown-box"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link to="/signup" onClick={handleLinkClick}>
                                        Student Signup
                                    </Link>
                                    <Link to="/login" onClick={handleLinkClick}>
                                        Student Login
                                    </Link>
                                    <Link to="/admin" onClick={handleLinkClick}>
                                        Admin Login
                                    </Link>
                                </div>
                            )}
                        </li>

                        <li>
                            <Link to="/Contact" onClick={handleLinkClick}>
                                Contact
                            </Link>
                        </li>

                    </ul>

                    <div
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;