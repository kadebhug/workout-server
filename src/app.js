const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

// Swagger
const swaggerDocument = require('./swagger_output.json');

// Routes
const authRouter = require('./routes/auth/auth.router');
const userRouter = require('./routes/users/users.router');
const workoutRouter = require('./routes/workouts/workouts.router');
const exerciseRouter = require('./routes/exercises/exercises.router');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200'
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());// parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/workout', workoutRouter);
app.use('/exercise', exerciseRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;