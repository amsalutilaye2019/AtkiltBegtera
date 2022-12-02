'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.belongsTo(models.Account, {
        foreignKey: "accountId",
        onDelete: "CASCADE"
      })
    }
  }
  Vendor.init({
    address: DataTypes.STRING,
    addressLongitude: DataTypes.FLOAT,
    addressLatitude: DataTypes.FLOAT,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};