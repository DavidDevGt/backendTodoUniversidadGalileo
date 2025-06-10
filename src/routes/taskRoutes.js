const express = require('express');
const authMiddleware = require('../middleware/auth');
const { taskValidators } = require('../middleware/validators');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
    const tasks = await req.repositories.taskRepository.getAllTasks();
    res.json(tasks);
});

router.get('/:id', taskValidators.getById, async (req, res) => {
    const id = parseInt(req.params.id);
    const task = await req.repositories.taskRepository.getTaskById(id);
    
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(task);
});

router.post('/', taskValidators.create, async (req, res) => {
    const { title, description, dueDate, completed } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios' });
    }
    
    const newTask = await req.repositories.taskRepository.createTask({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        completed: completed || false
    });
    
    res.status(201).json(newTask);
});

router.put('/:id', taskValidators.update, async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, dueDate, completed } = req.body;
    
    const updatedTask = await req.repositories.taskRepository.updateTask(id, {
        ...(title && { title }),
        ...(description && { description }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(completed !== undefined && { completed })
    });
    
    if (!updatedTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(updatedTask);
});

router.delete('/:id', taskValidators.delete, async (req, res) => {
    const id = parseInt(req.params.id);
    
    const task = await req.repositories.taskRepository.getTaskById(id);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const result = await req.repositories.taskRepository.deleteTask(id);
    
    if (!result) {
        return res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
    
    res.status(200).json({
        message: 'Tarea eliminada correctamente',
        deletedTask: {
            id: task.id,
            title: task.title
        }
    });
});

module.exports = router;
