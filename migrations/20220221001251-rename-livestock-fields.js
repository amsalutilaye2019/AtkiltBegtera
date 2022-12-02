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
      queryInterface.renameColumn('LivestockRetailerSurveys', 'jobTitle', 'jobtitle'),
      queryInterface.renameColumn('LivestockRetailerSurveys', 'customerComposition', 'customers'),
      queryInterface.renameColumn('LivestockRetailerSurveys', 'sellingPriceReason', 'pricing'),
      queryInterface.removeColumn('LivestockRetailerSurveys', 'holidayBased'),
      queryInterface.addColumn('LivestockRetailerSurveys', 'liveStockLocation',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('LivestockRetailerSurveys', 'liveStockLocationReason',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('LivestockRetailerSurveys', 'seasons',  {
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
    return Promise.all([
      queryInterface.renameColumn('LivestockRetailerSurveys', 'jobtitle', 'jobTitle'),
      queryInterface.renameColumn('LivestockRetailerSurveys', 'customers', 'customerComposition'),
      queryInterface.renameColumn('LivestockRetailerSurveys', 'pricing', 'sellingPriceReason'),
      queryInterface.addColumn('LivestockRetailerSurveys', 'holidayBased',  {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.removeColumn('LivestockRetailerSurveys', 'liveStockLocation'),
      queryInterface.removeColumn('LivestockRetailerSurveys', 'liveStockLocationReason'),
      queryInterface.removeColumn('LivestockRetailerSurveys', 'seasons')
      // queryInterface.addColumn('LivestockRetailerSurveys', 'liveStockLocation',  {
      //   type: Sequelize.STRING
      // }),
      // queryInterface.addColumn('LivestockRetailerSurveys', 'liveStockLocationReason',  {
      //   type: Sequelize.STRING
      // })
    ])
  }
};
