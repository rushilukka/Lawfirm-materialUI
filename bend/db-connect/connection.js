
const mongoose = require('mongoose');
const { DATABASE } = require('../constants/constants');

const connectDB = async (url = DATABASE.MONGODB_URI) => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB Connected...');
  } 
  catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

module.exports = connectDB;


