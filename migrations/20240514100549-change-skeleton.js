'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn('Person' , 'username' , { type:DataTypes.STRING });
    
    // await queryInterface.removeColumn('Person' , 'isBetaMember');
    await queryInterface.changeColumn('Person' , 'isBetaMember' , { type:DataTypes.STRING})
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.dropTable('Person')
  }
};
