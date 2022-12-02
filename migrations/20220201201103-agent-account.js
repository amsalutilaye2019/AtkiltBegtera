'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    Promise.all([
      queryInterface.addColumn('Accounts', 'isAgent',  {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.removeColumn('Surveys', 'filledBy')
    ])

    return queryInterface.addColumn('Surveys', 'filledBy',  {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Accounts',
        key: 'id',
        as: 'filledBy',
    }})


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    Promise.all([
      queryInterface.removeColumn('Accounts', 'isAgent'),
      queryInterface.removeColumn('Surveys', 'filledBy')
    ])
    return queryInterface.addColumn('Surveys', 'filledBy',  {
      type: Sequelize.STRING
    })
  }
};
