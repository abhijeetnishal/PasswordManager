const crypto = require('../dataEncryptAndDecryp/ecyptDecrypt')

const passwordModel = require('../database/passwordModel')

const getAllPasswords = async(req,res)=>{
    try{
        const data = await passwordModel.find().select({ websiteName: 1, password: 1, _id: 0 })
        //this method returns all data in DB
        
        if(data==null)
            res.status(404).json('not found');
        else{
            res.status(200).json(data);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

const getPassword = async (req,res)=>{
    try{
        const data = await passwordModel.findOne({_id: req.params.id})

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
        res.status(500).json({message:"something went wrong"});
    }
}

const createPassword = async (req,res)=>{
    const {websiteName, password} = req.body;

    //encrypt data
    const data = await crypto.encrypt(password);
    
    const encryptedPassword = data.encryptedData;
    const base64data = data.base64data;

    const newPassword = new passwordModel({
        websiteName: websiteName,
        password: encryptedPassword,
        iv: base64data,
        userId: req.userId
    });

    try{
        await newPassword.save();
        res.status(201).json(newPassword);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

const updatePassword = async (req,res)=>{
    const id = req.params.id;
    const {websiteName, password} = req.body;

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

    try{
        await passwordModel.findByIdAndUpdate(id, newPassword, {new: true});
        res.status(200).json(newPassword);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

const deletePassword = async (req,res)=>{
    const id = req.params.id;
    try{
        const password = await passwordModel.findByIdAndRemove(id);
        res.status(202).json(password);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}


module.exports = {
    getAllPasswords,
    getPassword,
    createPassword,
    updatePassword,
    deletePassword
}
