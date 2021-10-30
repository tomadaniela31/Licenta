const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  id_role: {
    type: DataTypes.NUMBER,
    foreignKey: true
  },
  email: {
    type: DataTypes.STRING,
    foreignKey: true
  },
  password: {
    type: DataTypes.STRING,
    foreignKey: true
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'user',
  timestamps: false
});

User.prototype.mainView = async function() {
  const role = await this.getRole();

  // role.label este logoped, pacient sau parinte
  return `/${role.label}`;
}

User.prototype.fullname = function() {
  return `${this.firstName} ${this.lastName}`;
}

module.exports = User;
