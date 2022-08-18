function checkCategoryName(req,res,next){
    const data = req.body;
    if(!data.name){
        res.status(400).send({msg:"Name is mandotary"});
        return;
    }
    next()
}


module.exports = {
    checkCategoryName
}