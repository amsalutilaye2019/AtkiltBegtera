const authConfig = require('../../config/auth')
const jwt = require("jsonwebtoken")
const Account = require("../../models").Account
const BlacklistedToken = require("../../models").BlacklistedToken


async function verifyToken(req, res, next){
    // let authHeader = req.headers["authorization"];
    // let token = authHeader && authHeader.split(' ')[1]
    let token = getTokenFromRequest(req)
    console.log(authConfig)
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    
    try{
        if(await BlacklistedToken.isBlacklisted(token)){
            console.log("Blacklisted Token")
            return res.status(401).send({
                status: "Token has Expired!"
            })
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
            req.userDetails = account.dataValues;
            next();    
        }else{
            res.status(401).send({
                message: "Invalid Token!"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(401).send({
        message: "Unauthorized!"
        });
    }
}

function getTokenFromRequest(req){
    let authHeader = req.headers["authorization"]
    let token = authHeader && authHeader.split(" ")[1]
    return token;
}

function parseTokenDetails(token){
    try{
        var decoded = jwt.verify(token, authConfig.authSecret)
        console.log("PARSED DETAILS OF TOKEN AS: ")
        console.log(decoded)
        return decoded;
    }catch(e){
        console.log("error is : ", e)
        throw e;
    }
}

module.exports = {
    verifyToken,
    getTokenFromRequest,
    parseTokenDetails
}
