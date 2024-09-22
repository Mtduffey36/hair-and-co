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
    console.log('Hashing password for stylist:', this.email);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Hashed password:', this.password);
  }
  next();
});

stylistSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Stylist = model('Stylist', stylistSchema);

module.exports = Stylist;