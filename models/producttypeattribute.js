'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTypeAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductTypeAttribute.belongsTo(models.Attribute, {
        foreignKey: "attributeId",
        onDelete: "CASCADE"
      })

      ProductTypeAttribute.belongsTo(models.ProductType, {
        foreignKey: "productTypeId",
        onDelete: "CASCADE"
      })

      ProductTypeAttribute.hasMany(models.AttributeOption, {
        foreignKey: "productTypeAttributeId",
        as: "options"
      })
    }
  };
  ProductTypeAttribute.init({
    required: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProductTypeAttribute',
  });
  return ProductTypeAttribute;
};