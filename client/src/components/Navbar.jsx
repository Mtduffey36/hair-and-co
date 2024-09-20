import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseLine, RiMenu3Line, RiArrowUpLine } from "@remixicon/react";
import { LINKS } from "../constants";
import LoginModal from './LoginModal';
import { useAuth } from '../utils/auth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showScrollUpButton, setShowScrollUpButton] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle sign-in click
    const handleSignInClick = (e) => {
        e.preventDefault();
        setIsLoginModalOpen(true);
    };

    // Handle link click
    const handleLinkClick = (e, link) => {
        e.preventDefault();
        if (link.name === "Sign In") {
            handleSignInClick(e);
        } else if (link.name === "Sign Out") {
            logout();
            navigate('/');
        } else if (link.link.startsWith('#')) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(link.link.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            navigate(link.link);
        }
        if (isOpen) {
            setIsOpen(false);
        }
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Show scroll up button when the user scrolls down
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollUpButton(true);
            } else {
                setShowScrollUpButton(false);
            }
        };

        // Check for screen resize to adjust isDesktop state
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="border-b-2 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-8">
                {/* Logo Placeholder */}
                <div className="pl-2">
                    <Link to="/about">
                        <h1 id="companyLogo"><strong>Hair & Co</strong></h1>
                    </Link>
                </div>

                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="text-2xl pr-2 focus:outline-none"
                        aria-label={isOpen ? "Close menu" : "Open menu"}>
                        {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
                    </button>
                </div>

                <div className="hidden md:flex space-x-8 md:space-x-4 pr-2">
                    {LINKS.map((link, index) => {
                        // Don't show "Sign In" if user is authenticated
                        // Don't show "Sign Out" if user is not authenticated
                        if ((user && link.name === "Sign In") || (!user && link.name === "Sign Out")) {
                            return null;
                        }
                        return (
                            <Link 
                                key={index} 
                                to={link.link} 
                                className="uppercase text-sm font-medium"
                                onClick={(e) => handleLinkClick(e, link)}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
            
            <div className={`${isOpen ? "block" : "hidden"} md:hidden absolute bg-neutral-50 w-full py-5 px-4 mt-2 border-b-4`}>
                {LINKS.map((link, index) => {
                    // Don't show "Sign In" if user is authenticated
                    // Don't show "Sign Out" if user is not authenticated
                    if ((user && link.name === "Sign In") || (!user && link.name === "Sign Out")) {
                        return null;
                    }
                    return (
                        <Link 
                            key={index} 
                            to={link.link} 
                            className="uppercase text-lg font-medium block py-2 tracking-wide"
                            onClick={(e) => handleLinkClick(e, link)}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />

            {/* Scroll to Top Buttons */}
            {showScrollUpButton && isDesktop && (
                <>
                    {/* Left Scroll to Top Button */}
                    <button 
                        className="fixed top-1/2 left-4 transform -translate-y-1/2 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300 z-50"
                        onClick={scrollToTop}
                        aria-label="Scroll to top left"
                    >
                        <RiArrowUpLine size={24} />
                    </button>

                    {/* Right Scroll to Top Button */}
                    <button 
                        className="fixed top-1/2 right-4 transform -translate-y-1/2 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300 z-50"
                        onClick={scrollToTop}
                        aria-label="Scroll to top right"
                    >
                        <RiArrowUpLine size={24} />
                    </button>
                </>
            )}
        </nav>
    );
};

export default Navbar;