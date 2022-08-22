const { Cart, Product } = require("../models")
const jwt = require('jsonwebtoken')



const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const data = req.body;
    if (data.productId) {
        try {
            const cart = await Cart.findOne({
                where: {
                    id: cartId
                }
            })
            console.log(cart)
            if (cart) {
                const products = await Product.findAll({
                    where: {
                        id: data.productId
                    }
                })
                console.log(products)
                if (products.length >0) {
                    const cartproduct = await cart.setProducts(data.productId)
                    const cartProducts = await cart.getProducts();
                    let totalcost = 0;
                    for (let i = 0; i < cartProducts.length; i++) {
                        totalcost += cartProducts[i].cost;
                    }
                    cart.cost = totalcost;
                    await cart.save();

                    res.send(cart)
                }
                else {
                    res.status(400).send({ msg: "Product not available" })
                }

            }
            else{
                res.status(400).send({msg:"Cart not available"})
            }
        }
        catch (err) {
                res.status(500).send({ msg: "Intenal server Error" })
                console.log('erorr:- ', err)
            }
        }
    else {
        res.status(400).send({ msg: "require product id" })

    }

}

const cartView = async (req, res) => {
    const cartId = jwt.decode(req.headers['access-token']).id
    console.log(cartId)
    try {
        const cart = await Cart.findOne({
            where: {
                id: cartId
            },
            include: Product
        })

        if (cart) {
            res.send(cart)
        }
        else {
            res.send({ msg: "cart not available" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Internal Server Error" })
    }
}


module.exports = { updateCart, cartView }