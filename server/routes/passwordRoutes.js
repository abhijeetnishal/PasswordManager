const express = require('express');

const { getAllPasswords, decryptPassword, createPassword, deletePassword, updatePassword } = require('../controller/passwordController');


const passwordRouter = express.Router();

passwordRouter.get('/all/:id', getAllPasswords);

passwordRouter.get('/specific/:id', decryptPassword);

passwordRouter.post('/', createPassword);

passwordRouter.put('/:id', updatePassword);

passwordRouter.delete('/:id', deletePassword);

module.exports = passwordRouter;