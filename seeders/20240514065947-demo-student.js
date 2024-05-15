'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
   const data = await queryInterface.bulkInsert('students' , [
    {
    firstName:"Vikram",
    lastName:"Kanzariiya",
    age:21,
    address:"Halvad",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
    {
    firstName:"Alpesh",
    lastName:"Prajapati",
    age:22,
    address:"Dhanera",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
    {
    firstName:"Hardev",
    lastName:"Zaala",
    age:20,
    address:"Surendranagar",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
    {
    firstName:"Rajkumar",
    lastName:"Koradiya",
    age:23,
    address:"Junagadh",
    createdAt: new Date(),
    updatedAt: new Date(),
   },

  ])

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('students' , null , {});
  }
};
