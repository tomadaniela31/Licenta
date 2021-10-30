const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class Game extends Model {}

Game.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Game', // We need to choose the model name
  tableName: 'game',
  timestamps: false
});

module.exports = Game;
