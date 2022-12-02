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
      queryInterface.addColumn('VegetableRetailerSurveys', 'name',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('VegetableRetailerSurveys', 'email',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('VegetableRetailerSurveys', 'phone',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('VegetableRetailerSurveys', 'jobTitle',  {
        type: Sequelize.STRING
      }),

      queryInterface.addColumn('LivestockRetailerSurveys', 'name',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('LivestockRetailerSurveys', 'email',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('LivestockRetailerSurveys', 'phone',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('LivestockRetailerSurveys', 'jobTitle',  {
        type: Sequelize.STRING
      }),

      queryInterface.addColumn('WholesaleSurveys', 'name',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('WholesaleSurveys', 'email',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('WholesaleSurveys', 'phone',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('WholesaleSurveys', 'jobTitle',  {
        type: Sequelize.STRING
      })

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.removeColumn('VegetableRetailerSurveys', 'name'),
    queryInterface.removeColumn('VegetableRetailerSurveys', 'email'),
    queryInterface.removeColumn('VegetableRetailerSurveys', 'phone'),
    queryInterface.removeColumn('VegetableRetailerSurveys', 'jobTitle'),

    queryInterface.removeColumn('LivestockRetailerSurveys', 'name'),
    queryInterface.removeColumn('LivestockRetailerSurveys', 'email'),
    queryInterface.removeColumn('LivestockRetailerSurveys', 'phone'),
    queryInterface.removeColumn('LivestockRetailerSurveys', 'jobTitle'),

    queryInterface.removeColumn('WholesaleSurveys', 'name'),
    queryInterface.removeColumn('WholesaleSurveys', 'email'),
    queryInterface.removeColumn('WholesaleSurveys', 'phone'),
    queryInterface.removeColumn('WholesaleSurveys', 'jobTitle')
  }
};
