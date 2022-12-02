const Handler = require('./websockets/handler/handler')
const orderWebsocket = require("./websockets/listeners/order")

const handler = new Handler({
    "/order": orderWebsocket
})

module.exports = handler;