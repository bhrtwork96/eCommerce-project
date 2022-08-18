const { Categories } = require('../models')


async function createCatagry(req, res){
	const data = req.body;
	// const name = data.name;
	// const description = data.description;

	try{
		const result = await Categories.create(data)
		
		res.send({msg : 'Category has been created'})
	}catch(err){
		res.status(500).send({msg : 'Internal server error'})
	}
	
}

async function getCatagory(req, res){

	try{
		const result = await Categories.findAll()
		
		res.send(result)
	}catch(err){
		console.log('err in creation of categories', err)
		res.status(500).send({msg : 'Internal server error'})
	}
	
}

async function deleteCatagory(req, res) {
    const param = req.params;
    try {
        const dbData = await Categories.destroy({
            where: {
                id: param.id
            }
        });
        
        res.send({msg:"Cateogory deleted"})
    }
    catch(err){
       
        res.status(500).send({msg:`err in creating Category${err}`})
    }


}

async function getOneCategory(req, res) {
    const param = req.params;
    try {
        const dbData = await Categories.findOne({
            where: {
                id: param.id
            }
        });
       
        res.send(dbData)
    }
    catch(err){
        
        res.status(500).send({msg:`err in creating Category${err}`})
    }


}

async function updateCatagory(req, res) {
    const data = req.body;
    const param = req.params;
    try {
        const dbData = await Categories.update(data,{
            where: {
                id: param.id
            }
        });
        
        res.send({msg:"Catagory updated"})
    }
    catch(err){
       
        res.status(500).send({msg:`err in creating Catagory${err}`})
    }


}


module.exports = {
	createCatagry, getCatagory, deleteCatagory,getOneCategory,updateCatagory
}