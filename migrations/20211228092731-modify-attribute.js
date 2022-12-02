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
      queryInterface.addColumn('Attributes', 'type',  {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Attributes', 'option'),
      queryInterface.removeColumn('Attributes', 'isVisible'),
      queryInterface.removeColumn('Attributes', 'productId')

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
      queryInterface.removeColumn('Attributes', 'type'),
      queryInterface.addColumn('Attributes', 'isVisible',  {
        type: Sequelize.BOOLEAN 
      }),
      queryInterface.addColumn('Attributes', 'option',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Attributes', 'productId',  {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        }})
    ])
  }
};
