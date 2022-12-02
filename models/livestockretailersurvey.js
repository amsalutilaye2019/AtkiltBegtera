'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LivestockRetailerSurvey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LivestockRetailerSurvey.hasMany(models.SurveyProduct, {
        foreignKey: "livestockRetailerSurveyId",
        as: "products"
      })

      LivestockRetailerSurvey.belongsTo(models.Account, {
        foreignKey: "filledBy",
        as: "account"
      })
    }
  }
  LivestockRetailerSurvey.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    pricing: DataTypes.STRING,
    customers: DataTypes.STRING,
    liveStockLocation: DataTypes.STRING,
    liveStockLocationReason: DataTypes.STRING,
    seasons: DataTypes.STRING,
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
    modelName: 'LivestockRetailerSurvey',
  });
  return LivestockRetailerSurvey;
};