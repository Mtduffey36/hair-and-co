const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stylistId: {
    type: Schema.Types.ObjectId,
    ref: 'Stylist',
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  date: {
    type: Date,
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