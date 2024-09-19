import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseLine, RiMenu3Line, RiArrowUpLine } from "@remixicon/react";
import { LINKS } from "../constants";
import LoginModal from './LoginModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showScrollUpButton, setShowScrollUpButton] = useState(false);
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

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="border-b-2 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-8">
                <div className="pl-2">
                    {/* <Link to="/">
                        <img src={logo} width={150} height={15} alt="VastuSpaze" />
                    </Link> */}
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
                    {LINKS.map((link, index) => (
                        <Link 
                            key={index} 
                            to={link.link} 
                            className="uppercase text-sm font-medium"
                            onClick={(e) => handleLinkClick(e, link)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} md:hidden absolute bg-neutral-50
                w-full py-5 px-4 mt-2 border-b-4`}>
                {LINKS.map((link, index) => (
                    <Link 
                        key={index} 
                        to={link.link} 
                        className="uppercase text-lg font-medium block py-2 tracking-wide"
                        onClick={(e) => handleLinkClick(e, link)}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />

            {/* Scroll to Top Button */}
            {showScrollUpButton && (
                <button 
                    className="fixed bottom-8 left-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <RiArrowUpLine size={24} />
                </button>
            )}
        </nav>
    );
};

export default Navbar;
