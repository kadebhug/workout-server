const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Routes
const authRouter = require('./routes/auth/auth.router');
const userRouter = require('./routes/users/users.router');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());// parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;