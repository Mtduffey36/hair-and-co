import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { 
          ...formData,
          role: 0 
        }
      });
      console.log('User created:', data.addUser);
      alert('User registered successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div id='signupBackground' className="min-h- bg-gray-100 flex items-center justify-center py-6">
      <div className="sm:w-full sm:max-w-lg p-6 sm:p-8 space-y-4">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rosy-brown focus:border-rosy-brown text-base"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rosy-brown focus:border-rosy-brown text-base"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rosy-brown focus:border-rosy-brown text-base"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rosy-brown focus:border-rosy-brown text-base"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rosy-brown focus:border-rosy-brown text-base"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              Error: {error.message}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md bg-rosy-brown text-white text-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rosy-brown transition duration-150 ease-in-out"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
