const express = require('express');

const { signup, login, updateUserProfile } = require('../controller/userController');

const { protect } = require('../middleware/authMiddleware');

const userRouter = express.Router();

userRouter.post('/signup', signup)

userRouter.post('/login', login)

userRouter.post('/profile', protect, updateUserProfile);

module.exports = userRouter;
