require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const register = require('./routes/register')
const login = require('./routes/login')
const refresh = require('./routes/refresh')
const logout = require('./routes/logout')
const product = require('./routes/product')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnect')
const PORT = process.env.PORT || 3000

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/register', register);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/logout', logout);

// app.use(verifyJWT);
app.use('/api/product', product);

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => console.log(`We are in ${PORT}`));
})