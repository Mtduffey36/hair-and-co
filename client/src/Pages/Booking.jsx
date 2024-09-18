// import AdminCal from "../components/AdminCal" 
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

    //Updating Available times function
    const updateAvailableTimes = async (stylistId, date) => {
        try {
            //DELETE THIS BEFORE PRODUCTION
            console.log('Updating available times for:', { stylistId, date });
            //Declaring the query and assigning it as data
            const { data } = await getStylistAppointments({
                variables: { stylistId, date }
            });
            //Error handling
            if (!data || !data.stylistAppointments) {
                //DELETE THIS BEFORE PRODUCTION
                console.error('No appointments data received');
                //Calling function generate time options and setting them times as availableTimes
                setAvailableTimes(generateTimeOptions());
                return;
            }
            //Iterate between every validAppointment 
            const validAppointments = data.stylistAppointments.filter(app => app.time);
            
            const bookedTimes = validAppointments.map(app => {
                //Default duration in minutes is 30 since the shorter service time is 30 minutes
                let durationInMinutes = 30;
                //Check if app has a service and that service a duration
                if (app.service && app.service.duration) {
                    //If exist duration convert to integer 
                    durationInMinutes = parseInt(app.service.duration.toString(), 10);
                    //If duration length = 1 convert to MINS multiplying by 60
                    if (app.service.duration.toString().length === 1) {
                        durationInMinutes *= 60; 
                    }
                }
                //Return the new duration in minutes and the time
                return {
                    time: app.time,
                    duration: durationInMinutes
                };
            });
            //Assigning function generateTimeOptions to new const: allTimes 
            const allTimes = generateTimeOptions();
            // If exists a service and has a duration property newService duration will get that value, if it doesn't exist will have a value of 30 (MINS)
            const newServiceDuration = services?.duration || 30;
            
            //Available will contain only the times that success when filter goes by
            const available = allTimes.filter(time => {
                //All the times will have hours, minutes and will contain AM or PM
                const [hours, minutes, ampm] = time.split(/[:\s]/);
                // Convert the hour to 24 hour format
                const hour24 = ampm === 'PM' && hours !== '12' ? parseInt(hours) + 12 : (ampm === 'AM' && hours === '12' ? 0 : parseInt(hours));
                //Creates a Date Object for the initial time of potential appointment
                const timeSlot = new Date(date);
                timeSlot.setHours(hour24, parseInt(minutes), 0, 0);
                //Calculates the finalization time of potential appointment adding the duration to the service
                const timeSlotEnd = new Date(timeSlot.getTime() + newServiceDuration * 60000);
                //Stablish closing time to 5:00 PM
                const closingTime = new Date(date);
                closingTime.setHours(17, 0, 0, 0);
                //If appointment will end after closingTime this time will not be available
                if (timeSlotEnd > closingTime) {
                    return false;
                }
                //Method .some will check if some of the appointments on the database overlaps 
                //The time and date of the potential new appointment
                //-----
                //The ! used will invert the result giving true if time is available 
                return !bookedTimes.some(bookedTime => {
                    //Divides the time of the appointment in hours, mins and AM/PM
                    const [bookedHours, bookedMinutes, bookedAmpm] = bookedTime.time.split(/[:\s]/);
                    //Converts the time of appointment to 24hours format
                    const bookedHour24 = bookedAmpm === 'PM' && bookedHours !== '12' ? parseInt(bookedHours) + 12 : (bookedAmpm === 'AM' && bookedHours === '12' ? 0 : parseInt(bookedHours));
                   //Creates new object Date for the time of start of the new appointment
                    const bookedStart = new Date(date);
                    bookedStart.setHours(bookedHour24, parseInt(bookedMinutes), 0, 0);
                    //Calculates finalization time of the new appointment
                    const bookedEnd = new Date(bookedStart.getTime() + bookedTime.duration * 60000);
                    //Return 3 conditions of overlapping 
                    return (
                        //If the new appointment starts while an existing appointment
                        (timeSlot >= bookedStart && timeSlot < bookedEnd) ||
                        //If the new appointment ends while an existing appointment
                        (timeSlotEnd > bookedStart && timeSlotEnd <= bookedEnd) ||
                        //If the new appointment completely overlaps an existing appointment 
                        (timeSlot <= bookedStart && timeSlotEnd >= bookedEnd)
                    );
                });
            });
            //If the array available.lenght=0 set an error message to show at the beginning of the form
            //This can happen if the selected stylist doesn't have time spots available for that date and service(duration)
            if (available.length === 0) {
                const stylist = stylistsData.stylists.find(s => s._id === stylistId);
                setErrorMessage(`${stylist.user.name} doesn't have spots available for this date. Please select another stylist or day.`);
            } else {
                //If not, there's no error message
                setErrorMessage(''); 
            }
            //If there is no overlapping between existing and new appointment
            //The schedule is available and it's included in the array available
            setAvailableTimes(available);
             //DELETE THIS BEFORE PRODUCTION
            console.log('Available times:', available);
    
        } catch (error) {
             //DELETE THIS BEFORE PRODUCTION
            console.error('Error fetching appointments:', error);
            setAvailableTimes([]);
        }
    };
    
    const generateTimeOptions = () => {
        //Initialize empty array to save time options
        const options = [];
        //Iterate between 9:00AM until 4:00PM
        for (let hour = 9; hour <= 16; hour++) { 
            //For each hour iterate over minutes in 30 minutes intervals
            for (let minute = 0; minute < 60; minute += 30) {
                //Check if it's AM or PM 
                const ampm = hour >= 12 ? 'PM' : 'AM';
                //Converts the time to the 12 hours format
                const hour12 = hour > 12 ? hour - 12 : hour;
                //Format the time in a string for example (09:00 AM)
                const time = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
                //Add the time to the options array only if it's befor 4:00 PM
                if (hour < 16 || (hour === 16 && minute === 0)) {
                    options.push(time);
                }
            }
        }
        //Adding manually 04:30 PM to the end of the array
        options.push("04:30 PM");
        //Return the array options 
        return options;
    };
    //This function will handle if there's a change in the input of stylist
    const handleStylistChange = (e) => {
        //Get the name and value activated on the select input of stylist
        const { name, value } = e.target;
        //Updates the form state
        setFormData(prevState => ({
            //Keeps previous values of the form
            ...prevState,
            //Updates the input corresponding to the stylist
            [name]: value,
            //Reset input time to empty
            time: ''
        }));
        //Cleaning error message when user select another stylist
        setErrorMessage('');
        //Check if user selected a date, stylist and service
        if (value && formData.date && formData.serviceId) {
            //Check the selected service
            const selectedService = servicesData.services.find(service => service._id === formData.serviceId);
            //Call the updateAvailableTimes with the ID of the stylist, date and service duration
            updateAvailableTimes(value, formData.date, selectedService.duration);
        }
    };
    //This function will handle if there's a change in the input of date
    const handleDateChange = (e) => {
         //Get the name and value activated on the select input of date
        const { name, value } = e.target;
         //Updates the form state
        setFormData(prevState => ({
            //Keeps previous values of the form
            ...prevState,
         //Updates the input corresponding to the stylist
            [name]: value,
            //Reset input time to empty
            time: ''
        }));
         //Cleaning error message when user select another date
        setErrorMessage('');
        //Check if user selected a stylist, (new date selected) and service
        if (formData.stylistId && value && formData.serviceId) {
            //Look for the service selected
            const selectedService = servicesData.services.find(service => service._id === formData.serviceId);
            //Calls the updateAvailableTimes with the id of stylist, new date selected and service duration 
            updateAvailableTimes(formData.stylistId, value, selectedService.duration);
        }
    };

    const handleServiceChange = (e) => {
    //Get the name and value activated on the select input of service
        const { name, value } = e.target;
        //Updates the form state
        setFormData(prevState => ({
         //Keeps previous values of the form
            ...prevState,
        //Updates the input corresponding to the service
            [name]: value,
          //Reset input time to empty
            time: ''
        }));
         //Cleaning error message when user select another service
         setErrorMessage('');
         //Check if user selected a stylist, date and new service selected
        if (formData.stylistId && formData.date && value) {
            //Look for the service selected
            const selectedService = servicesData.services.find(service => service._id === value);
            //Calls the updateAvailableTimes function with the ID of stylist, date and the new service (duration) selected
            updateAvailableTimes(formData.stylistId, formData.date, selectedService.duration);
        }
    };

    //Handling change function for the other inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    //Handling submit of appointment
    const handleSubmit = async (e) => {
        //Prevents the page of reloading when submitting the form
        e.preventDefault();
        //Clean error message before submission
        setErrorMessage('');
        //Clean success message before submission
        setSuccessMessage('');
        try {
            //Get the addApointment query (inside utils/mutation.js) and assign it's value to new const data
            const { data } = await addAppointment({
                variables: {
                    //Gets the formData as variables for the mutation
                    ...formData,
                    //Gets the stylistId from the form
                    stylistId: formData.stylistId,
                    //Gets the stylistId from the form
                    serviceId: formData.serviceId
                }
            });
            //Statement to check if appointment was added
            if (data.addAppointment) {
                //If it's true, set a success message at the beginning of the form
                setSuccessMessage('Appointment booked successfully!');
                // Clean the inputs information from last submission
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
            //Gives 3 second after submission completed and then reloads the page
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err) {
            //DELETE THIS BEFORE PRODUCTION
            console.error('Error booking appointment:', err);
            //If an error exists, show the error message to the user at the beginning of the form
            setErrorMessage('Error booking appointment. Please try again.');
            setSuccessMessage('');
        }
    };
    //This function gets the duration in minutes and format it in a string so humans can read it easily 
    //It's used on the select input of service
    const formatDuration = (durationInMinutes) => {
        //Divides the minutes by 60 and round down to get full hours
        const hours = Math.floor(durationInMinutes / 60);
        //Calculate the remaining minutes using the modulus operator
        const minutes = durationInMinutes % 60;
        // If hours exists format them EXAMPLES:
        // gets 60 minutes and the user reads 1 hour
        // gets 120 minutes and the user reads 2 hours
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''}`;
        } else {
            //If there is not hours gets the value as minutes and the user reads:
            // 30 min
            return `${minutes} min`;
        }
    };

    useEffect(() => {
        //Creates a new object Date
        const today = new Date();
        //Converts the date to ISO format: 2023-09-18T12:00:00.000Z
        //Divides the string in the T and take the first part so we only taking: 2023-09-18
        const formattedDate = today.toISOString().split('T')[0];
        //Stablish the min date selectionable as the actual date
        setMinDate(formattedDate);
        //Updates the state of the form, keeps previous values
        setFormData(prevState => ({
            ...prevState,
            //Stablish date input of form with the actual formatted date
            date: formattedDate
        }));
    }, []);

    //This will only execute if the input of service gets prompted
    useEffect(() => {
        //Check if a service got selected and if the service data is available
    if (formData.serviceId && servicesData) {
        //Search the selected service in the service data
        const selectedService = servicesData.services.find(service => service._id === formData.serviceId);
        //If the selected service is found then
        if (selectedService) {
            //If the duration of service is 1 digit it's in hours then convert it to minutes multiplying by 60
            //If it's more than 1 digit then it's in minutes 
            const durationInMinutes = selectedService.duration.toString().length === 1 
                ? selectedService.duration * 60 
                : selectedService.duration;
            //Update the state service with the new service selected and it's duration in minutes
            setServices({...selectedService, duration: durationInMinutes});
        }
    }
}, [formData.serviceId, servicesData]);
    //This will execute if the stylist or service or date inputs on the form are changed
    useEffect(() => {
        //If a stylist and date have been selected, and the services are available, 
        //call the updateAvailableTimes function to update the available times.
        if (formData.stylistId && formData.date && services) {
            updateAvailableTimes(formData.stylistId, formData.date);
        }
    }, [formData.stylistId, formData.date, services]);
    // If services and stylist are loading show just a Loading text in the page
    if (loadingServices || loadingStylists) return <p>Loading...</p>;
    //If there is an error loading the stylist show the error
    if (stylistsError) return <p>Error loading stylists!</p>;
    //If there is no stylist or it's empty show that there is no stylist available
    if (!stylistsData || !stylistsData.stylists) return <p>No stylists available</p>;

    return (
        <section className="max-w-7xl mx-auto border-b-2">
            <div className="flex flex-col items-center my-20">
                <h1 className="text-4xl font-bold mb-6">Book an Appointment</h1>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stylistId">
                            Stylist
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="stylistId"
                            name="stylistId"
                            value={formData.stylistId}
                            onChange={handleStylistChange}
                            required
                        >
                              <option value="">Select a stylist</option>
        {stylistsData && stylistsData.stylists && stylistsData.stylists.map(stylist => (
            <option key={stylist._id} value={stylist._id}>
        {stylist.user.name} {stylist.user.lastName}
            </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceId">
                            Service
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            name="date"
                            min={minDate}
                            value={formData.date}
                            onChange={handleDateChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
        Time
    </label>
    <select
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            (!formData.stylistId || !formData.serviceId || availableTimes.length === 0) ? 'bg-gray-200 cursor-not-allowed' : ''
        }`}
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
