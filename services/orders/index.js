const Cart = require('../../models').Cart;
const CartItem = require('../../models').CartItem;
const Product = require('../../models').Product;
const lodash = require('lodash')



module.exports = {
    getTax: (subtotal) => {
        // var itemSubtotals  = lodash.sum(cartItems.map(item => item.total))
        return subtotal * 0.15
    },


    getShippingPrice: () => {
        return 150
    },

    getNextStatus: (currentStatus) => {
        switch(currentStatus.toLowerCase()){
            case 'order received':
                return 'Order Processed';
            case 'order processed':
                return 'Delivery Personnel Assigned';
            case 'delivery personnel assigned':
                return "Delivery In Progress"
            case 'delivery in progress':
                return 'Delivered'
            default:
                return currentStatus;    
        }
    }
}