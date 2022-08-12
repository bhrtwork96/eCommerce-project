const express = require('express')
const { createCatagry, getCatagory, deleteCatagory, getOneCategory, updateCatagory } = require('../controller/category')


const routes = express.Router()

// routes for category
routes.post('/ecomm/api/v1/categories',createCatagry)

routes.get('/ecomm/api/v1/categories',getCatagory)

routes.delete('/ecomm/api/v1/categories/:id',deleteCatagory)

routes.get('/ecomm/api/v1/categories/:id',getOneCategory)

routes.put('/ecomm/api/v1/categories/:id',updateCatagory)


module.exports = routes