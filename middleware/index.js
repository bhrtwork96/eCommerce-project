const {checkCategoryName} = require("./category");
const {productDataCheck} = require("./product");
const {checkSingupCrediantial} = require("./auth");
const {tokenVerify,isAdmin} = require('./authjwt')

module.exports = {checkCategoryName,productDataCheck,checkSingupCrediantial,tokenVerify,isAdmin}