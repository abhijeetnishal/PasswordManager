//Require bcrypt at the top of the server.js file:
const bcrypt = require('bcrypt')

//Require the userModel just below the line where you required the database:
const User = require("../database/userModel");

async function signupUsers(request, response){
        //Hash the password before saving the email and password into the database with the following code:
        bcrypt.hash(request.body.password, 10)
        //The code above is telling bcrypt to hash the password received from request body 10 times or 10 salt rounds.
        
        .then((hashedPassword) => {
            //create a new user instance and collect the data
            const user = new User({
                username: request.body.username,
                email: request.body.email,
                password: hashedPassword,
            });

        //now save the new user data with feedback.
        user.save()
            //return success if the new user is added to the database successfully
            .then((result) => {
                response.status(201).send({
                message: "User Created Successfully",
                result,
                });
                console.log(result);
            })
            //catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                response.status(500).send({
                message: "Error creating user",
                error,
                });
                console.log(error);
            });
        })

        //In the then block, save the data you have now. Create a new instance of the 
        //userModel and collect the updated data:
        .catch((e)=>{
            response.status(500).send({
            message: "Password was not hashed successfully",
            e,
            });
            console.log(e);
        })
        //The code above is telling bcrypt to hash the password received from request body 10 times or 10 salt rounds.
        //If the hash is successful, continue in the then block and save the email and hashed password in the database, 
        //else return an error in the catch block.
        //In the catch block, return an error:
}

module.exports = signupUsers;