const Product = require('../../models').Product;
const ProductType = require('../../models').ProductType;
const Category = require('../../models').Category;
const ProductImage = require('../../models').ProductImage;
const ProductTypeAttribute = require('../../models').ProductTypeAttribute;
const AttributeOption = require('../../models').AttributeOption;
const Attribute = require('../../models').Attribute;
const sequelize = require("../../models").sequelize

module.exports = {
    getAttributes: async(req, res, next)=>{
        // return Attribute.findAll({

        // })
        // .then(result => res.status(200).send(result))
        // .catch(error => res.status(400).send(error));
        const productId = req.params.id
        const attributes = await ProductTypeAttribute.findAll({
            where: {
                productTypeId: productId
            },
            include: [{
                model: AttributeOption,
                as: "options"
            },{
                model: Attribute,
                // as: ""
            }]
        })
        .then(attributes => {
            console.log("Attributes before flatening: ", attributes)
            const flattendAttributes = [];
            attributes.forEach(element => {
                flattendAttributes.push({
                    ...element.dataValues,
                    name: element.dataValues.Attribute.name,
                    type: element.dataValues.Attribute.type,
                    Attribute: undefined,
                })
            })
            console.log("ATTRIBUTES: ", attributes)
            res.status(200).send(
                flattendAttributes
            )

        })
    },

    assignAttributes: async(req, res, next) => {
        var attributes = req.body.attributes;
        attributes = attributes.map(element => {return {...element, productTypeId: parseInt(req.params.id)}})
        // var attributeModels = [];
        const transaction = await sequelize.transaction();
        
        try{
            var createdAttributes = []
            await Promise.all(attributes.map(async(element) => {
                var attributeModel = await ProductTypeAttribute.create({...element, productTypeId: parseInt(req.params.id)}, {transaction})
                // var optionModel = await AttributeOption.create(option)
                console.log(attributeModel.dataValues)
                if(element.options){
                    var options = element.options.map(element => { 
                        return {
                            productTypeAttributeId: attributeModel.id,
                            value: element
                        }
                    })
                    console.log("AATTRR OPOTIONS: ",options)
                    var options = await AttributeOption.bulkCreate(options, {transaction: transaction})
                    createdAttributes.push({
                        ...attributeModel.dataValues,
                        options
                    })
                }
                // res.status(200).send(attributeModel)
                // return transaction.commit()
                // .then(_ => res.status(200).send(attrs))    
                // .catch(error => res.status(400).send(error))
                console.log("Done")
            }))
            console.log("Got here")
            transaction.commit()
            .then(_ => res.status(200).send({
                createdAttributes
            }))
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }
    }
}