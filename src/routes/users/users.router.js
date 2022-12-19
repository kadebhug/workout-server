const express = require('express');

const { authJwt } = require('../../middleware/index');
const { getAllUsersIncludingAdmin } = require('./users.controller');
const { ADMIN_ROLE, TRAINER_ROLE } = require('../../constants/roles');

const userRouter = express.Router();

userRouter.get('/all-as-admin', [authJwt.verifyToken([ADMIN_ROLE.code])], getAllUsersIncludingAdmin);
userRouter.get('/all-as-trainer', [authJwt.verifyToken([TRAINER_ROLE.code])], getAllUsersIncludingAdmin);
userRouter.get('/user/:id', [authJwt.verifyToken([TRAINER_ROLE.code, ADMIN_ROLE.code])], getAllUsersIncludingAdmin);

module.exports = userRouter;