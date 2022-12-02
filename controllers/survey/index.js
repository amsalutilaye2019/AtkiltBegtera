const Category = require('../../models').Category;
const Survey = require('../../models').Survey;
const VegetableRetailerSurvey = require('../../models').VegetableRetailerSurvey;
const LivestockRetailerSurvey = require('../../models').LivestockRetailerSurvey;
const WholesaleSurvey = require('../../models').WholesaleSurvey;
const Sequelize = require("../../models").sequelize
const ProductType = require('../../models').ProductType;
const SurveyProduct = require('../../models').SurveyProduct;
const requestServices = require("../../services/request")


module.exports = {
    getAllSurveys: async(req, res, next)=>{
        return Survey.findAll({})
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
    },
    
    getCategoryById: async(req, res, next) => {
        console.log("Called")
        res.send({
            "status" : `Category ${req.params.id}`
        })
    },
    
    fillSurvey: async(req, res, next) => {
        var userId = await requestServices.getUserId(req)
        var survey = await Survey.create({...req.body, filledBy: userId})
        return survey.save()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
    },
    
    wholesalerSurvey: async(req, res, next) => {
        const transaction = await Sequelize.transaction()
        var userId = await requestServices.getUserId(req)
        var survey = await WholesaleSurvey.create({...req.body, filledBy: userId}, {transaction})
        var products = req.body.products

        var surveyProducts = products.map(product => {

            var productModel = {
                ...product,
                wholesaleSurveyId: survey.id
            }
            console.log(productModel)
            return productModel
        })

        await SurveyProduct.bulkCreate( surveyProducts, {transaction})

        return transaction.commit()
        .then( result => res.status(200).send({
            ...survey.dataValues,
            products: products
        }))
        .catch( error => res.status(401).send())
    },

    vegetableSurvey: async(req, res, next) => {
        const transaction = await Sequelize.transaction()
        var userId = await requestServices.getUserId(req)
        var survey = await VegetableRetailerSurvey.create({...req.body, filledBy: userId}, {transaction})
        var products = req.body.products

        var surveyProducts = products.map(product => {

            var productModel = {
                ...product,
                vegetableRetailerSurveyId: survey.id
            }
            console.log(productModel)
            return productModel
        })

        await SurveyProduct.bulkCreate( surveyProducts, {transaction})

        return transaction.commit()
        .then( result => res.status(200).send({
            ...survey.dataValues,
            products: products
        }))
        .catch( error => res.status(401).send())
    },

    livestockSurvey: async(req, res, next) => {
        console.log(req.body)
        const transaction = await Sequelize.transaction()
        var userId = await requestServices.getUserId(req)
        var survey = await LivestockRetailerSurvey.create({...req.body, filledBy: userId}, {transaction})
        var products = req.body.products ?? []

        if(products.length){
            var surveyProducts = products.map(product => {
    
                var productModel = {
                    ...product,
                    livestockRetailerSurveyId: survey.id
                }
                console.log(productModel)
                return productModel
            })
            
            await SurveyProduct.bulkCreate( surveyProducts, {transaction})
        }


        return transaction.commit()
        .then( result => res.status(200).send({
            ...survey.dataValues,
            products: products
        }))
        .catch( error => res.status(401).send())
    },


    deleteWholesalerSurvey: async(req, res, next) => {
        const transaction = await Sequelize.transaction()
        var userId = await requestServices.getUserId(req)
        var surveyId = parseInt(req.params.id)
        var survey = await WholesaleSurvey.destroy({
            where: {
                id: surveyId
            }
        }, {transaction})

        var survey = await SurveyProduct.destroy({
            where: {
                wholesaleSurveyId: surveyId
            }
        }, {transaction})

        return transaction.commit()
        .then( result => res.status(200).send(result))
        .catch( error => res.status(401).send())
    },

    deleteVegetableSurvey: async(req, res, next) => {
        const transaction = await Sequelize.transaction()
        var userId = await requestServices.getUserId(req)
        var surveyId = parseInt(req.params.id)
        var survey = await VegetableRetailerSurvey.destroy({
            where: {
                id: surveyId
            }
        }, {transaction})

        var survey = await SurveyProduct.destroy({
            where: {
                vegetableRetailerSurveyId: surveyId
            }
        }, {transaction})

        return transaction.commit()
        .then( result => res.status(200).send(result))
        .catch( error => res.status(401).send())
    },

    deleteLivestockSurvey: async(req, res, next) => {
        const transaction = await Sequelize.transaction()
        var userId = await requestServices.getUserId(req)
        var surveyId = parseInt(req.params.id)
        var survey = await LivestockRetailerSurvey.destroy({
            where: {
                id: surveyId
            }
        }, {transaction})

        var survey = await SurveyProduct.destroy({
            where: {
                livestockRetailerSurveyId: surveyId
            }
        }, {transaction})

        return transaction.commit()
        .then( result => res.status(200).send(result))
        .catch( error => res.status(401).send())
    },

    updateWholesalerSurvey: async(req, res, next) => {
    },

    updateVegetableSurvey: async(req, res, next) => {
    },

    updateLivestockSurvey: async(req, res, next) => {
    },

    readWholesalerSurvey: async(req, res, next) => {
        WholesaleSurvey.findAll({
            include: SurveyProduct
        })
        .then(result => res.status(200).send(result))
        .catch(error => res.status(401).send(error))
    },

    readVegetableSurvey: async(req, res, next) => {
        VegetableRetailerSurvey.findAll({
            include: {
                model: SurveyProduct,
                as: "Products"
            }
        })
        .then(result => res.status(200).send(result))
        .catch(error => res.status(401).send())
    },

    readLivestockSurvey: async(req, res, next) => {
        VegetableRetailerSurvey.findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(401).send())
    },
}
