import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Reviews from "./components/Reviews";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Lightbox from "yet-another-react-lightbox";
import OurWork from "./components/OurWork";
const App = () => {
  return (
    <main className="overflow-x-hidden antialiased text-neutral-800">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <OurWork />
      <About />
      <Reviews />
      <ContactUs />
      <Footer />
      <Lightbox />
    </main>
  )
}
export default App
