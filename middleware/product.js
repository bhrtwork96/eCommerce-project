const {Categories} = require('../models')
async function productDataCheck(req,res,next){
    const data = req.body;
    if(!data.name){
        res.status(400).send({msg:"product name is missing"})
        return;
    }
    if(!data.cost){
        res.status(400).send({msg:"product cost is missing"})
        return;
    }
    if(!data.quantity){
        res.status(400).send({msg:"product quantity is missing"})
        return;
    }
    if(data.CategoryId){
        try{
            const result = await Categories.findByPk(data.CategoryId)
            console.log(result)
            if(!result){
                res.status(400).send({msg:"CategaryId is not availabe in categories table"})
                return;
            }
        }
        catch(err){
            res.status(500).send({msg:`Internal server error: ${err}`})
            return;
        }

    }
    else{
        res.status(400).send({msg:"product CategoryId is missing"})
        return;
    }
    next();

}

module.exports = {productDataCheck}