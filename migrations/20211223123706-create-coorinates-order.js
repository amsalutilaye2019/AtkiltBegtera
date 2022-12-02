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
      queryInterface.addColumn('Orders', 'shippingLatitude',  {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Orders', 'shippingLongitude',  {
        type: Sequelize.FLOAT
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn(
        'Orders',
        'shippingLatitude'
      ),
      queryInterface.removeColumn(
        'Orders',
        'shippingLongitude'
      )
    ])
  }
};
