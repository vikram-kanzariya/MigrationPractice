'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      playerName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addColumn('players' , 'teamId' , {
        
        // references:'teams' , key:'id'
        type:Sequelize.INTEGER , 
        allowNull:false,
        references: { model:'teams' , key:'id' }
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};