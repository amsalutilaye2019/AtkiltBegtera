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
        'shippingAddress'
      ),
      queryInterface.removeColumn(
        'Orders',
        'billingAddress'
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
     return Promise.all([
      queryInterface.addColumn('Orders', 'shippingAddress',  {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'shippingAddress',
        }}),
        queryInterface.addColumn('Orders', 'billingAddress',  {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references: {
            model: 'Addresses',
            key: 'id',
            as: 'billingAddress',
          }})
    ]);
  }
};
