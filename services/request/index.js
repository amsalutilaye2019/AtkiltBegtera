const jwt = require("jsonwebtoken")
const authConfig = require("../../config/auth")
const { getTokenFromRequest, parseTokenDetails } =  require("../../middlewares/authMiddleware")
var parseUserDetails = (req) => {
    let token = getTokenFromRequest(req)
    const decoded = jwt.verify(token, authConfig.authSecret);  
    // var decoded = jwt.verify(token, authConfig.authSecret)
        var userId = decoded.accountId  
        console.log('USER ID ' ,userId)  
        console.log('Decoded ' ,decoded)
    return userId
}

var getUserId = (req) => {
    var details = parseUserDetails(req);
    return details
}
module.exports = {
    parseUserDetails,
    getUserId
}