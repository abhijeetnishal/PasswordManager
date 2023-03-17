//Import JWT just below the const bcrypt = require("bcrypt"):
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../database/userModel');

const signup = async(req,res)=>{
    //1. existing user check
    //2. Hashed password
    //3. user creation
    //4. token generation

    //create a new user instance and collect the data
    const {username, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        
        if(userExists){
            return res.status(404).json({message:"user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
    }

    catch(error){
        console.log(error);
        res.status(500);
        res.json({message:"Internal server error"});
    }
}


const login = async (req,res)=>{
    const {email, password} = req.body;

    try{
        const userExist = await User.findOne({email});
        const username = userExist.username;

        if(!userExist){
            res.status(401);
            return res.json({message:"user doesn't exist"});
        }

        const matchPassword = await bcrypt.compare(password, userExist.password);

        if(!matchPassword){
            res.status(401);
            return res.send({message:"invalid password"});
        }
        
        else{
            jwt.sign({email, id:userExist._id}, process.env.SecretKey, {}, (err,token) => {
                if(err) 
                    throw err;
                res.cookie('token', token).json({
                  id:userExist._id,
                  username,
                  email,
                  token
                });
              });
        }
    }

    catch(error){
        console.log(error);
        res.status(500);
        res.json({message:"Internal server error"});
    }
}

const profile = (req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, process.env.SecretKey, {}, (err,info) => {
        if(err) 
            throw err;
        res.json(info);
    });
}

const logout = (req, res)=>{
    res.cookie('token', '').json('logout');
}

module.exports = {signup, login, profile, logout};