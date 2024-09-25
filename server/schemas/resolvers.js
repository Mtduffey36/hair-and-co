const { User, Service, Stylist, Appointment, Review } = require('../models');
const {signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const resolvers = {
  
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findById(userId);
    },
    services: async (parent, args, context) => {
      return Service.find();
    },
    service: async (parent, { serviceId }) => {
      return Service.findById(serviceId);
    },
    stylists: async () => {
      return Stylist.find();
    },
    stylist: async (parent, { stylistId }) => {
      return Stylist.findById(stylistId);
    },
    stylistAppointments: async (_, { stylistId, date }) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error('Invalid date format. Use YYYY-MM-DD');
      }
      return Appointment.find({
        stylistId,
        date: date 
      }).populate({
        path: 'serviceId',
        select: '_id name duration'
      }).then(appointments => {
        return appointments.map(appointment => ({
          ...appointment._doc,
          service: appointment.serviceId
        }));
      });
    },
    stylistAppointmentsByEmail: async (_, { email }, context) => {
      const stylist = await Stylist.findOne({ email });
      if (!stylist) {
        throw new Error('Stylist not found');
      }
      
      const appointments = await Appointment.find({ stylistId: stylist._id })
        .populate('stylistId', '_id name email')
        .populate('serviceId', '_id name duration');
      return appointments.map(appointment => ({
        _id: appointment._id,
        firstName: appointment.firstName,
        lastName: appointment.lastName,
        email: appointment.email,
        phoneNumber: appointment.phoneNumber,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        notes: appointment.notes,
        stylistId: appointment.stylistId,
        serviceId: appointment.serviceId
      }));
    },
    appointments: async () => {
      return Appointment.find().populate('stylistId serviceId');
    },
    appointment: async (parent, { appointmentId }) => {
      return Appointment.findById(appointmentId).populate('stylistId serviceId');
    },
    reviews: async () => {
      return Review.find().populate('customerId stylistId appointmentId');
    },
    review: async (parent, { reviewId }) => {
      return Review.findById(reviewId).populate('customerId stylistId appointmentId');
    },
    userAppointments: async (_, { email }) => {
      try {
        const currentDate = new Date().toISOString().split('T')[0]; 
        
        const appointments = await Appointment.find({
          email: email,
          $or: [
            { date: { $gt: currentDate } },
            {
              date: currentDate,
              time: { $gte: new Date().toTimeString().slice(0, 5) } 
            }
          ]
        }).sort({ date: 1, time: 1 })
          .populate('stylistId')
          .populate('serviceId');
          return appointments;
      } catch (error) {
        throw new Error('Error fetching user appointments: ' + error.message);
      }
    },
  },

  Mutation: {
    addUser: async (parent, { name, lastName, email, password, phoneNumber, role }) => {
      const user = await User.create({ name, lastName, email, password, phoneNumber, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      let user = await User.findOne({ email });
      let isStylist = false;
    
      if (!user) {
        user = await Stylist.findOne({ email });
        if (user) {
          isStylist = true;
        }
      }
    
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const isDefaultPassword = isStylist ? user.isDefaultPassword : false;
    
      const tokenPayload = {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: isStylist ? 1 : user.role,
        isStylist,
        isDefaultPassword
      };
    
      const token = signToken(tokenPayload);
    
    
      return { 
        token, 
        user: {
          ...tokenPayload
        }
      };
    },
    addService: async (parent, { name, description, price, duration }, context) => {
      if(!context.user || context.user.role !==2){
        throw new AuthenticationError('Not authorized to add services');
      }
      return Service.create({ name, description, price, duration });
    },
    updateService: async (parent, { serviceId, name, description, price, duration }, context) => {
      if(!context.user || context.user.role!==2){
        throw new AuthenticationError('Not authorized to update services');
      }
      return Service.findByIdAndUpdate(
        serviceId,
        { name, description, price, duration },
        { new: true }
      );
    },
    deleteService: async (parent, { serviceId }, context) => {
      if(!context.user || context.user.role!==2){
        throw new AuthenticationError('Not authorized to delete services');
      }
      return Service.findByIdAndDelete(serviceId);
    },
    addStylist: async (parent, { name, lastName, email, phoneNumber, specialties, experience }) => {
      const defaultPassword = 'defaultPassword123';
      
      const newStylist = await Stylist.create({ 
        name, 
        lastName, 
        email, 
        phoneNumber, 
        password: defaultPassword,
        specialties, 
        experience 
      });
    
      return newStylist;
    },
    updateStylist: async (parent, { stylistId, name, lastName, email, phoneNumber, specialties, experience, password }) => {
      const updateData = { name, lastName, email, phoneNumber, specialties, experience };
      
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      return Stylist.findByIdAndUpdate(stylistId, updateData, { new: true });
    },
    deleteStylist: async (parent, { stylistId }) => {
      return Stylist.findByIdAndDelete(stylistId);
    },
    addAppointment: async (parent, { firstName, lastName, email, phoneNumber, stylistId, serviceId, date, time, notes }) => {
      const newAppointment = await Appointment.create({ 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        stylistId, 
        serviceId, 
        date, 
        time, 
        notes 
      });
      return newAppointment;
    },
    updateAppointmentStatus: async (parent, { appointmentId, status }) => {
      return Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    },
    addReview: async (parent, { customerId, stylistId, appointmentId, calification, comment }) => {
      return Review.create({ customerId, stylistId, appointmentId, calification, comment });
    },
    updateStylistPassword: async (parent, { email, password }, context) => {
      if (!context.user || context.user.role !== 1) {
        throw new AuthenticationError('Not authorized to make this action');
      }
    
      try {
        const stylist = await Stylist.findOne({ email });
    
        if (!stylist) {
          throw new Error('Stylist not found');
        }
        
        stylist.password = password;
        stylist.isDefaultPassword = false;
    
        await stylist.save();    
        const token = signToken({
          _id: stylist._id,
          name: stylist.name,
          lastName: stylist.lastName,
          email: stylist.email,
          role: stylist.role,
          isStylist: true,
          isDefaultPassword: stylist.isDefaultPassword
        });
    
        return {
          token,
          stylist: {
            _id: stylist._id,
            email: stylist.email,
            isDefaultPassword: stylist.isDefaultPassword
          }
        };
      } catch (error) {
        console.error('Error updating password:', error);
        throw new Error('Error updating password');
      }
    },
    cancelAppointment: async (parent, { id }, context) => {
          if (!context.user) {
            throw new AuthenticationError('You must be logged in to cancel an appointment');
          }

      try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
          throw new Error('Appointment not found');
        }

        return { _id: deletedAppointment._id };
      } catch (error) {
        throw new Error('Error cancelling appointment: ' + error.message);
      }
    },
  },

  User: {
    _id: (parent) => parent._id.toString(),
  },
  Service: {
    _id: (parent) => parent._id.toString(),
  },
  Stylist: {
    _id: (parent) => parent._id.toString(),
  },
  Appointment: {
    _id: (parent) => parent._id.toString(),
    stylist: async (parent) => await Stylist.findById(parent.stylistId),
    service: async (parent) => await Service.findById(parent.serviceId),
  },
  Review: {
    _id: (parent) => parent._id.toString(),
    customer: async (parent) => await User.findById(parent.customerId),
    stylist: async (parent) => await Stylist.findById(parent.stylistId),
    appointment: async (parent) => await Appointment.findById(parent.appointmentId),
  },
};

module.exports = resolvers;