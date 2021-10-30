const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class Result extends Model {}

Result.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true
  },
  id_game: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  id_child: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  scor: {
    type: DataTypes.NUMBER
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Result', // We need to choose the model name
  tableName: 'result',
  timestamps: false
});

module.exports = Result;
