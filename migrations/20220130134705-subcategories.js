'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addColumn('Categories', 'parentCategoryId',  {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'parentCategoryId',
        }})
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn("Categories", "parentCategoryId")
    ]);
  }
};
