const orderServices = require("../../services/orders")
const requestServices = require("../../services/request")
const Cart = require('../../models').Cart;
const CartItem = require('../../models').CartItem;
const Product = require('../../models').Product;
const Order = require('../../models').Order;
const Driver = require('../../models').Driver;
const DeliveryResponse = require('../../models').DeliveryResponse;
const Sequelize =  require("sequelize")
const orderWebsocket = require("../../websockets/listeners/order")
const notificationService = require("../../services/notifications")
const { parseTokenDetails, getTokenFromRequest } = require('../../middlewares/authMiddleware')
module.exports = {
    getAllOrders: async(req, res, next)=>{
        // res.send({"status": "All Orders"})
        var token = getTokenFromRequest(req)
        var details = parseTokenDetails(token)
        var status = req.query.status
        var userId = requestServices.getUserId(req)
        var filter = details?.roles?.vendor || details?.roles?.delivery? {} : { accountId: userId} 
        
        Cart.findAll({where: filter}).
            then(carts => {
                var filter = {
                    cartId: {
                        [Sequelize.Op.in]: carts.map(cart => cart.id)
                    }
                };
                if(status){
                    filter.status = status
                }
                return Order.findAll({
                    where: filter,
                    include: {
                        model: Cart,
                        include: {
                            model: CartItem,
                            as: "cartItems",
                            include: {
                                model: Product,
                            }
                        }
                    }
            })
            .then(orders => res.status(200).send(orders))
            .catch(error => res.status(400).send(error))
        
        })
        // .then(orders =>  {
        //     console.log("ORDERS: ", orders)
        //     res.status(200).send(orders)})
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        });
    },

    getOrderById: async(req, res, next) => {
        return Order
            .findAll({
                where: {
                    id: req.params.id
                }
            })
            .then(order => res.status(200).send(order[0]))
            .catch(error => res.status(400).send(error));
    },

    createOrder: async(req, res, next) => {
        res.send({
            "status": "Created a new cart"
        })
    },

    progressOrder: async(req, res, next) => {
        var orderId = req.params.id;
        var order = await Order.findByPk(orderId);

        if(order == null){
            return res.status(404).send({
                error: "Order does not exist"
            })
        }

        order.status = orderServices.getNextStatus(order.status)

        if(order.status == 'Order Processed'){
            
            // orderWebsocket.server.clients.forEach(client => {
            //     client.emit("order-delivery-request", {
            //         order: order.dataValues
            //     })
            // })
            
            await notificationService.sendNotification("New Order Recieved", order, `pos://sample.com/?id=${order.id}`)
            console.log("Notification Sent to Drivers")
            
        }
        return order.save()
        .then( order => res.status(200).send(order))
        .catch(error => res.status(500).send(error))
    },

    declineOrderRequest: async(req, res, next) => {
        var userId = await requestServices.getUserId(req)
        var driver = await Driver.findOne({ where: { accountId: userId}})
        var orderId = parseInt(req.params.orderId)
        var responses = await DeliveryResponse.findAll({
            driverId: driver.id,
            orderId: orderId
        })

        var previousRejection = false;

        if(responses && responses.length){
            var previousRejection = responses.some(response => DeliveryResponse.isRejected(response))
        }

        if(previousRejection){
            return res.status(400).send({
                status: "Order has been declined before. No need to decline again"
            })
        }else {
            await DeliveryResponse.rejectDeliveryRequest(orderId, driver.id)
            return res.status(200).send()
        }
        //check if the user has declined the order before
        // if not decline the order and send code 200
        // if declined before return 400 with explanation
    },

    acceptOrderRequest: async(req, res, next) => {
        var userId = await requestServices.getUserId(req)
        var driver = await Driver.findOne({ where: { accountId: userId}})
        var orderId = parseInt(req.params.orderId)
        var order = await Order.findByPk(orderId)

        if(order.status != "Order Processed"){
            return res.status(400).send({
                status: "Order not yet processed"
            })
        }

        var allResponses = await DeliveryResponse.findAll({
            where: {
                response: "ACCEPTED",
                orderId: orderId
            }
        })

        console.log(allResponses.length)

        if(allResponses.length){
            return res.status(400).send({
                status: "Order has already been picked up"
            })
        }

        order.status = orderServices.getNextStatus(order.status)

        await DeliveryResponse.acceptDeliveryRequest(orderId, driver.id)
        return order.save()
        .then(() => res.status(200).send())
        .catch((error) => res.status(500).send())
    
        //check if the order has already been accepted
            //if accepted return 400
        //check if the order has already replied to the order request
            //if the order has been replied to return 400
        //write to delivery responses and send 200
    },

    cancelDelivery: async(req, res, next)=>{
        var userId = requestServices.getUserId(req)
        var driver = await Driver.findOne({
            where: {
                accountId: userId
            }
        })
        var orderId = parseInt(req.params.id);
        var order = await Order.findByPk(orderId);

        console.log(driver)

        var response = await DeliveryResponse.findOne({
            where: {
                response: "ACCEPTED",
                driverId: driver.id
            }
        })

        if(!response){
            res.status(400).send({
                status: "Bad Request"
            })
        }

        if(order == null){
            return res.status(404).send({
                error: "Order does not exist"
            })
        }else if(order.status != "Delivery Personnel Assigned"){
            return res.status(400).send({
                error: "Delivery can not be cancel at current status"
            })
        }

        order.status = "Order Processed"
        // await notificationService.sendNotification("New Order Recieved", order, `pos://sample.com/?id=${order.id}`)
        await DeliveryResponse.cancelDeliveryRequest(response.id)
        return order.save()
        .then( order => res.status(200).send(order))
        .catch(error => res.status(500).send(error))
    }
}