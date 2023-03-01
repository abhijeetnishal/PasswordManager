//you'll need to make a function to enable you to protect a particular endpoint from unauthenticated users.
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.SecretKey

//Create and export an asynchronous function in which the authorisation code will live:
const auth = async (req, res, next)=>{
    //use a try...catch... block to check if a user is logged in
    //In the try{} block, get the authentication token from the authorization header:
    try {
        let token = req.headers.authorization;

        if(token){
            token = token.split(" ")[1];

            let user = jwt.verify(token, secretKey);
            req.userId = user.id;
        }
        else{
            return res.status(401).json({message: "unauthorized user"});
        }

        next();
    }
    catch (error) {
        res.status(401).json({message: "unauthorized user"});
          console.log(error);
    }
}

module.exports = auth;