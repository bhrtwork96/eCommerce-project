const express = require('express')
const {updateCart, cartView} = require('../controller/cart')
const {tokenVerify} = require("../middleware")
const routes = express.Router()

// routes for carts

routes.put("/ecomm/api/cart/:id",[tokenVerify],updateCart)

routes.get("/ecomm/api/cart",[tokenVerify],cartView)

module.exports = routes