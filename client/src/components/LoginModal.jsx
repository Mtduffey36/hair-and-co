import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import {jwtDecode } from 'jwt-decode';
import {useApolloClient} from '@apollo/client'


const LoginModal = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const { login: authLogin } = useAuth();
  const client = useApolloClient();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      
      localStorage.setItem('token', data.login.token);
      
      authLogin(data.login.token);
  
      const decodedToken = jwtDecode(data.login.token);
  
      if (decodedToken.user.role === 2) {
        navigate('/adminHome');
      } else if(decodedToken.user.role === 0){
        navigate('/UserDashboard');
      }
      client.resetStore();
      onClose();
    } catch (e) {
      console.error('Error:', e);
      setLoginError(e.message);
    }
  };

  if (!isOpen) return null;

  const handleClickOutside = (event) => {
    if (event.target.id === 'modal-background') {
      onClose();
    }
  };

  return (
    <div 
      id="modal-background" 
      className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" 
      onClick={handleClickOutside}
    >
      <div className="relative p-6 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
        {loginError && (
  <p className="text-red-500 text-xs italic mt-2">
    
  </p>
)}
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign In</h3>
          <form className="mt-2 px-7 py-3" onSubmit={handleFormSubmit}>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-4"
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-4"
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl bg-rosy-brown py-2
                        px-6 font-Montserrat font-medium text-white hover:bg-gray-700"
            >
              Sign In
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-xs italic">
              {error.message}
            </p>
          )}
        </div>
        <p id='or'>Don't have an account?</p>
        <div className="items-center px-7 py-3">
          <button
            id="ok-btn"
            className="px-4 py-2 bg-rosy-brown text-white text-base font-medium rounded-xl w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => { 
              onClose();
              navigate('/signup')}}
          >
            Create Account
          </button>
          <p></p>
        </div>
        <div className="items-center px-7 py-3">
          <button
            id="ok-btn"
            className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-xl w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
