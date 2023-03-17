//import express and cors(Cross-Origin Resource Sharing)
const express = require('express');
const cookieParser = require('cookie-parser');

//create express application
const app = express()
//The express() function is a top-level function used to create an Express application.

app.use(express.json())
//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.

const dotenv = require('dotenv')
dotenv.config()

app.use(cookieParser());

const cors = require('cors')
//We are using app.use() to add the cors middleware to the Express application.
//You need to handle CORS errors. 
//This will allow the user in the frontend to consume the APIs that you have created without any problem.

// Curb Cores Error by adding a header here
app.use(cors({credentials:true, origin:'http://localhost:3000'}));


//require database connection 
const dbConnect = require("./database/dbConnect");

// execute database connection 
dbConnect();  

//start server
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log('server running at port '+PORT);
})


//user Router for signup or login
const userRouter = require('./routes/userRoutes')
app.use('/api/auth',userRouter)

//password manager Router for CRUD
const passwordRouter = require('./routes/passwordRoutes')
app.use('/passwords',passwordRouter)

//Error Handling
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);
