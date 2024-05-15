'use strict';
const { Model , sequelize , DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models){
      User.hasOne(models.Contact , { foreignKey:'userId' })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });

  
  return User;
};