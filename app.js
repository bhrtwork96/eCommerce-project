const express = require('express');
const ServerConfig = require('./config/config.server');
const { Categories, Product } = require('./models');
const {categoriesRoute, productRoute} = require('./routes/index');


const app = express();


app.use(express.json())

app.use(categoriesRoute)
app.use(productRoute)

app.listen(ServerConfig.PORT, async () => {
    console.log(`App started on the port no: ${ServerConfig.PORT}`);
    init()
})

async function init() {
    try {
        await Categories.sync()
        await Product.sync()

    //     const defaultCategories = [
    //         {
    //             name: "Mobile",
    //             description: "All mobile phone"
    //         },
    //         {
    //             name: "Laptop",
    //             description: "All type laptop"
    //         }
    //     ]
    // const result = await Categories.bulkCreate(defaultCategories)
    // console.log(result)
    }
    catch(err){
        console.log(err)
    }
    
}