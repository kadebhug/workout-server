const express = require('express');

const { authJwt } = require('../../middleware/index');
const { getConstantData } = require('./exercises.controller');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const exerciseRouter = express.Router();

exerciseRouter.get('/form-data', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getConstantData);

module.exports = exerciseRouter;