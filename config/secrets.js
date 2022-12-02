var dotenv = require("dotenv").config({
    path: __dirname + '/process.env'
})

console.log(process.env)

module.exports = {
    oneSignalApp: process.env.ONE_SIGNAL_APP,
    oneSignalApiKey: process.env.ONE_SIGNAL_KEY
}