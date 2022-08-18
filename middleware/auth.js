const { User,Role } = require('../models');
const jwt = require('jsonwebtoken')

async function checkSingupCrediantial(req, res, next) {
    const data = req.body;
    // checking for user name
    if (data.username) {
        const result = await User.findOne({
            where: {
                username: data.username
            }
        })
        console.log(result)
        if (result) {
            res.status(400).send({ msg: "Usename already available" });
            return;
        }
    }
    else {
        res.status(400).send({ msg: "user name mandatory" })
        return;
    }
    // checking for email
    if (data.email) {
        const result = await User.findOne({
            where: {
                email: data.email
            }
        })
        if (result) {
            res.status(400).send({ msg: "Email already available" });
            return;
        }
    }
    else {
        res.status(400).send({ msg: "email mandatory" })
        return;
    }
    
    // checking for roles available in table
    let flag=true;
    console.log(data.roles)
    if(data.roles){
        const allRoles = await Role.findAll()
        console.log(allRoles)
        data.roles.forEach((role) => {
            const result = allRoles.filter(e=>{
                return e.id==role
            })
            if(result.length==0){
                flag=false;
            }
            
        });
        if(!flag){
            res.status(400).send({msg:"Roles is not availbe in table"})
            return;
        }
    }
    next()      
    
}





module.exports = {checkSingupCrediantial}






