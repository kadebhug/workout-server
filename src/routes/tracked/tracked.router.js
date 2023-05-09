const express = require('express');

const { authJwt } = require('../../middleware/index');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const trackedRouter = express.Router();

trackedRouter.post('/create', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], createWorkout);
// trackedRouter.get('/all', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getAllWorkouts);
// trackedRouter.get('/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], viewWorkout);
// trackedRouter.put('/edit/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], updateWorkout);
// trackedRouter.delete('/delete/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], deleteWorkout);

module.exports = trackedRouter;