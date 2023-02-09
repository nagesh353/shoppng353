const mongoose = require('mongoose');

const connection = ()=>{
        mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true },(err,res)=> {
            if(err){
                throw new Error(err)
            }
            else{
            console.log("connected succesfully")
            }
        })

    }
module.exports = connection;