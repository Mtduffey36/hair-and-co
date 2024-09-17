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
import MeganPortfolio from "./pages/MeganPortfolio"
import MalloryPortfolio from "./pages/MalloryPortfolio"
import KaylaPortfolio from "./pages/KaylaPortfolio"

const client = new ApolloClient({
  //For testing copy and paste the URL given when u run your server
  uri: 'http://localhost:3001/graphql', 
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/booking" element={<Booking />} />
<<<<<<< HEAD
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
=======
            <Route path="/meganPortfolio" element={<MeganPortfolio />} />
            <Route path="/malloryPortfolio" element={<MalloryPortfolio />} />
            <Route path="/kaylaPortfolio" element={<KaylaPortfolio />} />
>>>>>>> a32f18613ffe7395af748e6c1bec8f24c9e82e52
          </Routes>
          <Footer />
          <Lightbox />
        </main>
      </Router>
    </ApolloProvider>
  )
}

export default App;