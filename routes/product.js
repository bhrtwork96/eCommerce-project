const express = require('express')
const { createProduct,getProduct, deleteProduct, getOneProduct, updateProduct } = require('../controller/product')

const routes = express.Router()

// routes for category
routes.post('/ecomm/api/v1/products',createProduct)

routes.get('/ecomm/api/v1/products',getProduct)

routes.delete('/ecomm/api/v1/products/:id', deleteProduct)

routes.get('/ecomm/api/v1/products/:id',getOneProduct)

routes.put('/ecomm/api/v1/products/:id',updateProduct)


// routes for product



module.exports = routes