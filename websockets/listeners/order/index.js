const { WebSocketServer } = require('ws')
const { v4: uuidV4 } = require("uuid")
const DeliveryResponse = require("../../../models").DeliveryResponse;
const wss1 = new WebSocketServer({ noServer: true });
const { getTokenFromRequest, parseTokenDetails } = require("../../../middlewares/authMiddleware")
const Account = require("../../../models").Account;
const Driver = require("../../../models").Driver;
const BlacklistedToken = require("../../../models").BlacklistedToken;

wss1.on('connection', function connection(ws) {
    console.log("New Driver Connected")
    ws.on('message', (msg, req)=>{
      console.log("MESSAGE ON NEW-ORDER EVENT: ", message)
      try{
        var message = JSON.parse(msg.toString())
        if (!message.event){
            throw new Error("Invalid message object")
        }
        ws.emit(message.event, message.body)
      }catch(e){
          ws.send("Invalid message object")
          return;
      }
    //   ws.emit()
    //   ws.send("New-Order Recieved")
      
    })

    
    ws.on('order-delivery-response', async(msg, req) => {
        // save to order response table
        console.log("delivery response: ", msg)
        if(msg.response && msg.response.toLowerCase() == "rejected"){
            await DeliveryResponse.rejectDeliveryRequest(msg.order.id, ws.userDetails.driver.id)
            // DeliveryResponse.create({
            //     orderId: msg.order.orderId,
            //     driverId: ws.userDetails.id,
            //     response: "REJECTED"
            // });
        }else if(msg.response && msg.response.toLowerCase() == "accepted"){
            await DeliveryResponse.acceptDeliveryRequest(msg.order.id, ws.userDetails.driver.id)
            // create({
            //     orderId: msg.order.orderId,
            //     driverId: ws.userDetails.id,
            //     response: "ACCEPTED"
            // });
            wss1.clients.forEach(websocket => {
                console.log("LISTENER: ", websocket.websocketId)
                if(websocket.websocketId != ws.websocketId){
                    websocket.emit('cancel-order-request', {
                        order: msg.order
                    })
                }
            })
        }
        console.log("CAUGHT", msg)
    })


    ws.on('order-delivery-request', async(msg, req) => {
        // pull id of listeners
        var responses = await DeliveryResponse.findAll({
            driverId: ws.userDetails.driver.id,
            orderId: msg.order.id
        }) 

        var previousRejection = false;

        if(responses && responses.length){
            var previousRejection = responses.some(response => DeliveryResponse.isRejected(response))
        }
        
        if(!previousRejection){
            ws.send(JSON.stringify({
                event: "order-delivery-request",
                body: {
                    order: msg.order
                }
            }))
        }
        // check to see if driver has rejected this order before and is available
        // send if not, 
        console.log("CAUGHT by", ws.userDetails)
    })

    ws.on('cancel-order-request', (msg, req) => {
        ws.send(JSON.stringify({
            event: "cancel-order-request",
            body: {
                order: msg.order
            }
        }))
    })
})

const onUpgrade = (request, socket, head) => {
    wss1.handleUpgrade(request, socket, head, async function done(ws) {
        let token = getTokenFromRequest(request)
        if (!token) {
          socket.destroy();
        }
        
        try{
            if(await BlacklistedToken.isBlacklisted(token)){
                console.log("Blacklisted Token")
                socket.destroy();
            }
    
            var decoded = parseTokenDetails(token);
            console.log(decoded)
            var accounts = await Account.findAll({
                where: {
                    id: decoded.accountId
                }
            })
        
            if(accounts.length){
                var account = accounts.length && accounts[0]

                var drivers = await Driver.findAll({
                    where: {
                        accountId: account.id
                    }
                })

                if(drivers.length){
                    var driver = drivers.length && drivers[0]
                    ws.userDetails = {
                        driver: driver.dataValues,
                        account: account.dataValues
                    }
                    ws.websocketId = uuidV4();
                    wss1.emit('connection', ws);
                    return;
                } 
            }
            throw new Error("Unauthorized")
        }catch(err){
            console.log(err)
            socket.destroy();
        }
    });
}

module.exports = {
    server: wss1,
    onUpgrade
}