const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Admin Server configuration
const ADMIN_SERVER = {
  PORT: process.env.ADMIN_PORT || 5001,
  ALLOWED_ORIGINS: process.env.ADMIN_ALLOWED_ORIGINS ? process.env.ADMIN_ALLOWED_ORIGINS.split(',') : ['http://localhost:3001']
};

// Admin Database configuration
const ADMIN_DATABASE = {
  MONGODB_URI: process.env.ADMIN_MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm-admin'
};

module.exports = {
  ADMIN_SERVER,
  ADMIN_DATABASE
};
