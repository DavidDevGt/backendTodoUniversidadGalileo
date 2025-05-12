const express = require('express');
const authMiddleware = require('../middleware/auth');
const { goalValidators } = require('../middleware/validators');

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
    const goals = req.repositories.goalRepository.getAllGoals();
    res.json(goals);
});

router.get('/:id', goalValidators.getById, (req, res) => {
    const id = parseInt(req.params.id);
    const goal = req.repositories.goalRepository.getGoalById(id);
    
    if (!goal) {
        return res.status(404).json({ error: 'Meta no encontrada' });
    }
    
    res.json(goal);
});

router.post('/', goalValidators.create, (req, res) => {
    const { title, description, targetDate, completed } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios' });
    }
    
    const newGoal = req.repositories.goalRepository.createGoal({
        title,
        description,
        targetDate: targetDate ? new Date(targetDate) : new Date(),
        completed: completed || false
    });
    
    res.status(201).json(newGoal);
});

router.put('/:id', goalValidators.update, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, targetDate, completed } = req.body;
    
    const updatedGoal = req.repositories.goalRepository.updateGoal(id, {
        ...(title && { title }),
        ...(description && { description }),
        ...(targetDate && { targetDate: new Date(targetDate) }),
        ...(completed !== undefined && { completed })
    });
    
    if (!updatedGoal) {
        return res.status(404).json({ error: 'Meta no encontrada' });
    }
    
    res.json(updatedGoal);
});

router.delete('/:id', goalValidators.delete, (req, res) => {
    const id = parseInt(req.params.id);
    const result = req.repositories.goalRepository.deleteGoal(id);
    
    if (!result) {
        return res.status(404).json({ error: 'Meta no encontrada' });
    }
    
    res.status(204).send();
});

module.exports = router;
