const mongoose = require('mongoose'); // Erase if already required
const Schema = mongoose.Schema
const user = require('./userModel.js')


// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim : true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase :true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type : String,
        require :true

    },
    quantity: Number,
    images:{
        type : Array,

    },
    brand:{
        type:String,
        required :true
    },
    sold:{
        type : Number,
        default : 0
    },
    ratings:[{
        star: Number,
        postedby:{
            type : Schema.Types.ObjectId,
            ref : 'user'
        }

    }]
},

{timestamps:true}
);


productSchema.index({title:1},{price:1})
//Export the model
module.exports = mongoose.model('product', productSchema);