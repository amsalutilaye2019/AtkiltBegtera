const jwt = require('jsonwebtoken')
const authConfig = require("../../config/auth")
const RefreshToken = require('../../models').RefreshToken
const Account = require("../../models").Account;
const BlacklistedToken = require('../../models').BlacklistedToken
const { getTokenFromRequest, parseTokenDetails } =  require("../../middlewares/authMiddleware")
const { v4: uuidV4 } = require("uuid")
const Sequelize = require("../../models").sequelize
var bcrypt = require("bcrypt")

module.exports = {
    login: async(req, res, next) => {
        var { email, password } = req.body;
        var account = await Account.findOne({ where: { email: email.toLowerCase() }})
      
        if(account == null){
            return res.status(403).send({
                status: "Account does not exist"
            })
        }

        if(!(await bcrypt.compare(password, account.password))){
            return res.status(401).send({
                status: "Incorrect Credentials"
            })
        }
        
        var tokenId = uuidV4();
        var token = jwt.sign({accountId: account.id, tokenId, roles: {vendor: account.isVendor, delivery: account.isDelivery }}, authConfig.authSecret, {
            expiresIn: authConfig.accessTokenDuration // 24 hours
        });
        
        var refreshToken = await RefreshToken.createToken({accountId: account.id}, tokenId)
        
        res.status(200).send({
            status: "Logged In",
	    token,
            refreshToken,
            expiresIn: authConfig.accessTokenDuration,
            account: {...account.dataValues, password: undefined}
        })
    },
    
    signup: async(req, res, next) => {
        var {
            email,
            password,
            firstName,
            lastName,
            username,
            isVendor,
            isAgent,
            isDelivery
        } = req.body;
        email = email.toLowerCase();
        var account = await Account.findOne({ where: { email }})

        if(account){
            return res.status(403).send({
                status: "Email is registered to an existing account"
            })
        }

        var salt = await bcrypt.genSalt(authConfig.saltRounds)
        var hash = await bcrypt.hash(password, salt)

        return Account.create({
            email,
            password: hash,
            firstName,
            lastName,
            username,
            isVendor,
            isAgent,
            isDelivery
        })
        .then(newAccount => res.status(200).send({
            status: "Signed up successfully"
        }))
        .catch(error => {
            console.log(error)
            res.status(401).send({
                status: "Error creating account"
            })
        })
    },
    
    logout: async(req, res, next) => {
        const transaction = await Sequelize.transaction();
        let token = getTokenFromRequest(req)
        let tokenDetails = parseTokenDetails(token)
        console.log("details")
        console.log(tokenDetails)
        var blacklist = await BlacklistedToken.create({
            token: token,
            expires: tokenDetails.exp,
            iat: tokenDetails.iat
        }, {transaction})

        var removeRefresh = await RefreshToken.destroy({
            where: {
                tokenId: tokenDetails.tokenId
            }
        }, {transaction})

        transaction.commit()
        .then(success => res.status(200).send())
        .catch(error => req.status(403).send())
    },

    refreshToken: async(req, res, next) => {
        let { refreshToken } = req.body
        if(!refreshToken){
            return res.status(403).send({
                error: "Refresh Token not provided"
            })
        }
        let refreshTokenEntries = await RefreshToken.findAll({
            where: {
                token: refreshToken
            }
        })

        if(!refreshTokenEntries.length){
            return res.status(403).send({
                status: "Invalid Refresh Token"
            })
        }

        //delete refresh token;

        var refreshTokenEntry = refreshTokenEntries[0]
        var { accountId } = refreshTokenEntry;
        await refreshTokenEntry.destroy()
        
        var newTokenId = uuidV4();
        var account = await Account.findByPk(accountId)
        var token = jwt.sign({email: account.email, tokenId: newTokenId}, authConfig.authSecret, {
            expiresIn: authConfig.accessTokenDuration // 24 hours
        });

        var newRefreshToken = await RefreshToken.createToken({accountId}, newTokenId)
        
        res.status(200).send({
            status: token,
            refreshToken: newRefreshToken
        })
    }
}
