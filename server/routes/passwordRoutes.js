const express = require('express');

const { getAllPasswords, getPassword, createPassword, deletePassword, updatePassword } = require('../controller/passwordController');


const passwordRouter = express.Router();

passwordRouter.get('/all/:id', getAllPasswords);

passwordRouter.get('/specific/:id', getPassword);

passwordRouter.post('/', createPassword);

passwordRouter.put('/:id', updatePassword);

passwordRouter.delete('/:id', deletePassword);

module.exports = passwordRouter;