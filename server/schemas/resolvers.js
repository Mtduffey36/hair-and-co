const { User, Service, Stylist, Appointment, Review } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const resolvers = {
  
  Query: {
    users: async (parent, args, context) => {
      if (!context.user || context.user.role !== 2) {
        throw new AuthenticationError('Not authorized to view all users');
      }
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findById(userId);
    },
    services: async () => {
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
  },

  Mutation: {
    addUser: async (parent, { name, lastName, email, password, phoneNumber, role }) => {
      const user = await User.create({ name, lastName, email, password, phoneNumber, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
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
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      return Stylist.create({ 
        name, 
        lastName, 
        email, 
        phoneNumber, 
        password: hashedPassword,
        specialties, 
        experience 
      });
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