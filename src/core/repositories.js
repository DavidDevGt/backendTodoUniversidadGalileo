// BASE DE DATOS
let tasks = [];
let goals = [];

const getNextTaskId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
};

const getNextGoalId = () => {
    return goals.length > 0 ? Math.max(...goals.map(goal => goal.id)) + 1 : 1;
};

const taskRepository = {
    getAllTasks() {
        return [...tasks];
    },

    getTaskById(id) {
        return tasks.find(task => task.id === id);
    },
    createTask(taskData) {
        const newTask = {
            id: getNextTaskId(),
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate || new Date(),
            createdAt: new Date(),
            completed: taskData.completed || false
        };
        tasks.push(newTask);
        return newTask;
    },

    updateTask(id, taskData) {
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) return null;

        const updatedTask = { ...tasks[index], ...taskData };
        tasks[index] = updatedTask;
        return updatedTask;
    },

    deleteTask(id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) return false;

        tasks.splice(index, 1);
        return true;
    }
};

const goalRepository = {
    getAllGoals() {
        return [...goals];
    },

    getGoalById(id) {
        return goals.find(goal => goal.id === id);
    },

    createGoal(goalData) {
        const newGoal = {
            id: getNextGoalId(),
            title: goalData.title,
            description: goalData.description,
            targetDate: goalData.targetDate || new Date(),
            createdAt: new Date(),
            completed: goalData.completed || false
        };
        goals.push(newGoal);
        return newGoal;
    },

    updateGoal(id, goalData) {
        const index = goals.findIndex(goal => goal.id === id);
        if (index === -1) return null;

        const updatedGoal = { ...goals[index], ...goalData };
        goals[index] = updatedGoal;
        return updatedGoal;
    },

    deleteGoal(id) {
        const index = goals.findIndex(goal => goal.id === id);
        if (index === -1) return false;

        goals.splice(index, 1);
        return true;
    }
};

module.exports = {
    taskRepository,
    goalRepository
};
