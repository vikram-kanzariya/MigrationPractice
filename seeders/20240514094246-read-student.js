'use strict';

const { Model } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   const data = await queryInterface.find('students' , {
    where:{ firstName:"Vikram" },
    },
  ['firstName']
  );

  //   const data = await students.findAll({ where:{ firstName:"Vikram" }});
  //   console.log("FetchedRow: " , data);
  
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('students', null, {});
  }
};
