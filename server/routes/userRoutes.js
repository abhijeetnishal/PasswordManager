const express = require('express');

const { signup, login, profile, logout } = require('../controller/userController');

const userRouter = express.Router();

userRouter.post('/register', signup)

userRouter.post('/login', login)

userRouter.post('/profile', profile);

userRouter.post('/logout', logout);

module.exports = userRouter;
