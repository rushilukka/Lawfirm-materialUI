const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Server configuration
const SERVER = {
  PORT: process.env.PORT || 5000,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000']
};

// Database configuration
const DATABASE = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm'
};

module.exports = {
  SERVER,
  DATABASE
};
