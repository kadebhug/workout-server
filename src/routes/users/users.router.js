const express = require('express');

const { authJwt } = require('../../middleware/index');
const { getAllUsers, getSingleUser } = require('./users.controller');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const userRouter = express.Router();

userRouter.get('/all-as-admin', [authJwt.verifyToken([ADMIN_ROLE.code])], getAllUsers);
userRouter.get('/all-as-trainer', [authJwt.verifyToken([TRAINER_ROLE.code])], getAllUsers);
userRouter.get('/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getSingleUser);

module.exports = userRouter;