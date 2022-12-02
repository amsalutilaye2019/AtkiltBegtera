'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Address, {
        foreignKey: 'accountId',
        as: "Addresses"
      })

      Account.hasMany(models.Cart, {
        foreignKey: 'accountId',
        as: "carts"
      })


      Account.hasMany(models.Product, {
        foreignKey: 'vendorId',
        as: "vendor"
      })
      Account.hasOne(models.Driver, {
        foreignKey: "accountId",
        as: "driver"
      })
    }
  };
  Account.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVendor: DataTypes.BOOLEAN,
    isDelivery: DataTypes.BOOLEAN,
    isAgent: DataTypes.BOOLEAN,
    isDriverAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};