const bcrypt = require('bcryptjs');
const e = require('express');
const { User,Cart } = require('../models');
const jwt = require('jsonwebtoken');


async function signUp(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 8);


    try {
        const user = await User.create({ username, email, password });

        if (req.body.roles) {
            const roles = req.body.roles;
            const result = await user.setRoles(roles);
            const cart = await Cart.create({id:user.dataValues.id})
        }
        else {
            const result = await user.setRoles([1]);
            const cart = await Cart.create({id:user.dataValues.id})
        }
        res.send({ msg: 'user has been created sucessfully' })
    }
    catch (err) {
        res.status(500).send({ msg: "internal server error "+err })
    }
}

async function signIn(req, res) {
    const data = req.body;
    const username = data.username;
    const password = data.password;

    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (user) {
            const validate = bcrypt.compareSync(password, user.password);
            if (!validate) {
                res.status(400).send({ msg: "Password not correct" })
            }
            else 
            {
                const token = await jwt.sign({ id: user.id }, 'AWaL!#n7f2lwZ#LN^CRV34gXt2Pk&No7', { expiresIn: '1h' })
                
                const authority =[];
                const roles = await user.getRoles();
                roles.forEach((r)=>{
                    authority.push(r.name)
                })

                const finalUser = {
                    id: user.id,
                    user: user.username,
                    token:token,
                    roles:authority

                }

                res.send(finalUser)
            }
        }
        else {
            res.status(400).send({ msg: "User not valid" })
        }

    }
    catch (err) {
        res.status(500).send({ msg: "internal sever error" })
    }

}

module.exports = { signUp, signIn }