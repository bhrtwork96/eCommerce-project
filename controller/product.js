const { Product } = require("../models")
const {Op} = require("sequelize")

async function createProduct(req, res) {
    const data = req.body;

    if (data) {
        try {
            const dbData = await Product.create(data);
            
            res.send({ msg: "Product created" })
        }
        catch (err) {
            
            res.status(500).send({ msg: `err in creating Product:- ${err}` })
        }
    }
    else {
        res.status(400).send({ msg: 'Product data not avilable' })
    }
}

async function getProduct(req, res) {
    try {
        const dbData = await Product.findAll();
        
        res.send(dbData)
    }
    catch (err) {
        
        res.status(500).send({ msg: `err in creating Product${err}` })
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
        res.send({ msg: "Product deleted" })
    }
    catch (err) {
        
        res.status(500).send({ msg: `err in creating Product${err}` })
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
        
        res.send(dbData)
    }
    catch (err) {
       
        res.status(500).send({ msg: `err in creating Product${err}` })
    }


}

async function updateProduct(req, res) {
    const data = req.body;
    const param = req.params;
    try {
        const dbData = await Product.update(data, {
            where: {
                id: param.id
            }
        });
        
        res.send({ msg: "Prouct updated" })
    }
    catch (err) {
        
        res.status(500).send({ msg: `err in creating Product${err}` })
    }


}

async function filterProduct(req, res) {
    // filter for category
    const CatId = req.query.CategoryId // ?CategoryId=3
    if (CatId) {

        const filterData = await Product.findAll(
            {
                where: {
                    CategoryId: CatId
                }
            })
        res.send(filterData);
        return;
    }

    // filter for productname
    const name = req.query.name // ?name=
    if (name) {

        const filterData = await Product.findAll(
            {
                where: {
                    name: name
                }
            })
        res.send(filterData);
        return;
    }

    // filter cost
    const minCost = req.query.minCost;
    const maxCost = req.query.maxCost;

    if(minCost&&maxCost){
        const costData = await Product.findAll({
            where:{
                cost:{
                    [Op.gte]:minCost,
                    [Op.lte]:maxCost
                }
            }
        })
        res.send(costData)
    }
    else if(minCost){
        const costData = await Product.findAll({
            where:{
                cost:{
                    [Op.gte]:minCost
                }
            }
        })
        res.send(costData)
    }
    else if(maxCost){
        const costData = await Product.findAll({
            where:{
                cost:{
                    [Op.lte]:maxCost
                }
            }
        })
        res.send(costData)
    }
    else{
        const costData = await Product.findAll()
        res.send(costData)
    }


}



module.exports = { createProduct, getProduct, deleteProduct, getOneProduct, updateProduct, filterProduct }