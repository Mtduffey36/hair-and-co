import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const Appointments = () => {
    const navigate = useNavigate();

    const handleBookingClick = () => {
        navigate("/booking")
    }

    const handleSignUpClick = () => {
        navigate("/SignUp")
    }

    return (
        <section className="max-w-7xl mx-auto border-b-2" id="appointments">
            <div className="my-20">
                <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase mb-12">
                    Book an Appointment & Create an account
                </h2>
                <p className="max-w-2xl text-lg mb-12 text-center mx-auto">

                <div className="flex items-center rounded-xl bg-rose-200 p-2
                        px-6 font-sans font-medium text-black hover:bg-gray-500">
                    <button onClick={handleBookingClick}> Book Now!</button>
                    </div>  

                    <br />

                    <div className="flex items-center rounded-xl bg-rose-200 p-2
                        px-6 font-sans font-medium text-black hover:bg-gray-500">
                    <button onClick={handleSignUpClick}> Create an account!</button>
                    </div> 

                 
                </p>
                
            </div>
        </section>
    )
}

export default Appointments