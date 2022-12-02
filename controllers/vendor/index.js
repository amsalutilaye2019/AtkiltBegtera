const Vendor = require('../../models').Vendor
const Account = require('../../models').Account

module.exports = {
    getAllVendors: async(req, res, next) => {
        return Vendor.findAll({
            include: Account
        })
        .then(
            vendors => {
                for(var vendor of vendors){
                    vendor.dataValues.lastName = vendor.dataValues.Account.dataValues.lastName
                    vendor.dataValues.firstName = vendor.dataValues.Account.dataValues.firstName
                    vendor.dataValues.Account = undefined
                }
                res.status(200).send(vendors)
            }
        )
        .catch(error => res.status(400).send(error))
    },

    getVendorById: async(req, res, next) => {
        var vendorId = parseInt(req.params.vendorId)
        console.log(Vendor)
        var vendor = await Vendor.findByPk(vendorId)
        if(!vendor){
            return res.status(404).send({
                status: "Vendor doesn't exist"
            })
        }

        var account = await Account.findByPk(vendor.accountId)
        return res.status(200).send({
            firstName: account.dataValues.firstName,
            lastName: account.dataValues.lastName,
            ...vendor.dataValues
        })
    }
}