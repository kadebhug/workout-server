const express = require('express');

const { authJwt } = require('../../middleware/index');
const { createWorkout, viewWorkout, deleteWorkout, updateWorkout, getAllWorkouts } = require('./workouts.controller');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const workoutRouter = express.Router();

workoutRouter.post('/create', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], createWorkout);
workoutRouter.get('/all', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getAllWorkouts);
workoutRouter.get('/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], viewWorkout);
workoutRouter.put('/edit/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], updateWorkout);
workoutRouter.delete('/delete/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], deleteWorkout);

module.exports = workoutRouter;