const Product = require('../../models').Product;
const ProductType = require('../../models').ProductType;
const ProductImage = require('../../models').ProductImage;
const ProductItemAttribute = require('../../models').ProductItemAttribute;
const ProductTypeAttribute = require('../../models').ProductTypeAttribute;
const Attribute = require('../../models').Attribute;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require("../../models").sequelize;

module.exports = {
    getAllProducts: async(req, res, next)=>{
        return Product
        .findAll({
            include: [{
                model: ProductItemAttribute,
                as: "attributes",
                include: {
                    model: ProductTypeAttribute,
                    include: {
                        model: Attribute
                    }
                }
            },{
                model: ProductType,
                // as: "productType",
            },
            {
                model: ProductImage,
                as: "images"
            }]
        })
       
            
        .then(products => {
            var productsResponse = [];
            products.forEach(element => {
            //    for(var i = 0; i < element.images.length; i++){
            //        element.images[i] = element.images[i].resourceUrl
            //    }
                var dataValue = element.dataValues;
                console.log("THIS IS THE SINGLE PRODUCT: ", dataValue)
                if(dataValue.ProductType && dataValue.ProductType.categoryId){
                    dataValue.categoryId = dataValue.ProductType.categoryId
                    dataValue.ProductType = undefined
                    productsResponse.push(dataValue)
                }
            });
            res.status(200).send(productsResponse)    
        })
        .catch(error => res.status(400).send(error));
    },

    getProductById: async(req, res, next) => {
        return Product
        .findByPk(
            req.params.id,
            {
            include: [{
                model: Attribute,
                as: "attributes"
            },{
                model: ProductImage,
                as: "images"
            }]
        })
        .then(products => {
            console.log("THIS IS THE PRODUCT, ", products)
            if(products == null){
                res.status(404).send({
                    status: "Item not found"
                })
            }
            res.status(200).send(products)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        });
    },

    createProduct: async(req, res, next) => {
        console.log("CREATE REQUEST: ", req)
        // var product = await Product.create({...req.body, id: undefined})
        var productTypeId = req.params.productTypeId;
        var transaction =  await sequelize.transaction();
       var isVendor=req.userDetails.isVendor
        console.log("productType id",productTypeId);
        if(!isVendor){
            return res.status(401).send({
                
                "status": "unauthorized"
            })
        }

        // var productTypeAttributes =
         await ProductTypeAttribute.findAll({
            where: {
                productTypeId:productTypeId
                //  
            }
        })
        
        var productModel = await Product.create({
            ...req.body,
            id: undefined,
            productTypeId: productTypeId,
            // id: req.userDetails.id
            // req.userDetails.id
        }, {transaction})
        .catch(error => res.status(400).send(error));
    


        if(req.body.attributes){
            var attrs = req.body.attributes
            // console.log("HERE IS THE MAP: ", map)
            var attributes = await ProductItemAttribute.bulkCreate(
                attrs.map(attr => {
                    // attr.productId = productModel.id
                    return {
                        productId: productModel.id,
                        productTypeAttributeId: attr.productTypeAttributeId,
                        value: attr.value
                    };
                })
            , {transaction})
            // await attributes.save()
        }

        if(req.body.images){
            var productImages  = req.body.images;
            var images = await ProductImage.bulkCreate(
                productImages.map(attr => {
                     return {
                        resourceUrl: attr,
                        productId: productModel.id
                    };
                })
            , {transaction})
        }

        return transaction.commit()
        .then(product => {
            return Product.findByPk(productModel.id, {
            include: [
                {
                model: ProductItemAttribute,
                as: "attributes",
                include: {
                    model: ProductTypeAttribute,
                    include: {
                        model: Attribute
                    }
                }
            },
            {
                model: ProductImage,
                as: "images"
            }]
        }).then(product => res.status(200).send(product))
        })
        .catch(error => res.status(400).send(error));
    },

    searchProduct: async(req, res, next) => {
        const search  = req.params.query;
        // return res.status(200).send("WEEE")
        Product.findAll({
            where: {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            include: [
                {
                model: ProductItemAttribute,
                as: "attributes",
                include: {
                    model: ProductTypeAttribute,
                    include: {
                        model: Attribute
                    }
                }
            },
            {
                model: ProductImage,
                as: "images"
            }]
        })
        .then(products => res.status(200).send(products))
        .catch(error => res.status(500).send())
    },

    updateProduct: async(req, res, next) => {
        // var { productId } = req.body;
        var transaction = await sequelize.transaction();
        
        var {productTypeId, productId } = req.params
        productTypeId = parseInt(productTypeId)
        productId = parseInt(productId)

        var savedProduct = await Product.findByPk(productId)

        if(savedProduct.vendorId != req.userDetails.id){
            return req.status(401).send({
                status: "Unauthorized"
            })
        }

        savedProduct = {
            ...savedProduct.dataValues,
            ...req.body,
            productTypeId: productTypeId,
            vendorId: req.userDetails.id
        }

        var productModel = await Product.update(
            savedProduct,
            {
            where: {
                id: productId
            }
        }, {transaction})

        var deleteAttributes = await ProductItemAttribute.destroy({
            where: {
                 productId: productId
            }
        }, {transaction});

        var deleteImages = await ProductImage.destroy({
            where: {
                productId: productId
            }
        }, {transaction})

        if(req.body.attributes){
            var attrs = req.body.attributes
            // console.log("HERE IS THE MAP: ", map)
            var attributes = await ProductItemAttribute.bulkCreate(
                attrs.map(attr => {
                    // attr.productId = productModel.id
                    return {
                        productId: productId,
                        productTypeAttributeId: attr.productTypeAttributeId,
                        value: attr.value
                    };
                })
            , {transaction})
            // await attributes.save()
        }

        if(req.body.images){
            var productImages  = req.body.images;
            var images = await ProductImage.bulkCreate(
                productImages.map(attr => {
                     return {
                        resourceUrl: attr,
                        productId: productId
                    };
                })
            , {transaction})
        }

        return transaction.commit()
        .then(product => {
            return Product.findByPk(productId, {
            include: [
                {
                model: ProductItemAttribute,
                as: "attributes",
                include: {
                    model: ProductTypeAttribute,
                    include: {
                        model: Attribute
                    }
                }
            },
            {
                model: ProductImage,
                as: "images"
            }]
        }).then(product => res.status(200).send(product))
        })
        .catch(error => res.status(400).send(error));
    }
}
