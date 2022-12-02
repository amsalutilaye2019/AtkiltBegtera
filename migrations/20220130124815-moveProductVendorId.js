'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.removeConstraint("Products", "Products_vendorId_fkey")
    // return await queryInterface.addConstraint('Products', {
    //   fields: ['vendorId'],
    //   type: 'foreign key',
    //   name: 'Products_vendorId_Vendor_fkey',
    //   references: { //Required field
    //     table: 'Vendors',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
    await queryInterface.removeColumn("Products", "vendorId")
    return await queryInterface.addColumn("Products", "vendorId", {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Vendors',
        key: 'id',
        as: 'vendorId',
      },  
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn("Products", "vendorId")
     return await queryInterface.addColumn("Products", "vendorId", {
       type: Sequelize.INTEGER,
       onDelete: 'CASCADE',
       references: {
         model: 'Accounts',
         key: 'id',
         as: 'vendorId',
       },  
     })
  }
};
