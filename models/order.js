'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderedItem, {
        foreignKey: "orderId",
        as: "products"
      })

      Order.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "SET NULL"
      })

      Order.hasMany(models.DeliveryResponse, {
        foreignKey: "orderId",
        as: "deliveryResponses"
      })
    }
  };
  Order.init({
    status: DataTypes.STRING,
    total: DataTypes.FLOAT,
    subTotal: DataTypes.FLOAT,
    totalTax: DataTypes.FLOAT,
    totalShipping: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    customerNote: DataTypes.STRING,
    deliveryStatus: DataTypes.STRING,
    shippingAddress: DataTypes.STRING,
    shippingLatitude: DataTypes.FLOAT,
    shippingLongitude: DataTypes.FLOAT,
    deliveryDate: DataTypes.STRING,
    billingAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};