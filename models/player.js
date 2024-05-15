'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {

    static associate(models) {
      // define association here
      player.belongsTo(models.team , { foreignKey:'teamId' })
    }
  }
  player.init({
    teamId: DataTypes.STRING,
    playerName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};