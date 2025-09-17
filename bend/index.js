/* 
  Flow of the application :- 
  index -> Routes -> Controllers -> Services -> DB Schema (if needed)
*/

const express = require('express');
const app = express();
const bookingRoutes = require('./routing/bookingRoutes');
const adminRoutes = require('./routing/adminRoutes');
const authRoutes = require('./routing/authRoutes');
const cors = require('cors');
const connectDB = require('./db-connect/connection');
const { SERVER, DATABASE } = require('./constants/constants');

connectDB(DATABASE.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: SERVER.ALLOWED_ORIGINS
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(SERVER.PORT, () => console.log(`Server started on port ${SERVER.PORT}`));

