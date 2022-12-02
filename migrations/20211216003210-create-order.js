'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
      },
      totalTax: {
        type: Sequelize.FLOAT
      },
      totalShipping: {
        type: Sequelize.FLOAT
      },
      paymentMethodTitle: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      shippingMethodTitle: {
        type: Sequelize.STRING
      },
      customerNote: {
        type: Sequelize.STRING
      },
      subTotal: {
        type: Sequelize.FLOAT
      },
      deliveryStatus: {
        type: Sequelize.STRING
      },
      shippingAddress: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'shippingAddress',
        },  
      },
      billingAddress: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'billingAddress',
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};