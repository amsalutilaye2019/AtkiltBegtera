'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.Account, {
        foreignKey: "accountId",
        onDelete: "CASCADE"
      })

      Address.hasMany(models.Order, {
        foreignKey: "shippingAddress",
        as: "shippedOrders"
      })

      Address.hasMany(models.Order, {
        foreignKey: "billingAddress",
        as: "billedOrders"
      })
    }
  };
  Address.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};