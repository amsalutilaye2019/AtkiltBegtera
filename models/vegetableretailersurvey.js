'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VegetableRetailerSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VegetableRetailerSurvey.hasMany(models.SurveyProduct, {
        foreignKey: "vegetableRetailerSurveyId",
        as: "products"
      })

      VegetableRetailerSurvey.belongsTo(models.Account, {
        foreignKey: "filledBy",
        as: "account"
      })
    }
  }
  VegetableRetailerSurvey.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    weeklyPurchase: DataTypes.FLOAT,
    distanceOfSupplier: DataTypes.INTEGER,
    MethodsToAcquireGoods: DataTypes.STRING,
    purchaseFrequency: DataTypes.INTEGER,
    timeToDelivery: DataTypes.FLOAT,
    methodOfDelivery: DataTypes.STRING,
    deliveryCost: DataTypes.FLOAT,
    factorOfDeliveryCost: DataTypes.STRING,
    paymentCase1: DataTypes.STRING,
    paymentCase2: DataTypes.STRING,
    notes: DataTypes.STRING,
    locationLatitude: DataTypes.FLOAT,
    locationLongitude: DataTypes.FLOAT,
    address: DataTypes.STRING,
    interestedInPlatform: DataTypes.BOOLEAN,
    interestedInAggregation: DataTypes.BOOLEAN,
    interestedInDelivery: DataTypes.BOOLEAN,
    willingToUse: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'VegetableRetailerSurvey',
  });
  return VegetableRetailerSurvey;
};