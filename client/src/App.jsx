import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Reviews from "./components/Reviews";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import OurWork from "./components/OurWork";
import Appointments from "./components/Appointments";
import Booking from "./Pages/Booking";
import Lightbox from "yet-another-react-lightbox";


const App = () => {
  return (
    <Router> 
    <main className="overflow-x-hidden antialiased text-neutral-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<> 
      <Hero />
      <Appointments />
      <Services />
      <Portfolio />
      <OurWork />
      <About />
      <Reviews />
      <ContactUs />
      </>} />
      <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
      <Lightbox />
    </main>
    </Router>
  )
}
export default App
