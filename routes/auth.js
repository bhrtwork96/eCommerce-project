const express = require('express');
const {signUp, signIn} = require('../controller/auth');
const {checkSingupCrediantial} = require('../middleware')

const routes = express.Router();

//routes for login and signup

routes.post('/ecomm/api/v1/signup',[checkSingupCrediantial],signUp);
routes.post('/ecomm/api/v1/signin',signIn)


module.exports = routes;