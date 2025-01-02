
// Option 1: Using a connection string (Recommended for production)

//const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/your_database_name'; 


// Use environment variable for production

const m = require('mongoose');
const connectDB = async (url) => {
  try {
    await m.connect(url);
    console.log('MongoDB Connected...');
  } 
  catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB


