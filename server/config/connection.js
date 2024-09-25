const mongoose = require('mongoose');
require ('dotenv').config();
// import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hairandco');
// console.log("PROCESS HERE", process.env.MONGODB_URI);

module.exports = mongoose.connection;