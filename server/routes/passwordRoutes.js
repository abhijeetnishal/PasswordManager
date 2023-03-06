const express = require('express');

const { getAllPasswords, getPassword, createPassword, deletePassword, updatePassword } = require('../controller/passwordController');

const { protect } = require('../middleware/authMiddleware');


const passwordRouter = express.Router();

passwordRouter.get('/', protect, getAllPasswords);

passwordRouter.get('/:id', protect, getPassword);

passwordRouter.post('/', protect, createPassword);

passwordRouter.put('/:id', protect, updatePassword);

passwordRouter.delete('/:id', protect, deletePassword);

module.exports = passwordRouter;