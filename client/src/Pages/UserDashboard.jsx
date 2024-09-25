import React, { useState } from 'react';
import { useQuery, useMutation  } from '@apollo/client';
import { GET_USER_APPOINTMENTS } from '../utils/querys';
import {CANCEL_APPOINTMENT } from '../utils/mutations';
import { useAuth } from '../utils/auth';


const UserDashboard = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_USER_APPOINTMENTS, {
    variables: { email: user?.email },
    skip: !user?.email
  });
  const [cancelAppointment] = useMutation(CANCEL_APPOINTMENT, {
    refetchQueries: [{ query: GET_USER_APPOINTMENTS, variables: { email: user?.email } }],
  });

  if (!user) return <p className="text-center mt-4">Please log in to view your appointments.</p>;
  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error.message}</p>;

  const appointments = data?.userAppointments || [];

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const { data } = await cancelAppointment({
          variables: { id: appointmentId },
        });
        if (data.cancelAppointment._id) {
        }
      } catch (error) {
      }
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 p-4 bg-gray-100">Your Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-center py-4">You don't have upcoming appointments </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stylist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment, index) => (
                  <tr key={appointment._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.service.name} - ${appointment.service.price} ({appointment.service.duration} mins)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.stylist.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleDelete(appointment._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️ Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


export default UserDashboard;