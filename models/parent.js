const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class Parent extends Model {}

Parent.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  telefon: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Parent', // We need to choose the model name
  tableName: 'parent',
  timestamps: false
});

Parent.prototype.childrenList = async function() {
  const children = await this.getChildren();
  const childrenDetails = await Promise.all(children.map(async function (child) {
    const details = await child.details();
    return details;
  }));

  return childrenDetails;
}

module.exports = Parent;
