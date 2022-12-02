'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtherProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OtherProductType.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE"
      })
    }
  }
  OtherProductType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OtherProductType',
  });
  return OtherProductType;
};