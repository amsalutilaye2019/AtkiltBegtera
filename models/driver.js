'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.Account, {
        onDelete: "CASCADE",
      foreignKey: "accountId"
      })

      Driver.hasMany(models.DeliveryResponse, {
        foreignKey: "driverId",
        as: "deliveryResponses"
      })
    }


  };
  Driver.init({
    longitudePosition: DataTypes.FLOAT,
    latitudePosition: DataTypes.FLOAT,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Driver',
  });

  return Driver;
};