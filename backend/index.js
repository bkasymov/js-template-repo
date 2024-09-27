require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./auth');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/welcome');
    }
);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

app.get('/', (req, res) => {
    res.redirect('/auth/google');
});

app.get('/welcome', ensureAuthenticated, (req, res) => {
    res.send('Hello World');
});

function connectWithRetry() {
    return sequelize.sync()
        .then(() => {
            console.log('Connected to database');
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        })
        .catch(err => {
            console.log('Failed to connect to database. Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

