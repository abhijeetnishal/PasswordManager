//you'll need to make a function to enable you to protect a particular endpoint from unauthenticated users.
const jwt = require('jsonwebtoken');

const secretKey = process.env.SecretKey

//Create and export an asynchronous function in which the authorisation code will live:
const generateToken = (id) => {
    return jwt.sign({ id }, secretKey, {
      expiresIn: "30d",
    });
  };

module.exports = generateToken;