const express = require('express');

const { registerSchema, loginSchema } = require('../../validations/index');
const validateDto = require('../../middleware/validate-dto');
const { register, login, signout } = require('./auth.controller');
const { verifySignup, authJwt } = require("../../middleware/index");

const authRouter = express.Router();

authRouter.post('/register', [validateDto(registerSchema), verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted], register);
authRouter.post('/login', validateDto(loginSchema), login);
authRouter.post('/signout', signout);

module.exports = authRouter;