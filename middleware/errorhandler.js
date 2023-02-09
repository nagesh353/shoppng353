


const notFound = (req,res)=>{
    const error = new Error(`Not Found :${req.originalUrl}`);
    error.msg = "page not found "
    res.status(404).send({error:error.msg});
}

module.exports = {
    notFound
}