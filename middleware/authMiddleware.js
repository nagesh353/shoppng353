const user = require('../models/userModel');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const middleware = asyncHandler(async(req,res,next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        try{
            if(token){
                const decoded =  jwt.verify(token,process.env.JWT_SECRETKEY)
                const data = await user.findById(decoded?.id)
                req.userData = data;
                next();
            }

        }
        catch(err){
            throw new Error(' token expied please login')

        }

    }
    else{
        throw new Error('no token attached in headers')
    }

})
const isAdmin = asyncHandler(async(req,res,next) =>{
    const {email} = req.userData;
    const adminUser = await user.findOne({email:email});
    if(adminUser.role !== 'Admin'){
        res.send({msg:`user is not a Admin ${adminUser.name}`})

    }
    else{
        next();
    }

})
module.exports = {
    middleware,
}