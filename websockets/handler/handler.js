const { parse } = require('url')

class Handler {
    handlers = {};

    constructor(listeners){
        // console.log("Setting handlers: ", listeners.keys())
        this.handlers = listeners
    }

    handle(request, socket, head){
        const { pathname } = parse(request.url);
        console.log("PATH DETECTED: ", pathname)

        var websocketHandler = this.handlers[pathname]
        if(!websocketHandler || !websocketHandler.onUpgrade ){
            socket.destroy()
        }else {
            websocketHandler.onUpgrade(request, socket, head)
        }
    }
}

module.exports = Handler;