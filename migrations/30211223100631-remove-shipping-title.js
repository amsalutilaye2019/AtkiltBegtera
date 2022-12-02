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
      queryInterface.removeColumn(
        'Orders',
        'shippingMethodTitle'
      ),
      queryInterface.removeColumn(
        'Orders',
        'paymentMethodTitle'
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return Promise.all[
      queryInterface.addColumn('Orders', 'billingAddress',  {
       type: Sequelize.STRING
     }),
     queryInterface.addColumn('Orders', 'shippingAdress',  {
       type: Sequelize.STRING
     })
    ]
  }
};
