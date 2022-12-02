'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.ProductType, {
        foreignKey: "categoryId",
        as: "productTypes"
      })

      Category.hasOne(models.Category, {
        foreignKey: "parentCategoryId",
        as: "ParentCategory"
      })

      Category.belongsTo(models.Category, {
        foreignKey: "parentCategoryId",
        onDelete: "CASCADE"
      })
    }
  };
  Category.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    totalProducts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};