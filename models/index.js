'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize , DataTypes , Model } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.user = require('./user')(sequelize , DataTypes , Model);
db.user = require('./user')(sequelize , DataTypes );
db.contact = require('./contact')(sequelize , DataTypes );

db.user.hasOne(db.contact);
db.contact.belongsTo(db.user , { foreignKey:'userId' });

db.player = require('./player')(sequelize , DataTypes );
db.team = require('./team')(sequelize , DataTypes );

db.team.hasMany(db.player);
db.player.belongsTo(db.team , { foreignKey:'teamId' });

module.exports = db;