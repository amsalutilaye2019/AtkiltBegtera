'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WholesaleSurveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weeklySale: {
        type: Sequelize.FLOAT
      },
      locationBased: {
        type: Sequelize.BOOLEAN
      },
      methodOfDelivery: {
        type: Sequelize.STRING
      },
      chargeForDelivery: {
        type: Sequelize.BOOLEAN
      },
      parameter: {
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
    await queryInterface.dropTable('WholesaleSurveys');
  }
};