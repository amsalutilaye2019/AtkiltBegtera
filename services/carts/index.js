const Cart = require('../../models').Cart;
const CartItem = require('../../models').CartItem;
const Product = require('../../models').Product;
const lodash = require("lodash")



module.exports = {
    createOrGetCart: async(accountId) => {
        var currentCart = await Cart.findOne({
            where: {
                checkedOut: false,
                accountId
            },

            include: {
                model: CartItem,
                as: "cartItems",
                include: {
                    model: Product,
                }
            }
        })

        if(currentCart == null){
            console.log("--> Creating new cart")
            currentCart = await Cart.create({
                accountId,
                checkedOut: false
            })
            await currentCart.save()
        }
        return currentCart
    },

    getCartSubtotal: async(cartId) => {
        var cartItems = await CartItem.findAll({
            where: {
                cartId: cartId
            }
        })
        console.log("CartItems: ",cartItems.dataValues)
        return lodash.sum(cartItems.map(item => item.total))
    },
}