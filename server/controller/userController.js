//Import JWT just below the const bcrypt = require("bcrypt"):
const bcrypt = require('bcrypt');

const User = require('../database/userModel');
const generateToken = require('../utils/generateToken');


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

        if(user) {
            res.status(201).json({
              _id: user._id,
              name: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
              token: generateToken(user._id),
            });
          } 
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
        const existingUser = await User.findOne({email})

        if(!existingUser){
            res.status(401);
            return res.json({message:"user doesn't exist"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            res.status(401)
            return res.send({message:"invalid password"});
        }
        
        else{
            res.json({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
                token: generateToken(existingUser._id),
              });
        }
    }

    catch(error){
        console.log(error);
        res.status(500);
        res.json({message:"Internal server error"});
    }
}

const updateUserProfile = async(req, res)=>{
    const user = await User.findById(req.user._id);

    try{
        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if(req.body.password){
              user.password = req.body.password;
            }
        
            const updatedUser = await user.save();
        
            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              pic: updatedUser.pic,
              isAdmin: updatedUser.isAdmin,
              token: generateToken(updatedUser._id),
            });
          } else {
            res.status(404);
            throw new Error("User Not Found");
          }
    }
    catch{
        console.log(error);
        res.status(500);
        res.json({message:"Internal server error"});
    }
}

module.exports = {signup, login, updateUserProfile};