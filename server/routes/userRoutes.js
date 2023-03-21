const express = require('express');

const { signup, login, logout } = require('../controller/userController');

const userRouter = express.Router();

userRouter.post('/register', signup)

userRouter.post('/login', login)

userRouter.post('/logout', logout);

module.exports = userRouter;
