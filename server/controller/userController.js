//Import JWT just below the const bcrypt = require("bcrypt"):
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config()
const SecretKey = process.env.SecretKey

const userModel = require('../database/userModel');

const signup = async(req,res)=>{
    //1. existing user check
    //2. Hashed password
    //3. user creation
    //4. token generation

    //create a new user instance and collect the data
    const username = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const existingUser = await userModel.findOne({email: email})
        
        if(existingUser){
            res.status(400);
            return res.json({message:"user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        res.status(201).json({message: username});
    }

    catch(error){
        console.log(error);
        res.status(500);
        res.json({message:"Internal server error"});
    }
}



const login = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const existingUser = await userModel.findOne({email: email})

        if(!existingUser){
            res.status(404);
            return res.send({message:"user doesn't exist"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            res.status(400);
            return res.send({message:"invalid password"});
        }

        const token = jwt.sign(
        {
            email: existingUser.email,
            id: existingUser._id
        }, SecretKey);
        
        res.cookie('token', token).json({message: existingUser.username, token:token});
    }

    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports = {signup, login};