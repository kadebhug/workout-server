const express = require('express');

const { authJwt } = require('../../middleware/index');
const { createWorkout, viewWorkout, deleteWorkout } = require('./workouts.controller');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const workoutRouter = express.Router();

workoutRouter.post('/create', [authJwt.verifyToken([TRAINER_ROLE.code])], createWorkout);
workoutRouter.get('/view/:id', viewWorkout);
workoutRouter.get('/delete/:id', deleteWorkout);

module.exports = workoutRouter;