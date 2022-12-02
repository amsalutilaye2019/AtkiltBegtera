'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WholesaleSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WholesaleSurvey.hasMany(models.SurveyProduct, {
        foreignKey: "wholesaleSurveyId",
        as: "products"
      })

      WholesaleSurvey.belongsTo(models.Account, {
        foreignKey: "filledBy",
        as: "account"
      })
    }
  }
  WholesaleSurvey.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    weeklySale: DataTypes.FLOAT,
    locationBased: DataTypes.BOOLEAN,
    methodOfDelivery: DataTypes.STRING,
    chargeForDelivery: DataTypes.BOOLEAN,
    parameter: DataTypes.STRING,
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
    modelName: 'WholesaleSurvey',
  });
  return WholesaleSurvey;
};