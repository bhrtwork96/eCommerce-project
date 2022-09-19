const express = require('express')
const { createCatagry, getCatagory, deleteCatagory, getOneCategory, updateCatagory } = require('../controller/category')
const {checkCategoryName, tokenVerify, isAdmin} = require('../middleware')

const routes = express.Router()

// routes for category
routes.post('/ecomm/api/v1/categories',[checkCategoryName,isAdmin],createCatagry)

routes.get('/ecomm/api/v1/categories',getCatagory)

routes.delete('/ecomm/api/v1/categories/:id',[isAdmin],deleteCatagory)

routes.get('/ecomm/api/v1/categories/:id',getOneCategory)

routes.put('/ecomm/api/v1/categories/:id',[isAdmin],updateCatagory)


module.exports = routes