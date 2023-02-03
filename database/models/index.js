const {Sequelize,Model,DataTypes} = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', null, {
  host: '127.0.0.1',
  dialect: 'postgres',
});
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.Player= require('./player')(sequelize,DataTypes,Model);
// db.Match= require('./match')(sequelize,DataTypes,Model);

// // console.log(db);
// db.Player.hasMany(db.Match, {
//   foreignKey: 'agentId',
// });
// db.Match.belongsTo(db.Player);

db.MapIdToSector=require('./mapIdToSector')(sequelize,DataTypes,Model);
db.CompanyInfo=require('./companyInfo')(sequelize,DataTypes,Model);

db.sequelize.sync({force: false});
module.exports = db;

