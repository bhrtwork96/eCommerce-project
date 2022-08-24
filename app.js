const express = require('express');
const ServerConfig = require('./config/config.server');
const { Categories, Product, User, Role, sequelize } = require('./models');
const role = require('./models/role');
const user = require('./models/user');
const {categoriesRoute, productRoute, authRoute, cartRoute} = require('./routes/index');


const app = express();


app.use(express.json())

app.use(categoriesRoute)
app.use(productRoute)
app.use(authRoute)
app.use(cartRoute)

app.listen(ServerConfig.PORT, async () => {
    console.log(`App started on the port no: ${ServerConfig.PORT}`);
    init()
})

async function init() {
    try {
        await sequelize.authenticate();

//     const defaultProducts = [
// 		{
// 		    "description":"Nyka best products",
// 		    "name" :"MakeUP Kit",
// 		    "cost": 870,
// 		    "quantity": 20,
// 			"CategoryId": 1
// 		},
// 		{
//     		"description":"Best fragnance",
// 		    "name" :"Fogg",
// 		    "cost": 280,
// 		    "quantity": 20,
// 			"CategoryId": 2
// 		},
// 		{
//     		"description":"Best for summer holidays",
// 		    "name" :"Summer Clothes",
// 		    "cost": 1200,
// 		    "quantity": 20,
// 			"CategoryId": 3
// 		}
// ]

// 		const defaultCategories = [
// 		{
// 			name : 'Beauty',
// 			description: 'All beauty Products'
// 		},
// 		{
// 			name: 'Fragnance',
// 			description: 'All Fragnance Products'
// 		},
// 		{
// 			name: 'Clothes',
// 			description: 'All types of Clothes'
// 		}
// 		]

// 		const defaultRoles = [
// 		{
// 			name : 'User'
// 		},
// 		{
// 			name: 'Admin',
// 		}
// 		]
// 		await Categories.bulkCreate(defaultCategories)
// 		await Product.bulkCreate(defaultProducts)
// 		await Role.bulkCreate(defaultRoles)
    }
	
    catch(err){
        console.log(err)
    }

}