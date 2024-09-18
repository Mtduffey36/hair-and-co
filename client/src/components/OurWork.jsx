import { useNavigate } from "react-router-dom";

import * as React from 'react'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import {
    Captions,
    Fullscreen,
    Thumbnails,
    Zoom,
  } from 'yet-another-react-lightbox/plugins';
  import 'yet-another-react-lightbox/plugins/captions.css';
  import 'yet-another-react-lightbox/plugins/thumbnails.css';

//photo gallery
import HairBlowout from "../assets/HairBlowout.jpg"
import slide1 from "../assets/MeganHairOne.jpg";
import slide2 from "../assets/HairShots.jpg";
import slide3 from "../assets/CopperHair.jpg";


const OurWork = () => {
        const navigate = useNavigate();
    
        const handleBookingClick = () => {
            navigate("/booking")
        }

    const [open, setOpen] = React.useState(false);

    return (
        <>
        <section className="max-w-7xl mx-auto border-b-2 mt-20" id="OurWork">
            <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase
            mb-12 mx-4">Take a look at some of our work</h2>
            <div className="flex flex-col items-center lg:space-x-8 mx-4 mb-20 ">
                Click any photo to enter into the photo gallery

            <button id="slides" type="button" onClick={() => setOpen(true)} className="w-full">
            <img src={HairBlowout} alt="Hair Blowout" className="mt-8 w-full h-auto object-cover lg:h-96"/>
            <img src={slide1} alt="MeganHairOne" className="mt-8 w-full h-auto object-cover lg:h-96"/>
            <img src={slide2} alt="HairShots" className="mt-8 w-full h-auto object-cover lg:h-96"/>
            <img src={slide3} alt="CopperHair" className="mt-8 w-full h-auto object-cover lg:h-96"/>
            </button>

            <Lightbox
            plugins={[Captions, Fullscreen, Zoom, Thumbnails]}
            open={open}
            close={() => setOpen(false)}
            slides={[
                { src: slide1 },
                { src: slide2 },
                { src: slide3 },
            ]}

            />
                <p className="text-lg lg:text-2xl font-light text-center lg:text-left max-w-5xl mx-auto mt-8">
                    Love our work? Book an appointment with one of our Stylist! 
                    
                    <div className="max-w-xs text-lg text-center mx-auto">
                        <br />
                    <button className="rounded-xl bg-rosy-brown py-2
                        px-6 font-Montserrat font-medium text-white hover:bg-gray-500"
                        onClick={handleBookingClick}> Book Now!</button>
                    </div>

                </p>
            </div>
        </section>
    </>
    )
}

export default OurWork 