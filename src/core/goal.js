const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class Goal extends Model {}

Goal.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  targetDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Goal',
  tableName: 'goals',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
});

module.exports = Goal;
