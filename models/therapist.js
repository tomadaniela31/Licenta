const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('licentaDB', 'root', '', {
  dialect: 'mysql'
})

class Therapist extends Model {}

Therapist.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.NUMBER,
    foreignKey: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Therapist', // We need to choose the model name
  tableName: 'therapist',
  timestamps: false
});

Therapist.prototype.classrooms = async function() {
  const classrooms = await this.getClassrooms();

  return classrooms.map((classroom) => {
    return {
      name: classroom.name,
      link: `/classrooms/${classroom.id}/show`,
      id: classroom.id
    }
  })
}

module.exports = Therapist;
