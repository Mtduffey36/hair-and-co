import React from "react";
import { useNavigate } from "react-router-dom";

const MalloryPortfolio = () => {
  const navigate = useNavigate();
    
  const handleBookingClick = () => {
      navigate("/booking")
  }
  return (
    <>
      <div id="about" className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div className="pt-1"></div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  About Mallory
                </h2>

                <p>
                She specializes in a wide range of haircutting techniques, 
                from classic bobs to edgy pixie cuts and everything in between. 
                With a keen eye for shape and proportion, She tailors each cut to suit the client's 
                face shape, hair texture, and personal style. 
                Whether you're looking for a dramatic change or a subtle refresh, 
                Mallory ensures that every haircut is executed with precision and artistry.
                  
                </p>
                <div className="max-w-xs text-lg text-center mx-auto">
                  <br />
                  <button onClick={handleBookingClick}
                    className="rounded-xl bg-rosy-brown py-2 mt-3
                        px-14 font-Montserrat font-medium text-white hover:bg-gray-500"
                  >
                    {" "}
                    Book Now!
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover object- sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="src\assets\Stylist2.jpg" alt="Stylist2"
          />
        </div>
      </div>
    </>
  );
};

export default MalloryPortfolio;
