const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const stylistSchema = new Schema({
  name: {
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
    // unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    default: 'defaultPassword123' // This will be hashed before saving
  },
  role: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  specialties: [{
    type: String,
    trim: true,
  }],
  bio: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  }
});

// Hash password before saving, but only if it's been modified
stylistSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Stylist = model('Stylist', stylistSchema);

module.exports = Stylist;