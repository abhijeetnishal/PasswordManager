const crypto = require('../dataEncryptAndDecryp/ecyptDecrypt')
const jwt = require('jsonwebtoken')

const passwordModel = require('../database/passwordModel')
const secretKey = process.env.SecretKey;

const getAllPasswords = async (req, res)=>{
    const id = req.params.id;
    //const {token} = req.cookies;
    //console.log(req.cookies);

    try{
        // jwt.verify(token, secretKey, {}, async(err, info)=>{
        //     if(err)
        //         return res.json("Not autenticated");
        //     //encrypt data
        //     else{
                const data = await passwordModel.find({userId:id}).select({ websiteName: 1, password: 1, _id: 0 });
                res.status(202).json(data);
            //}
        //})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

const getPassword = async (req,res)=>{
    try{
        const data = await passwordModel.findOne({_id: req.params.id});

        if(data==null)
            res.status(404).json('not found');

        else{
            const websiteName = data.websiteName;
            const password = data.password;
            const iv = data.iv;
    
            const decryptedPassword = await crypto.decrypt(password, iv);
    
            res.status(200).json({websiteName, decryptedPassword});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal Server Error"});
    }
}

const createPassword = async (req,res)=>{
    const {websiteName, password} = req.body;
    const {token} = req.cookies;

    try{
        jwt.verify(token, secretKey, {}, async(err, info)=>{
            if(err)
                return res.json("Not autenticated");
            //encrypt data
            else{
                const data = await crypto.encrypt(password);
            
                const encryptedPassword = data.encryptedData;
                const base64data = data.base64data;
    
                const newPassword = new passwordModel({
                    websiteName: websiteName,
                    password: encryptedPassword,
                    iv: base64data,
                    userId: info.id
                });
    
                await newPassword.save();
                res.status(201).json(newPassword);
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const updatePassword = async (req,res)=>{
    const id = req.params.id;
    const {websiteName, password} = req.body;
    const {token} = req.cookies;

    try{
        jwt.verify(token, secretKey, {}, async(err, info)=>{
            if(err)
                return res.json("Not autenticated");
            //encrypt data
            const data = await crypto.encrypt(password);
            
            const encryptedPassword = data.encryptedData;
            const base64data = data.base64data;
    
            const newPassword ={
                websiteName: websiteName,
                password: encryptedPassword,
                iv: base64data,
                userId: req.userId
            }
            await passwordModel.findByIdAndUpdate(id, newPassword, {new: true});
            res.status(200).json(newPassword);
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const deletePassword = async (req,res)=>{
    const id = req.params.id;
    const {token} = req.cookies;
    try{
        jwt.verify(token, secretKey, {}, async(err, info)=>{
            if(err)
                throw err;
            
            const password = await passwordModel.findByIdAndRemove(id);
            res.status(202).json(password);
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports = {
    getAllPasswords,
    getPassword,
    createPassword,
    updatePassword,
    deletePassword
}
