const user = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');
const express = require('express');
const app = express();
const bodyparesr = require('body-parser');
const { findByIdAndUpdate } = require('../models/userModel');
const getLoginUsers = require('../middleware/cls');
const isValid = require('../utils/validateMongo');
const generateRefreshToken = require('../config/refreshToken');
const jwt = require('jsonwebtoken')
app.use(bodyparesr.json())
const createUser = asyncHandler( async (req,res)=> {
    const email = req.body.email;
    console.log({data:req.body})
    const findUser = await user.find({email:email});
    if(findUser.length == 0){
        let data = new user(req.body);
        data.save().then((data) =>{
            if(data){
                res.send(data)
            }
        }).catch(err=>res.status(400).send(err))
    }
    else{
        res.json({
            msg:"user already exists",
            success: false
        })
        }
})
const loginUserControll = asyncHandler(async(req,res) =>{
    const{email,password} = req.body;
    let data = await user.findOne({email:email});
    if(data && await data.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(data?._id);
        const updateUserData = await user.findByIdAndUpdate(data?._id,{
            refreshToken:refreshToken
        },
        {
            new :true
        })
        res.cookie('refreshToken',refreshToken ,{
            httpOnly:true,
            maxAge:72*60*60*1000
        })
        res.json({
            data
        })
        getLoginUsers(data);
    }
    else{
        
          res.json({msg:"invalid credentials provided"})
    }
})
const getAllUsers = asyncHandler(async(req,res)=>{
    const usersData =  await user.find();
    res.json(usersData);
})
const getUser = asyncHandler(async(req,res) =>{

    const{id} = req.params;
    isValid(id)
    let data = await user.findById(id);
    if(data){
    res.json(data);
    }
    else{
        res.json({result:"user not found"})
    }
})
const deleteUser = asyncHandler(async(req,res) => {
    const{id} = req.params;
    isValid(id)
    let data = await user.findByIdAndDelete(id);
    res.json(data);
})
const updateUser = asyncHandler(async (req,res) =>{
    console.log({data:req});
    const {id} = req.params;
    let data = await user.findByIdAndUpdate(id,req.body,{
        new:true
    }
    )
    if(data){
        res.send(data)
    }else{
        res.send('user not found')
    }
})
const blockedUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    let block = await findByIdAndUpdate(id,{isBlocked:true},{new :true})
    res.send(block)
})
const handleRefreshToken = async (req,res) =>{
    const cookie = req.cookies;
    console.log(cookie)
    if(!cookie?.refreshToken){
        throw new Error(' there is no refresh token')
    }
    const refreshToken = cookie.refreshToken;
    const data = await user.findOne({refreshToken})
    if(!data){
        throw new Error('refresh Token Not matching in db')
    }
    jwt.verify(refreshToken,process.env.JWT_SECRETKEY,(err,decode) =>{
        if(err || data.id !=decode?.id){
            throw new Error('there is someThing wrong with refreshtoken')
        }
        const accessToken = generateToken(data?._id)
        res.json({accessToken});
    })


}
module.exports = {
    createUser,
    loginUserControll,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    handleRefreshToken
}

