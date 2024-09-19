import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_STYLISTS, GET_SERVICES, DELETE_SERVICE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';


const AdminHome = () => {
    const { loading: loadingUsers, data: usersData } = useQuery(GET_USERS)
    const { loading: loadingStylist, data: stylistData } = useQuery(GET_STYLISTS)
    const { loading: loadingServices, data: servicesData } = useQuery(GET_SERVICES)
    const navigate = useNavigate();

    const [deleteService] = useMutation(DELETE_SERVICE);
const handleDelete = async (serviceId) => {
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
        alert('Service deleted successfully. The page will reload in 3 seconds.');
         setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service. Please try again.');
    }
  }
};

        if(loadingUsers || loadingStylist || loadingServices) {
            return <div>Loading...</div>;
        }
        const users = usersData?.users || [];
        const stylists = stylistData?.stylists || [];
        const services = servicesData?.services || [];

    
    return (
       <section>
       <div className='container mx-auto p-6'>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Users</th>
          </tr>
        </thead>
        <tbody>
            {Array.from({length:Math.max(users.length)}).map((_,index) =>
                <tr key={index} className={index%2 === 0 ? 'bg-gray-50': 'bg-white'}>
                <td className='py-2 px-4 border-b'> {users[index]?.name || ''}</td>
                </tr>
            )}
        </tbody>
            </table>
        </div>
        <div className='container mx-auto p-6'>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
          <th className="py-3 px-4 text-left">Name</th>
             <th className="py-3 px-4 text-left">Description</th>
             <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Options</th>
        <th className="py-3 px-4 text-left flex justify-between items-center">
              <button
                onClick={() => navigate('/create-service')}
                className="ml-4 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                title="Create new service"
              >
                Create New Service
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
  {services.map((service, index) => (
    <tr key={service._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
      <td className='py-2 px-4 border-b'>{service.name}</td>
      <td className='py-2 px-4 border-b'>{service.description}</td>
      <td className='py-2 px-4 border-b'>${service.price.toFixed(2)}</td>
      <td className='py-2 px-4 border-b'>
        {/* <button
          onClick={() => handleEdit(service._id)}
          className="mr-2 text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit
        </button> */}
        <button
          onClick={() => handleDelete(service._id)}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
        </div>
        <div className='container mx-auto p-6'>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Stylists</th>
          </tr>
        </thead>
        <tbody>
            {Array.from({length:Math.max(stylists.length)}).map((_,index) =>
                <tr key={index} className={index%2 === 0 ? 'bg-gray-50': 'bg-white'}>
                <td className="py-2 px-4 border-b">{stylists[index]?.user?.name || ''}</td>
                </tr>
            )}
        </tbody>
            </table>
        </div>
        </section>
    )
}
export default AdminHome