import React from 'react';
import { useAuth } from '../utils/auth';


const UserDashboard = () => {
  const { user } = useAuth();


  return (
  
    <div className="container mx-auto p-6 space-y-8">
    {/* Users Table */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 p-4 bg-gray-100">Appointments</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                    </tr>
                </thead>
                {/* <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>

                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    </div>
    </div>
  );
};

export default UserDashboard;