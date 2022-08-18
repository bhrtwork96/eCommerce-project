
const jwt = require('jsonwebtoken');
const { User } = require('../models')

async function tokenVerify(req, res, next) {
    const token = req.headers['access-token'];
    console.log('token',token)

    if (token) {
        try {
            const result = await jwt.verify(token, process.env.SECRATE_KEY)
            if (result) {
                next()
            }
        }
        catch (err) {
            res.status(401).send("Your token has expired plase signin")
        }
    }
    else {
        res.status(401).send("token missed")
    }


}

async function isAdmin(req, res, next) {
    const token = req.headers['access-token'];
    if (token) {
        try {
            const result = await jwt.verify(token, process.env.SECRATE_KEY)
            if (result) {
                try {
                    const user = await User.findOne({
                        where: {
                            id: result.id
                        }
                    });
                    const roles = await user.getRoles();
                    console.log('roles', roles)
                    let flag = false;
                    roles.forEach(role => {
                        if (role.name == "Admin") {
                            flag = true;
                        }
                    });
                    if (flag) {
                        next()
                    }
                    else {
                        res.send({ msg: "you are not authorize" })
                    }
                }
                catch (err) {
                    res.status(500).send({ msg: `Internal server error ${err}` })
                }
            }
        }
        catch (err) {
            res.status(401).send("Your token has expired plase signin")
        }
    }
    else {
        res.status(401).send("token missed")
    }

}

module.exports = { tokenVerify, isAdmin }