import { useNavigate } from "react-router-dom";
import { SERVICES_CONTENT } from "../constants"
import { HERO_CONTENT } from "../constants"

const Services = () => {
    const navigate = useNavigate();
    
    const handleBookingClick = () => {
        navigate("/booking")
    }

    return (
        <section className="max-w-7xl mx-auto border-b-2" id="services">
             <div className="flex flex-col items-center my-20">
                <h1 id="logo" className="text-6xl lg:text-[10rem] p-2 uppercase font-text-fraunces">
                    {HERO_CONTENT.title}
                </h1>
                </div>
            <div className="my-20">
                <h2 className="text-xl lg:text-3xl tracking-tight text-center
                uppercase mb-20"> Our Salon Services</h2>
                {SERVICES_CONTENT.map((service, index) => (
                    <div key={index} className="mb-12 mx-4 flex flex-col lg:flex-row">
                        <div className={`lg:w-1/2 mb-4 lg:mb-0 ${index % 2 === 0 ? "" : "lg:order-2"}`}>
                            <img src={service.image} alt={service.title}
                            className="w-full h-auto object-cover rounded-lg" />
                    </div>
                    <div className={`lg:w-1/2 flex flex-col ${
                        index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"}`}>
                            <h3 className="text-xl lg:text-2xl font-medium mb-2">
                                {service.title}
                            </h3>
                            <p className="mb-4 lg:tracking-wide text-lg lg:text-xl lg:leading-9">
                               <ul>
                               <li id="service-name"><strong>Cuts (a la cart)</strong> </li>
                                <li>Woman's dry haircut - $35+</li>
                                <li>Woman's shampoo, cut and style - $50+</li>
                                <li>Men's Cut - $20+ </li>
                                <li>Men's cut, wash, and beard trim - $35+</li>
                                <li>Kids hair cut - $20-$25+</li>
                               
                               <br/> 
                               <li id="service-name"><strong>Color Services (a la cart)</strong> </li>
                                <li>New growth only - $65+ </li>
                                <li>New growth to ends - $85+</li>
                                <li>Partial Highlights - $115+ </li>
                                <li>Full Highlights - $140+ </li>
                                <li>Root touch-up and highlights - $145</li>
                                <li>Balayage - $115+, Toner - $40</li>

                                <br/> 
                                <li id="service-name"><strong>Chemical Services</strong> </li>
                                <li>Brazilian Blowout - $175+</li>
                                
                                </ul> 
                                <div className="max-w-xs text-lg text-center mx-auto py-10">
                                <button className="rounded-xl bg-rosy-brown py-2
                                 px-6 font-Montserrat font-medium text-white hover:bg-gray-500"
                                onClick={handleBookingClick}> Book Now!</button>
                    
                                </div>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services