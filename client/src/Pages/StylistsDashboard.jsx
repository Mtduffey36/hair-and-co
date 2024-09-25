import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import MyCalendar from '../components/AdminCal';
import { useQuery } from '@apollo/client';
import { GET_STYLIST_APPOINTMENTS_BY_EMAIL } from '../utils/querys';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function formatDateForCalendar(dateStr, timeStr) {
  const formattedDate = dayjs(`${dateStr} ${timeStr}`, 'YYYY-MM-DD hh:mm A').toDate();
  return formattedDate;
}

const countTodayAppointments = (appointments) => {
  const today = dayjs().format('YYYY-MM-DD');
  return appointments.filter(appointment => 
    dayjs(appointment.start).format('YYYY-MM-DD') === today
  ).length;
};

const StylistsDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);

  const { loading, error, data } = useQuery(GET_STYLIST_APPOINTMENTS_BY_EMAIL, {
    variables: { email: user?.email },
    skip: !user?.email,
    fetchPolicy: 'network-only' //This gonna force the query to always reach for server instead local storage
  });


  useEffect(() => {
    if (data && data.stylistAppointmentsByEmail) {
      const mappedAppointments = data.stylistAppointmentsByEmail.map(appointment => {
        if (!appointment.date || !appointment.time) {
          console.error('Missing date or time:', appointment);
          return null;
        }
  
        const startDate = formatDateForCalendar(appointment.date, appointment.time);
        if (!dayjs(startDate).isValid()) {
          console.error('Invalid date:', appointment.date, appointment.time);
          return null;
        }
        
        const serviceDuration = appointment.service?.duration || 30;
        const endDate = dayjs(startDate).add(serviceDuration, 'minute').toDate();    
        return {
          title: `${appointment.service?.name} - ${appointment.firstName} ${appointment.lastName}`,
          start: startDate,
          end: endDate,
          resource: appointment
        };
      }).filter(appointment => appointment !== null);  
      
      const filteredAppointments = mappedAppointments.filter(appointment => {
        const startHour = dayjs(appointment.start).hour();
        const endHour = dayjs(appointment.end).hour();
        const isWithinHours = startHour >= 9 && endHour <= 17;
        return isWithinHours;
      });
  
      setAppointments(filteredAppointments);
      const todayCount = countTodayAppointments(filteredAppointments);
      setTodayAppointmentsCount(todayCount);
    }
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL error:', error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Stylists Dashboard</h1>
        <p className="text-xl">Welcome, {user?.name || 'View, Edit and Update your profile'}!</p>
        <p className="mt-2">This is your personal dashboard.</p>
        <p className="mt-4 text-lg">
          You have {todayAppointmentsCount} appointment{todayAppointmentsCount !== 1 ? 's' : ''} for today.
        </p>
      </div> 
      <div className="mt-8">
        <MyCalendar events={appointments}/>
      </div>
    </>
  );
};

export default StylistsDashboard;