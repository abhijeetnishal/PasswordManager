const express = require('express');

const { getPassword, createPassword, deletePassword, updatePassword } = require('../controller/passwordController');


const passwordRouter = express.Router();

passwordRouter.get('/:id', getPassword);

passwordRouter.post('/', createPassword);

passwordRouter.put('/:id', updatePassword);

passwordRouter.delete('/:id', deletePassword);

module.exports = passwordRouter;