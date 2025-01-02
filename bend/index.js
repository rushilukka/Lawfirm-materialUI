const express = require('express');
const app = express();
const import_router = require('./routing/routing');
const cors = require('cors');
const connectDB = require('./db-connect/connection');

connectDB('mongodb+srv://rushilukka315:123@cluster0.v9tpnnj.mongodb.net/LawFirm-new?retryWrites=true&w=majority&appName=Cluster0')
  
.then(console.log('Connected')).catch((err) => console.error(err));;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-production-domain.com']
  }));
app.use('/', import_router);
app.listen(5000, () => console.log("server started"));

