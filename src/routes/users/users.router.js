const express = require('express');

const { authJwt } = require('../../middleware/index');
const { getAllUsersIncludingAdmin } = require('./users.controller');

const userRouter = express.Router();

userRouter.get('/all', [authJwt.verifyToken, authJwt.isAdmin], getAllUsersIncludingAdmin);

module.exports = userRouter;