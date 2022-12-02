'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurveyProduct.belongsTo(models.VegetableRetailerSurvey, {
        foreignKey: "vegetableRetailerSurveyId",
        onDelete: "CASCADE"
      })

      SurveyProduct.belongsTo(models.LivestockRetailerSurvey, {
        foreignKey: "livestockRetailerSurveyId",
        onDelete: "CASCADE"
      })

      SurveyProduct.belongsTo(models.WholesaleSurvey, {
        foreignKey: "wholesaleSurveyId",
        onDelete: "CASCADE"
      })

      SurveyProduct.belongsTo(models.OtherProductType, {
        foreignKey: "otherProductTypeId",
        onDelete: "CASCADE"
      })

      SurveyProduct.belongsTo(models.ProductType, {
        foreignKey: "productTypeId",
        onDelete: "CASCADE"
      })
    }
  }
  SurveyProduct.init({
    topSold: DataTypes.BOOLEAN,
    topVolume: DataTypes.BOOLEAN,
    seasonal: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SurveyProduct',
  });
  return SurveyProduct;
};