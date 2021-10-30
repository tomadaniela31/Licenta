const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class Child extends Model {}

Child.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  id_parent: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  id_class: {
    type: DataTypes.NUMBER,
    foreignKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Child', // We need to choose the model name
  tableName: 'child',
  timestamps: false
});

Child.prototype.details = async function() {
  const user = await this.getUser();

  return {
    fullname: user.fullname(),
    resultsPath: `/children/${this.id}/results`,
    id: this.id
  }
}

Child.prototype.fullname = async function() {
  const user = await this.getUser();

  return user.fullname();
}

Child.prototype.resultsFor = async function(gameId) {
  const results = await this.getResults({ where: { id_game: gameId }});

  return results.map((result) => {
    return {
      date: result.date,
      score: result.scor
    }
  });
}

module.exports = Child;
