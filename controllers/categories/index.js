const Category = require('../../models').Category;
const Product = require('../../models').Product;
const ProductType = require('../../models').ProductType;
const OtherProductType = require('../../models').OtherProductType;


module.exports = {
    getAllCategories: async(req, res, next)=>{
        return Category.findAll({
            // include: [{
            //     model: ProductType,
            //     // as: "Products"
            // }]
            include: {
                all: true,
                nested: false
            }
            // include: ProductType
        })
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
    },

    getCategoryById: async(req, res, next) => {
        console.log("Called")
        res.send({
            "status" : `Category ${req.params.id}`
        })
    },

    createCategory: async(req, res, next) => {
        var category = await Category.create(req.body)
        return category.save()
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));

    },

    createOtherProductType: async(req, res, next) => {
        var categoryId = req.params.categoryId;
        var name = req.body.name

        var newProduct = OtherProductType.create({
            categoryId,
            name
        })
        .then(product => res.status(200).send(product))
        .catch(error => res.status(400).send())
    },

    getProductTypesForCategory: async(req, res, next) => {
        var categoryId = req.params.categoryId;
        var productTypes = await ProductType.findAll({
            where: {
                categoryId
            }
        })
        var otherProductTypes = await OtherProductType.findAll({
            where: {
                categoryId
            }
        })

        return res.status(200).send({
            productTypes,
            otherProductTypes
        })
    },

    getAllProductTypes: async(req, res, next) => {
        var categoryId = req.params.categoryId;
        var productTypes = await ProductType.findAll({})
        var otherProductTypes = await OtherProductType.findAll({})

        return res.status(200).send({
            productTypes,
            otherProductTypes
        })
    }
}
