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
        'Products',
        'categoryId'
      ),
      queryInterface.addColumn('Products', 'productTypeId',  {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'ProductTypes',
          key: 'id',
          as: 'productTypeId',
      }})
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
        'Products',
        'productTypeId'
      ),
      queryInterface.addColumn('Products', 'categoryId',  {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
      }})
    ])
  }
};
