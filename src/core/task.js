const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class Task extends Model { }

Task.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
});

module.exports = Task;
