const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
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
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  calification: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = model('Review', reviewSchema);

module.exports = Review;