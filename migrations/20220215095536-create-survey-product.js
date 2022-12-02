'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SurveyProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topSold: {
        type: Sequelize.BOOLEAN
      },
      productTypeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'ProductTypes',
          key: 'id',
          as: 'productTypes',
        },
      },
      otherProductTypeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'OtherProductTypes',
          key: 'id',
          as: 'otherProductTypes',
        },
      },
      vegetableRetailerSurveyId : {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'VegetableRetailerSurveys',
          key: 'id',
          as: 'vegetableRetailerSurveys',
        },
      },
      wholesaleSurveyId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'WholesaleSurveys',
          key: 'id',
          as: 'wholesaleSurveys',
        },
      },
      livestockRetailerSurveyId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'LivestockRetailerSurveys',
          key: 'id',
          as: 'livestockRetailerSurveys',
        },
      },
      topVolume: {
        type: Sequelize.BOOLEAN
      },
      seasonal: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('SurveyProducts');
  }
};