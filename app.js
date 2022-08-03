const express = require('express');
const ServerConfig = require('./configs/config.server');
const DbConfig =require('./configs/db.config')


const app = express();



app.listen(ServerConfig.PORT, ()=>{
    console.log(`App started on the port no: ${ServerConfig.PORT}`);
})