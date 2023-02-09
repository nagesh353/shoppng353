const mongoose = require('mongoose');
const isValid = mongoose.Types.ObjectId();
const validatMongoId = (id) =>{
    if(!isValid(id)){
        throw new Error('not a valid mongoose id')
    }
}
module.exports = isValid;