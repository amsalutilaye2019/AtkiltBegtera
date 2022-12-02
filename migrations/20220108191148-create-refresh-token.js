'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RefreshTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tokenId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iat: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      expires: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Accounts',
          key: 'id',
          as: 'accountId',
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
    await queryInterface.dropTable('RefreshTokens');
  }
};