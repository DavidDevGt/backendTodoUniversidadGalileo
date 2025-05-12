require('dotenv').config();
const API_KEY = process.env.API_KEY;
const TaskModel = require('../core/task');
const GoalModel = require('../core/goal');
const { taskRepository, goalRepository } = require('../core/repositories');

const authMiddleware = (req, res, next) => {
    const apiKey = req.headers.authorization;
    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ error: 'No autorizado. Se requiere una API key válida.' });
    }
    
    req.models = {
        TaskModel,
        GoalModel
    };
    
    req.repositories = {
        taskRepository,
        goalRepository
    };
    
    next();
};

module.exports = authMiddleware;