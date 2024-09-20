import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lightbox from "yet-another-react-lightbox";
import SignUp from "./Pages/SignUp";
import Booking from "./Pages/Booking";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Home from "./components/Home";
import MeganPortfolio from "./Pages/MeganPortfolio";
import MalloryPortfolio from "./Pages/MalloryPortfolio";
import KaylaPortfolio from "./Pages/KaylaPortfolio";
import AdminHome from "./Pages/AdminHome"
import AdminServices from "./Pages/AdminServices";

const client = new ApolloClient({
  //For testing copy and paste the URL given when u run your server
  uri: 'http://localhost:3001/graphql', 
  credentials: 'include',
  cache: new InMemoryCache()
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main className="overflow-x-hidden antialiased text-neutral-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/meganPortfolio" element={<MeganPortfolio />} />
            <Route path="/malloryPortfolio" element={<MalloryPortfolio />} />
            <Route path="/kaylaPortfolio" element={<KaylaPortfolio />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/AdminServices" element={<AdminServices />} />
          </Routes>
          <Footer />
          <Lightbox />
        </main>
      </Router>
    </ApolloProvider>
  )
}

export default App;