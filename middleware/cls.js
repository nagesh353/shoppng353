const getLoginUsers = (logger)=>{
    const loginUser ={
    id:logger._id,
    name:logger.name,
    mobileNo: logger.mobileNo
    }
    return loginUser;
}

module.exports = getLoginUsers;