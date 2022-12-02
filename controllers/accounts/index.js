const Account = require('../../models').Account;

module.exports = {
    getAllAccounts: async(req, res, next)=>{
        return Account
            .findAll()
            .then(accounts => res.status(200).send(accounts))
            .catch(error => res.status(400).send(error));
    },

    getAccountbyId: async(req, res, next) => {
        res.send({
            "status" : `Success ${req.params.id}`
        })
    },

    createAccount: async(req, res, next) => {
        var account = await Account.create(req.body)
        return account.save()
        .then(accounts => res.status(200).send(accounts))
        .catch(error => res.status(400).send(error));

    }
}