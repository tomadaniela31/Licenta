const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class Classroom extends Model {}

Classroom.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  id_therapist: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Classroom', // We need to choose the model name
  tableName: 'classroom',
  timestamps: false
});

Classroom.prototype.childrenList = async function() {
  const children = await this.getChildren();
  const childrenDetails = await Promise.all(children.map(async function (child) {
    const details = await child.details();
    return details;
  }));

  return childrenDetails;
}

module.exports = Classroom;
