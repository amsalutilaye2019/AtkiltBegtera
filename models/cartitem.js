'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "CASCADE"
      })

      CartItem.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "SET NULL"
      })
    }
  };
  CartItem.init({
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};