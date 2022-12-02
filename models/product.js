'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasMany(models.OrderedItem, {
      //   foreignKey: "productId",
      //   as: "orders"
      // })
      
      // Product.belongsTo(models.Category, {
      //   foreignKey: "categoryId",
      //   onDelete: "CASCADE"
      // })

      Product.belongsTo(models.ProductType, {
        foreignKey: "productTypeId",
        onDelete: "CASCADE"
      })

      Product.belongsTo(models.Account, {
        foreignKey: "vendorId",
        onDelete: "CASCADE"
      })

      // Product.hasMany(models.Attribute, {
      //   foreignKey: "productId",
      //   as: "attributes"
      // })

      Product.hasMany(models.ProductImage, {
        foreignKey: "productId",
        as: "images"
      })

      Product.hasMany(models.ProductItemAttribute, {
        foreignKey: "productId",
        as: "attributes"
      })
    }
  };
  Product.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    permaLink: DataTypes.STRING,
    price: DataTypes.FLOAT,
    inStock: DataTypes.BOOLEAN,
    totalSales: DataTypes.FLOAT,
    stockQuantity: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};