const { User, Service, Stylist, Appointment, Review } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
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
      return Stylist.find().populate('userId');
    },
    stylist: async (parent, { stylistId }) => {
      return Stylist.findById(stylistId).populate('userId');
    },
    appointments: async () => {
      return Appointment.find().populate('customerId stylistId serviceId');
    },
    appointment: async (parent, { appointmentId }) => {
      return Appointment.findById(appointmentId).populate('customerId stylistId serviceId');
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
    addService: async (parent, { name, description, price, duration }) => {
      return Service.create({ name, description, price, duration });
    },
    updateService: async (parent, { serviceId, name, description, price, duration }) => {
      return Service.findByIdAndUpdate(
        serviceId,
        { name, description, price, duration },
        { new: true }
      );
    },
    deleteService: async (parent, { serviceId }) => {
      return Service.findByIdAndDelete(serviceId);
    },
    addStylist: async (parent, { userId, specialties, experience }) => {
      return Stylist.create({ userId, specialties, experience });
    },
    addAppointment: async (parent, { customerId, stylistId, serviceId, date, time, notes }) => {
      return Appointment.create({ customerId, stylistId, serviceId, date, time, notes });
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
    user: async (parent) => await User.findById(parent.userId),
  },
  Appointment: {
    _id: (parent) => parent._id.toString(),
    customer: async (parent) => await User.findById(parent.customerId),
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