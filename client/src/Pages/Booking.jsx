import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_SERVICES, GET_STYLISTS, ADD_APPOINTMENT, GET_STYLIST_APPOINTMENTS } from '../utils/mutations';

const Booking = () => {
    const [getStylistAppointments, { loading: loadingAppointments, data: appointmentsData }] = useLazyQuery(GET_STYLIST_APPOINTMENTS);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        stylistId: '',
        serviceId: '',
        date: '',
        time: '',
        notes: ''
    });
    const [availableTimes, setAvailableTimes] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [services, setServices] = useState(null);

    const { loading: loadingServices, data: servicesData } = useQuery(GET_SERVICES);
    const { loading: loadingStylists, data: stylistsData, error: stylistsError } = useQuery(GET_STYLISTS);
    const [addAppointment] = useMutation(ADD_APPOINTMENT);

    const updateAvailableTimes = async (stylistId, date) => {
        try {
            const { data } = await getStylistAppointments({
                variables: { stylistId, date }
            });

            if (!data || !data.stylistAppointments) {
                setAvailableTimes(generateTimeOptions());
                return;
            }

            const validAppointments = data.stylistAppointments.filter(app => app.time);

            const bookedTimes = validAppointments.map(app => {
                let durationInMinutes = 30;
                if (app.service && app.service.duration) {
                    durationInMinutes = parseInt(app.service.duration.toString(), 10);
                    if (app.service.duration.toString().length === 1) {
                        durationInMinutes *= 60;
                    }
                }
                return {
                    time: app.time,
                    duration: durationInMinutes
                };
            });

            const allTimes = generateTimeOptions();
            const newServiceDuration = services?.duration || 30;

            const available = allTimes.filter(time => {
                const [hours, minutes, ampm] = time.split(/[:\s]/);
                const hour24 = ampm === 'PM' && hours !== '12' ? parseInt(hours) + 12 : (ampm === 'AM' && hours === '12' ? 0 : parseInt(hours));
                const timeSlot = new Date(date);
                timeSlot.setHours(hour24, parseInt(minutes), 0, 0);
                const timeSlotEnd = new Date(timeSlot.getTime() + newServiceDuration * 60000);
                const closingTime = new Date(date);
                closingTime.setHours(17, 0, 0, 0);

                if (timeSlotEnd > closingTime) {
                    return false;
                }

                return !bookedTimes.some(bookedTime => {
                    const [bookedHours, bookedMinutes, bookedAmpm] = bookedTime.time.split(/[:\s]/);
                    const bookedHour24 = bookedAmpm === 'PM' && bookedHours !== '12' ? parseInt(bookedHours) + 12 : (bookedAmpm === 'AM' && bookedHours === '12' ? 0 : parseInt(bookedHours));
                    const bookedStart = new Date(date);
                    bookedStart.setHours(bookedHour24, parseInt(bookedMinutes), 0, 0);
                    const bookedEnd = new Date(bookedStart.getTime() + bookedTime.duration * 60000);

                    return (
                        (timeSlot >= bookedStart && timeSlot < bookedEnd) ||
                        (timeSlotEnd > bookedStart && timeSlotEnd <= bookedEnd) ||
                        (timeSlot <= bookedStart && timeSlotEnd >= bookedEnd)
                    );
                });
            });

            if (available.length === 0) {
                const stylist = stylistsData.stylists.find(s => s._id === stylistId);
                setErrorMessage(`${stylist.user.name} doesn't have spots available for this date. Please select another stylist or day.`);
            } else {
                setErrorMessage('');
            }

            setAvailableTimes(available);

        } catch (error) {
            setAvailableTimes([]);
        }
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 9; hour <= 16; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour > 12 ? hour - 12 : hour;
                const time = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
                if (hour < 16 || (hour === 16 && minute === 0)) {
                    options.push(time);
                }
            }
        }
        options.push("04:30 PM");
        return options;
    };

    const handleStylistChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            time: ''
        }));
        setErrorMessage('');
        if (value && formData.date && formData.serviceId) {
            const selectedService = servicesData.services.find(service => service._id === formData.serviceId);
            updateAvailableTimes(value, formData.date, selectedService.duration);
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            time: ''
        }));
        setErrorMessage('');
        if (formData.stylistId && value && formData.serviceId) {
            const selectedService = servicesData.services.find(service => service._id === formData.serviceId);
            updateAvailableTimes(formData.stylistId, value, selectedService.duration);
        }
    };

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            time: ''
        }));
        setErrorMessage('');
        if (formData.stylistId && formData.date && value) {
            const selectedService = servicesData.services.find(service => service._id === value);
            updateAvailableTimes(formData.stylistId, formData.date, selectedService.duration);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const { data } = await addAppointment({
                variables: {
                    ...formData,
                    stylistId: formData.stylistId,
                    serviceId: formData.serviceId
                }
            });
            if (data.addAppointment) {
                setSuccessMessage('Appointment booked successfully!');
                setErrorMessage('');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    stylistId: '',
                    serviceId: '',
                    date: '',
                    time: '',
                    notes: ''
                });
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err) {
            setErrorMessage('Error booking appointment. Please try again.');
            setSuccessMessage('');
        }
    };

    const formatDuration = (durationInMinutes) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''}`;
        } else {
            return `${minutes} min`;
        }
    };

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);
        setFormData(prevState => ({
            ...prevState,
            date: formattedDate
        }));
    }, []);

    useEffect(() => {
        if (formData.serviceId && servicesData) {
            const selectedService = servicesData.services.find(service => service._id === formData.serviceId);
            if (selectedService) {
                const durationInMinutes = selectedService.duration.toString().length === 1 
                    ? selectedService.duration * 60 
                    : selectedService.duration;
                setServices({...selectedService, duration: durationInMinutes});
            }
        }
    }, [formData.serviceId, servicesData]);

    useEffect(() => {
        if (formData.stylistId && formData.date && services) {
            updateAvailableTimes(formData.stylistId, formData.date);
        }
    }, [formData.stylistId, formData.date, services]);

    if (loadingServices || loadingStylists) return <p>Loading...</p>;
    if (stylistsError) return <p>Error loading stylists!</p>;
    if (!stylistsData || !stylistsData.stylists) return <p>No stylists available</p>;

    return (
        <section className="max-w-7xl mx-auto p-4 border-b-2">
            <div className="flex flex-col items-center my-10">
                <h1 className="text-3xl font-semibold mb-4">Book an Appointment</h1>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-4" role="alert">
                        <span>{successMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4" role="alert">
                        <span>{errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="stylistId">
                            Stylist
                        </label>
                        <select
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="stylistId"
                            name="stylistId"
                            value={formData.stylistId}
                            onChange={handleStylistChange}
                            required
                        >
                            <option value="">Select a stylist</option>
                            {stylistsData.stylists.map(stylist => (
                                <option key={stylist._id} value={stylist._id}>
                                    {stylist.user.name} {stylist.user.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="serviceId">
                            Service
                        </label>
                        <select
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="serviceId"
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleServiceChange}
                            required
                        >
                            <option value="">Select a service</option>
                            {servicesData.services.map(service => (
                                <option key={service._id} value={service._id}>
                                    {service.name} - {formatDuration(service.duration)} - ${service.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="date">
                            Date
                        </label>
                        <input
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="date"
                            type="date"
                            name="date"
                            min={minDate}
                            value={formData.date}
                            onChange={handleDateChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="time">
                            Time
                        </label>
                        <select
                            className={`border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300 ${(!formData.stylistId || !formData.serviceId || availableTimes.length === 0) ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            disabled={!formData.stylistId || !formData.serviceId || availableTimes.length === 0}
                        >
                            <option value="">
                                {!formData.stylistId || !formData.serviceId
                                    ? "Please select stylist, date and service first"
                                    : availableTimes.length === 0
                                        ? "No available times"
                                        : "Select a time"}
                            </option>
                            {availableTimes.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            className="border rounded p-2 text-sm w-full focus:outline-none focus:ring focus:border-blue-300"
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="px-4 py-2 bg-rosy-brown text-white text-base font-medium rounded-xl w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        type="submit"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Booking;
