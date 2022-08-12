const { Product } = require("../models")

async function createProduct(req, res) {
    const data = req.body;
    
    if (data) {
        try {
            const dbData = await Product.create(data);
            console.log(dbData)
            res.send({msg:"Product created"})
        }
        catch(err){
            console.log(err)
            res.send({msg:`err in creating Product${err}`})
        }
    }
    else{
        res.send({msg:'Product data not avilable'})
    }
}

async function getProduct(req, res) {
        try {
            const dbData = await Product.findAll();
            console.log(dbData)
            res.send(dbData)
        }
        catch(err){
            console.log(err)
            res.send({msg:`err in creating Product${err}`})
        }
    
    
}

async function deleteProduct(req, res) {
    const param = req.params;
    try {
        const dbData = await Product.destroy({
            where: {
                id: param.id
            }
        });
        console.log(dbData)
        res.send({msg:"Product deleted"})
    }
    catch(err){
        console.log(err)
        res.send({msg:`err in creating Product${err}`})
    }


}

async function getOneProduct(req, res) {
    const param = req.params;
    try {
        const dbData = await Product.findOne({
            where: {
                id: param.id
            }
        });
        console.log(dbData)
        res.send(dbData)
    }
    catch(err){
        console.log(err)
        res.send({msg:`err in creating Product${err}`})
    }


}

async function updateProduct(req, res) {
    const data = req.body;
    const param = req.params;
    try {
        const dbData = await Product.update(data,{
            where: {
                id: param.id
            }
        });
        console.log(dbData)
        res.send({msg:"Prouct updated"})
    }
    catch(err){
        console.log(err)
        res.send({msg:`err in creating Product${err}`})
    }


}




module.exports ={createProduct,getProduct, deleteProduct, getOneProduct, updateProduct}