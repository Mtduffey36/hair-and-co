const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  stylistId: {
    type: Schema.Types.ObjectId,
    ref: 'Stylist',
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',

  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  notes: {
    type: String,
  },
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;