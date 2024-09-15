import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from "./Hero";
import Services from "./Services";
import Portfolio from "./Portfolio";
import About from "./About";
import Reviews from "./Reviews";
import ContactUs from "./ContactUs";
import OurWork from "./OurWork";
import Appointments from "./Appointments";

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
      <section id="services"><Services /></section>
      <section id="appointments"><Appointments /></section>
      <section id="portfolio"><Portfolio /></section>
      <section id="OurWork"><OurWork /></section>
      <section id="about"><About /></section>
      <section id="reviews"><Reviews /></section>
      <section id="contact"><ContactUs /></section>
    </>
  );
};

export default Home;