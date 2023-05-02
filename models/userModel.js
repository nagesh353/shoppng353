const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        lowercase: true,
        trim:true,
    },
    mobileNo:{
        type:String,
        require: true,
        trim:true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim:true

    },
    role:{
        type: String,
        default : "user"
    },
    cart:{
        type: Array,
        default : []
    },
    isBlocked:{
        type:Boolean,
        default: false

    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    wishList:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"

    },
    refreshToken:{
        type:String
    }
  
})
schema.pre('save',async function (next) {
const salt = await bcrypt.genSaltSync(10);
this.password = await bcrypt.hash(this.password,salt)
})
schema.pre('validate',function(next) {
    return new Promise((resolve,rejet) =>{
        if(this.mobileNo?.length!==10) {
            return rejet('mobileNo should be 10 digits')
        }
        return resolve();
    })
})
schema.methods.isPasswordMatched = async function(enterdpassword){
    return await bcrypt.compare(enterdpassword,this.password);

}

schema.set('timestamps', true);
schema.index({email:1},{name:1})
module.exports =  mongoose.model('user',schema);
