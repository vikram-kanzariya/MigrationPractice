'use strict';

const { where } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('students' , 
   
    { address:"Bharuch" }
   )
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('students', null, {});
  }
};
