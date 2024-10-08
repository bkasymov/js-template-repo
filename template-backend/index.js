require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./auth');
const { sequelize } = require('./models');
const cors = require('cors');
const logger = require('./logger');
const errorHandler = require('./middleware/errorHandler');
const notesRouter = require('./routes/notes');

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
    passport.authenticate('google', { failureRedirect: 'http://localhost:4000' }),
    (req, res) => {
        res.redirect('http://localhost:4000');
    }
);

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}));

app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false });
    }
});

app.post('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

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

app.use('/notes', notesRouter);
app.use(errorHandler);

connectWithRetry();

