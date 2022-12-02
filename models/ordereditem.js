'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderedItem.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "SET NULL"
      })


      OrderedItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        onDelete: "CASCADE"
      })
    }
  };
  OrderedItem.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderedItem',
  });
  return OrderedItem;
};