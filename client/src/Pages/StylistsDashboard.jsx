import React from 'react';
import { useAuth } from '../utils/auth';

const StylistsDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Stylists Dashboard</h1>
      <p className="text-xl">Welcome, {user?.name || 'View, Edit and Update your profile'}!</p>
      <p className="mt-2">This is your personal dashboard.</p>
    </div>
  );
};

export default StylistsDashboard;