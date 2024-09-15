import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { RiCloseLine, RiMenu3Line } from "@remixicon/react"
import { LINKS } from "../constants"
import LoginModal from './LoginModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleSignInClick = (e) => {
        e.preventDefault()
        setIsLoginModalOpen(true)
    }

    const handleLinkClick = (e, link) => {
        if (link.name === "Sign In") {
            handleSignInClick(e)
        } else {
            e.preventDefault()
            navigate('/' + link.link)
            setTimeout(() => {
                const element = document.getElementById(link.link.replace('#', ''))
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        }
        if (isOpen) {
            setIsOpen(false)
        }
    }

    return (
        <nav className="border-b-2">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-8">
                <div className="pl-2">
                    {/* <Link to="/">
                        <img src={logo} width={150} height={15} alt="VastuSpaze" />
                    </Link> */}
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-2xl pr-2 focus:outline-none"
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
        </nav>
    )
}

export default Navbar