//Import JWT just below the const bcrypt = require("bcrypt"):
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Require the userModel just below the line where you required the database:
const User = require('../database/userModel');

async function loginUsers(request, response){
    //Check if the email that the user enters on login exists: 
    User.findOne({ email: request.body.email })

    //If successful, compare the password entered with the hashed password 
    //in the database. Do this in the then block:
    .then((User)=>{
        bcrypt.compare(request.body.password,User.password)
        
        //Use a then...catch... block again to check if the comparison is successful
        //or not. Check whether the password is correct in the then block:
        .then((passwordCheck) => {

            // check if password matches or not
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error
              });
            }
            //If the password matches, then create a random token with the jwt.sign() function.
            //It takes 3 parameters: jwt.sign(payload, secretOrPrivateKey, [options, callback]).
            else{
                //create JWT token
                const token = jwt.sign(
                    {
                        userId: User._id,
                        userEmail: User.email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "48h" }
                );
        
                //return success response
                response.status(200).send({
                    message: "Login Successful",
                    email: User.email,
                    token,
                });
            }
          })  
        
        //If the comparison is unsuccessful, return an error message in the catch block:
        .catch((error)=>{
            response.status(400).send({
                message: "password does not match",
                error
            })
        })
    })

    //Use a then catch block to check if the email search above was successful or not. 
    //If it is unsuccessful, capture that in the catch block:
    .catch((error)=>{
        response.status(404).send({
            message: "Email not found",
            error,
        })
    })
}

module.exports = loginUsers;