'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Survey.belongsTo(models.Account, {
        foreignKey: "filledBy",
        onDelete: "SET NULL"
      })
    }
  };
  Survey.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    businessName: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    addressLatitude: DataTypes.FLOAT,
    addressLongitude: DataTypes.FLOAT,
    productType: DataTypes.STRING,
    averageRevenue: DataTypes.STRING,
    customerLocation: DataTypes.STRING,
    averageDemandPerWeek: DataTypes.STRING,
    mostOrderedProduct: DataTypes.STRING,
    averageDeliveryFee: DataTypes.STRING,
    usualSupplier: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};