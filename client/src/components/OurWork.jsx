import * as React from 'react'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import HairBlowout from "../assets/HairBlowout.jpg"
import slide1 from "../assets/MeganHairOne.jpg";
import slide2 from "../assets/HairShots.jpg";
import slide3 from "../assets/CopperHair.jpg";

const OurWork = () => {

    const [open, setOpen] = React.useState(false);

    return (
        <>
        <section className="max-w-7xl mx-auto border-b-2 mt-20" id="OurWork">
            <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase
            mb-12 mx-4">Our Work</h2>
            <div className="flex flex-col items-center lg:space-x-8 mx-4 mb-20">
                    Enter Photo Gallery Below!!!

            <button type="button" onClick={() => setOpen(true)}>
                <img src={HairBlowout} alt="Hair Blowout" className="mt-8 h-96 w-full object-cover"/>
            </button>

            <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[
                { src: slide1 },
                { src: slide2 },
                { src: slide3 },
            ]}

            />
                <p className="text-lg lg:text-2xl font-light text-center lg:text-left max-w-5xl mx-aut0 mt-8">
                    Book an appointment with one of our Stylist 
                    
                    <div className="flex items-center rounded-xl bg-rose-200 p-2
                        px-6 font-sans font-medium text-black hover:bg-gray-500">
                    <button> Book Now!</button>
                    </div>
                </p>
            </div>
        </section>
    </>
    )
}

export default OurWork 