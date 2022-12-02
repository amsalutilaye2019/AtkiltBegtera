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
      queryInterface.addColumn('Surveys', 'productType',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Surveys', 'averageRevenue',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Surveys', 'customerLocation',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Surveys', 'averageDemandPerWeek',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Surveys', 'mostOrderedProduct',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Surveys', 'averageDeliveryFee',  {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Surveys', 'usualSupplier',  {
        type: Sequelize.STRING
      }),
    ]);

    /*

    productType: DataTypes.STRING,
    averageRevenue: DataTypes.STRING,
    customerLocation: DataTypes.STRING,
    averageDemandPerWeek: DataTypes.STRING,
    mostOrderedProduct: DataTypes.STRING,
    AverageDeliveryFee: DataTypes.STRING,
    usualSuppllier: DataTypes.STRING,
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Surveys', 'productType'),
      queryInterface.removeColumn('Surveys', 'averageRevenue'),
      queryInterface.removeColumn('Surveys', 'customerLocation'),
      queryInterface.removeColumn('Surveys', 'averageDemandPerWeek'),
      queryInterface.removeColumn('Surveys', 'mostOrderedProduct'),
      queryInterface.removeColumn('Surveys', 'averageDeliveryFee'),
      queryInterface.removeColumn('Surveys', 'usualSupplier'),
    ])
  }
};
