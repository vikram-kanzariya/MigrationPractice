'use strict';

const { where , Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkUpdate('students' , 
      {
        firstName:"Mayur",
        lastName:"Chavda"
      },
      {
        firstName:"Haresh"
      }
    
   );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  }
};


