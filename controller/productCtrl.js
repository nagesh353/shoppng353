const product = require('../models/productModel')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')

const createProduct = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const data = new product(req.body);
    data.save().then((result) =>{
        if(result){
            res.json(result)
        }
    }).catch(err =>res.json({error:err}))
})
const products =  asyncHandler(async(req,res) => {
    console.log('**********')
    const getalldata = await product.find({brand:Samsung})
    if(!getalldata){
        res.send({msg:'product not found'})
    }
    else{
        res.send({getalldata})
    }

    
})

const getProduct = (req,res)=>{
    const {id} = req.params;
    product.findById(id,(err,data) =>{
        if(err){
            res.json({err})
        }
        else{
        res.json({data})
        }
    })
}

module.exports = {
    createProduct,
    getProduct,
    products
}