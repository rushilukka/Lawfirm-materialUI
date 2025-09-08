const express = require('express');
const app = express();
const import_router = require('./routing/routing');
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
app.use('/', import_router);
app.listen(SERVER.PORT, () => console.log(`Server started on port ${SERVER.PORT}`));

