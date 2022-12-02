'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addColumn('Accounts', 'password',  {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn('Accounts', 'token'),
      queryInterface.removeColumn('Accounts', 'cookie'),
      queryInterface.removeColumn('Accounts', 'userUrl'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.addColumn('Accounts', 'cookie',  {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Accounts', 'userUrl',  {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Accounts', 'token',  {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn('Accounts', 'password'),
    ]);
  }
};
