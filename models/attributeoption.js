'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributeOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttributeOption.belongsTo(models.ProductTypeAttribute, {
        foreignKey: "productTypeAttributeId",
        onDelete: "CASCADE"
      })
    }
  };
  AttributeOption.init({
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AttributeOption',
  });
  return AttributeOption;
};