import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";
import ContactUs from "./ContactUs";
import OurWork from "./OurWork";


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <section id="OurWork"><OurWork /></section>
      <section id="portfolio"><Portfolio /></section>
      <section id="reviews"><Reviews /></section>
      <section id="contact"><ContactUs /></section>
    </>
  );
};

export default Home;