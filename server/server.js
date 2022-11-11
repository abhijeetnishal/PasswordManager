//import express and cors(Cross-Origin Resource Sharing)
//Here, require() is a built-in function to include external modules in your Node.js application
const express = require('express')
//create express application
const app = express()
//The express() function is a top-level function used to create an Express application.

const cors = require('cors')
app.use(cors())
//We are using app.use() to add the cors middleware to the Express application.
app.use(express.json())
//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.

// require database connection 
const dbConnect = require("./database/dbConnect");

// execute database connection 
dbConnect();

//Require the userModel just below the line where you required the database:
const User = require("./database/userModel");

//You need to handle CORS errors. This will allow the user in the frontend to 
//consume the APIs that you have created without any problem.
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
  

//start server
app.listen(4000,()=>{
    console.log('server running at port 4000')
})



//require signupUser
const signupUsers = require('./authentication/signup')
//signup endpoint
app.post('/signup',signupUsers);


//require loginUser
const loginUsers = require('./authentication/login')
//login endpoint
app.post('/login',loginUsers);


//You need two endpoints to be able to see how it works. 
// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
  
//authentication endpoint
const protectEndpoints = require('./authentication/auth');

app.get("/auth-endpoint",protectEndpoints ,(request, response) => {
    response.json({ message: "You are authorized to access me" });
});
//That is all you need to protect that route.
