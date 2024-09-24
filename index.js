require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./auth'); // Import the auth.js file

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Add route to initiate Google authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Auth callback route
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:4000/welcome'); // Redirect to frontend service
    }
);

// Authentication middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

// Route to display "Hello World" after authentication
app.get('/welcome', ensureAuthenticated, (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

