const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Service = model('Service', serviceSchema);

module.exports = Service;