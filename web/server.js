const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/payment', require('./routes/payment'));
app.use('/auth', require('./routes/auth'));

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

