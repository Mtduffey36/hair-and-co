const { Schema, model } = require('mongoose');

const stylistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialties: [{
    type: String,
    trim: true,
  }],
  experience: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  },
});

const Stylist = model('Stylist', stylistSchema);

module.exports = Stylist;