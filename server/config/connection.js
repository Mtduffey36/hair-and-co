const mongoose = require('mongoose');
require ('dotenv').config();
// import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI);
console.log("PROCESS HERE", process.env.MONGODB_URI);

module.exports = mongoose.connection;