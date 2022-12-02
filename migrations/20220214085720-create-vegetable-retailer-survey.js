'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VegetableRetailerSurveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weeklyPurchase: {
        type: Sequelize.FLOAT
      },
      distanceOfSupplier: {
        type: Sequelize.INTEGER
      },
      MethodsToAcquireGoods: {
        type: Sequelize.STRING
      },
      purchaseFrequency: {
        type: Sequelize.INTEGER
      },
      timeToDelivery: {
        type: Sequelize.FLOAT
      },
      methodOfDelivery: {
        type: Sequelize.STRING
      },
      deliveryCost: {
        type: Sequelize.FLOAT
      },
      factorOfDeliveryCost: {
        type: Sequelize.STRING
      },
      paymentCase1: {
        type: Sequelize.STRING
      },
      paymentCase2: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      locationLatitude: {
        type: Sequelize.FLOAT
      },
      locationLongitude: {
        type: Sequelize.FLOAT
      },
      address: {
        type: Sequelize.STRING
      },
      interestedInPlatform: {
        type: Sequelize.BOOLEAN
      },
      interestedInAggregation: {
        type: Sequelize.BOOLEAN
      },
      interestedInDelivery: {
        type: Sequelize.BOOLEAN
      },
      willingToUse: {
        type: Sequelize.BOOLEAN
      },
      filledBy: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Accounts',
          key: 'id',
          as: 'filledBy',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VegetableRetailerSurveys');
  }
};