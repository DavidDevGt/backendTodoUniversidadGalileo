const Task = require('./task');
const Goal = require('./goal');

const taskRepository = {
    async getAllTasks() {
        return await Task.findAll();
    },

    async getTaskById(id) {
        return await Task.findByPk(id);
    },

    async createTask(taskData) {
        return await Task.create(taskData);
    },

    async updateTask(id, taskData) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        return await task.update(taskData);
    },

    async deleteTask(id) {
        const task = await Task.findByPk(id);
        if (!task) return false;
        await task.destroy();
        return true;
    }
};

const goalRepository = {
    async getAllGoals() {
        return await Goal.findAll();
    },

    async getGoalById(id) {
        return await Goal.findByPk(id);
    },

    async createGoal(goalData) {
        return await Goal.create(goalData);
    },

    async updateGoal(id, goalData) {
        const goal = await Goal.findByPk(id);
        if (!goal) return null;
        return await goal.update(goalData);
    },

    async deleteGoal(id) {
        const goal = await Goal.findByPk(id);
        if (!goal) return false;
        await goal.destroy();
        return true;
    }
};

module.exports = {
    taskRepository,
    goalRepository
};
