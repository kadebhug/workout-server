const express = require('express');

const { authJwt } = require('../../middleware/index');
const { getConstantData, getAllExercises, createExercise, viewExercise, updateExercise, deleteExercise } = require('./exercises.controller');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const exerciseRouter = express.Router();

exerciseRouter.get('/form-data', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getConstantData);
exerciseRouter.post('/create', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], createExercise);
exerciseRouter.get('/all', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getAllExercises);
exerciseRouter.get('/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], viewExercise);
exerciseRouter.put('/edit/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], updateExercise);
exerciseRouter.delete('/delete/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], deleteExercise);

module.exports = exerciseRouter;