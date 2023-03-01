const express = require('express');

const auth = require('../middleware/auth')

const { getAllPasswords, getPassword, createPassword, deletePassword, updatePassword } = require('../controller/passwordController');

const passwordRouter = express.Router();

passwordRouter.get('/',auth,getAllPasswords);

passwordRouter.get('/:id',auth, getPassword);

passwordRouter.post('/',auth, createPassword);

passwordRouter.put('/:id',auth, updatePassword);

passwordRouter.delete('/:id',auth, deletePassword);


module.exports = passwordRouter;