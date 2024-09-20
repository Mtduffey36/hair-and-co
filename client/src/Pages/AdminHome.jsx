import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_STYLISTS, GET_SERVICES } from '../utils/querys';
import {DELETE_SERVICE, DELETE_STYLIST} from '../utils/mutations'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const { loading: loadingUsers, data: usersData } = useQuery(GET_USERS)
    const { loading: loadingStylist, data: stylistData } = useQuery(GET_STYLISTS)
    const { loading: loadingServices, data: servicesData } = useQuery(GET_SERVICES)
    const navigate = useNavigate();
    const [deleteService] = useMutation(DELETE_SERVICE);
    const [deleteStylist] = useMutation(DELETE_STYLIST);

    //Delete Service
    const handleDeleteService = async (serviceId) => {
      if (window.confirm('Are you sure you want to delete this service?')) {
        try {
          const { data } = await deleteService({
            variables: { serviceId },
            update(cache) {
              const existingServices = cache.readQuery({ query: GET_SERVICES });
              const newServices = existingServices.services.filter(
                (service) => service._id !== serviceId
              );
              cache.writeQuery({
                query: GET_SERVICES,
                data: { services: newServices },
              });
            },
          });
          if (data.deleteService) {
            console.log('Service deleted successfully');
            alert('Service deleted successfully!');
             setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        } catch (error) {
          console.error('Error deleting service:', error);
          alert('Error deleting service. Please try again.');
        }
      }
    };
    //Delete Stylist
    const handleDeleteStylist = async (stylistId) => {
      if (window.confirm('Are you sure you want to delete this stylist?')) {
        try {
          const { data } = await deleteStylist({
            variables: { stylistId },
            update(cache) {
              const existingStylists = cache.readQuery({ query: GET_STYLISTS });
              const newStylists = existingStylists.stylists.filter(
                (stylist) => stylist._id !== stylistId
              );
              cache.writeQuery({
                query: GET_STYLISTS,
                data: { stylists: newStylists },
              });
            },
          });
          if (data.deleteStylist) {
            console.log('Stylist deleted successfully');
            alert('Stylist deleted successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        } catch (error) {
          console.error('Error deleting stylist:', error);
          alert('Error deleting stylist. Please try again.');
        }
      }
    };

    if(loadingUsers || loadingStylist || loadingServices) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    const users = usersData?.users || [];
    const stylists = stylistData?.stylists || [];
    const services = servicesData?.services || [];

    return (
        <div className="container mx-auto p-6 space-y-8">
            {/* Users Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-2xl font-bold mb-4 p-4 bg-gray-100">Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                            
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-gray-100">
                    <h2 className="text-2xl font-bold">Services</h2>
                    <button
                        onClick={() => navigate('/AdminServices')}
                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Create New Service
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {services.map((service, index) => (
                                <tr key={service._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${service.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteService(service._id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stylists Table */}
<div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="flex justify-between items-center p-4 bg-gray-100">
        <h2 className="text-2xl font-bold">Stylists</h2>
        <button
            onClick={() => navigate('/AdminStylists')}
            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
            Create New Stylist
        </button>
    </div>
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>


                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {stylists.map((stylist, index) => (
                    <tr key={stylist._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap">{stylist.name || ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stylist.lastName || ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stylist.email || ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stylist.phoneNumber || ''}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteStylist(stylist._id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>



                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
        </div>
    )
}

export default AdminHome;