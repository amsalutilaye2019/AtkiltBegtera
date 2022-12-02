const Product = require('../../models').Product;
const ProductType = require('../../models').ProductType;
const ProductTypeAttribute = require('../../models').ProductTypeAttribute;
const Category = require('../../models').Category;
const ProductImage = require('../../models').ProductImage;
const Attribute = require('../../models').Attribute;
const AttributeOption = require('../../models').AttributeOption;

module.exports = {
    getAllProductTypes: async(req, res, next)=>{
        return ProductType
        .findAll({
            include: [{
                model: Category,
                as: 'Category'
            }]
        })
        .then(products => {
            var response = products.map(element => element.dataValues)
            response.forEach(element => {
                element.category = element.Category;
                element.Category = undefined;
                console.log(element.categoryId)
            });
            console.log(response)
            res.status(200).send(response)
        
        })
        .catch(error => res.status(400).send(error));
    },

    getProductTypeById: async(req, res, next) => {
        var productId = req.params.id;
        return ProductType
        .findByPk(
            productId,
            {
            // include: ProductTypeAttribute
            // [{
                // model: ProductTypeAttribute,
                // as: "productTypeAttributes"
            // }]
        })
        .then(async products => {
            
            console.log("THIS IS THE PRODUCT, ", products)
            if(products == null){
                res.status(404).send({
                    status: "Item not found"
                })
            }
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
                res.status(200).send({
                    ...products.dataValues,
                    attributes: flattendAttributes
                })

            })
        })
        .catch(error => res.status(400).send(error));
    },

    createProductType: async(req, res, next) => {
        if(!req.body.name){
            return res.status(400).send({
                error: "Malformed request body"
            })
        }
        var category = await Category.findByPk(req.body.categoryId)
        if(category == null){
            return res.status(400).send({
                error: "Category does not exist"
            })
        }

        var productType = await ProductType.create(req.body)
        productType.save()
        .then(productType => res.status(200).send(productType))
        .catch(error => res.status(400).send(error))
    },


    deleteProductType: async(req, res, next) => {

    },


}
