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
            return res.status(409).json({message:"user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        const token = jwt.sign({ userId: user._id }, SecretKey);
        res.status(201).json({token});
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
            return res.status(401).json({message:"user doesn't exist"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(401).send({message:"invalid password"});
        }
        
        const username = existingUser.username;
        const token = jwt.sign({ userId: existingUser._id }, SecretKey);
        
        res.status(201).json({token, username});
    }

    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const profile = async (req,res) => {
    
    const {token} = await req.cookies;

    jwt.verify(token, SecretKey, {}, (err,info) => {
      if(err) 
        throw err;
      res.status(200).json(info);
      res.end();
    });
};

const logout = (req,res) => {
    //simply change token to empty string to invalidate
    res.cookie('token', '').json('ok');
};

module.exports = {signup, login, profile, logout};
