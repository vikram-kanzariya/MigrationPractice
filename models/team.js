'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
 
    static associate(models) {
      // define association here
      team.hasMany(models.player , { foreignKey:'teamId' });
    }
  }
  team.init({
    teamName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'team',
  });
  return team;
};