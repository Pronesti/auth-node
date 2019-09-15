const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => console.log("database connected"));

//MiddleWares
app.use(express.json());

//Routes Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server is running"));