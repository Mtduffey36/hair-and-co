import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './utils/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminHome from "./Pages/AdminHome";
import AdminServices from "./Pages/AdminServices";
import AdminStylists from "./Pages/AdminStylists";
import UserDashboard from "./Pages/UserDashboard";
import StylistsDashboard from "./Pages/StylistsDashboard";
import ChangeDefaultPassword from "./Pages/ChangeDefaultPassword";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './utils/calendar.css';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('token');
  return{
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const App = () => {
  const { user } = useAuth();

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

            <Route 
              path="/userDashboard" 
              element={
                <ProtectedRoute requiredRole={0}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
  path="/ChangeDefaultPassword" 
  element={
    <ProtectedRoute requiredRole={1}>
      <ChangeDefaultPassword />
    </ProtectedRoute>
  } 
/>

              <Route 
              path="/StylistsDashboard" 
              element={
                <ProtectedRoute requiredRole={1}>
                  <StylistsDashboard/>
                </ProtectedRoute>
              } 
            />  


            <Route 
              path="/" 
              element={
                user 
                  ? (user.role === 2 
                      ? <Navigate to="/adminHome" replace /> 
                      : <Navigate to="/" replace />)
                  : <Home />
              } 
            />

{/* Protected Admin Routes */}
  
            <Route 
              path="/adminHome" 
              element={
                <ProtectedRoute requiredRole={2}>
                  <AdminHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/AdminServices" 
              element={
                <ProtectedRoute requiredRole={2}>
                  <AdminServices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/AdminStylists" 
              element={
                <ProtectedRoute requiredRole={2}>
                  <AdminStylists />
                </ProtectedRoute>
              } 
            />



          </Routes>
          <Footer />
          <Lightbox />
        </main>
      </Router>
    </ApolloProvider>
  )
}

export default App;