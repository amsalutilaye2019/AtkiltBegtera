'use strict';
const { response } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeliveryResponse.belongsTo(models.Order, {
        onDelete: "CASCADE",
        foreignKey: "orderId"
      })

      DeliveryResponse.belongsTo(models.Driver, {
        foreignKey: "driverId",
        onDelete: "SET NULL"
      })
    }
  };
  DeliveryResponse.init({
    response: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DeliveryResponse',
  });


  DeliveryResponse.rejectDeliveryRequest = async (orderId, driverId) => {
    return await DeliveryResponse.create({
      orderId,
      driverId,
      response: "REJECTED"
    })
  }

  DeliveryResponse.acceptDeliveryRequest = async (orderId, driverId) => {
    return await DeliveryResponse.create({
      orderId,
      driverId,
      response: "ACCEPTED"
    })
  }

  DeliveryResponse.cancelDeliveryRequest = async (responseId) => {
    var response = await DeliveryResponse.findByPk(responseId)
    console.log("RESONSEEEEEE: ", response)
    response.response = "CANCELED"
    return await response.save()
  }

  DeliveryResponse.isRejected = (deliveryResponse) => {
    return deliveryResponse.response == "REJECTED"
  }

  DeliveryResponse.isAccepted = (deliveryResponse) => {
    return deliveryResponse.response == "ACCEPTED"
  }

  return DeliveryResponse;
};