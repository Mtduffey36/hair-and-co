import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_STYLISTS, GET_SERVICES } from '../utils/mutations';

const AdminHome = () => {
    const { loading: loadingUsers, data: usersData } = useQuery(GET_USERS)
    const { loading: loadingStylist, data: stylistData } = useQuery(GET_STYLISTS)
    const { loading: loadingServices, data: servicesData } = useQuery(GET_SERVICES)
    
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
            {Array.from({length:Math.max(users.length, stylists.length, services.length)}).map((_,index) => 
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
            <th className="py-3 px-4 text-left">Services</th>
          </tr>
        </thead>
        <tbody>
            {Array.from({length:Math.max(users.length, stylists.length, services.length)}).map((_,index) => 
                <tr key={index} className={index%2 === 0 ? 'bg-gray-50': 'bg-white'}> 
                <td className='py-2 px-4 border-b'> {services[index]?.name || ''}</td>
                </tr>
            )}
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
            {Array.from({length:Math.max(users.length, stylists.length, services.length)}).map((_,index) => 
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