import { useState, useEffect } from 'react';
import {jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 > Date.now()) {
            setUser(decodedToken.user);
          } else {
            localStorage.removeItem('token');
          }
        }
        setLoading(false);
      }, [])

      const login = (token, updatedUser = null) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const newUser = updatedUser || decodedToken.user;
        setUser(newUser);
        return newUser; 
      };
    
      const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
      };
    
      return { user, loading, login, logout };
    };
