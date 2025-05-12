const { body, param, validationResult } = require('express-validator');

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            error: 'Error de validación', 
            details: errors.array() 
        });
    }
    next();
};

const taskValidators = {
    create: [
        body('title')
            .trim()
            .notEmpty().withMessage('El título es obligatorio')
            .isLength({ max: 100 }).withMessage('El título no debe exceder 100 caracteres')
            .escape(),
        body('description')
            .trim()
            .notEmpty().withMessage('La descripción es obligatoria')
            .isLength({ max: 500 }).withMessage('La descripción no debe exceder 500 caracteres')
            .escape(),
        body('dueDate')
            .optional()
            .isISO8601().withMessage('La fecha debe estar en formato ISO8601')
            .toDate(),
        body('completed')
            .optional()
            .isBoolean().withMessage('Completed debe ser un valor booleano')
            .toBoolean(),
        checkValidationErrors
    ],
    update: [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        body('title')
            .optional()
            .trim()
            .isLength({ max: 100 }).withMessage('El título no debe exceder 100 caracteres')
            .escape(),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage('La descripción no debe exceder 500 caracteres')
            .escape(),
        body('dueDate')
            .optional()
            .isISO8601().withMessage('La fecha debe estar en formato ISO8601')
            .toDate(),
        body('completed')
            .optional()
            .isBoolean().withMessage('Completed debe ser un valor booleano')
            .toBoolean(),
        checkValidationErrors
    ],
    getById: [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        checkValidationErrors
    ],
    delete: [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        checkValidationErrors
    ]
};

const goalValidators = {
    create: [
        body('title')
            .trim()
            .notEmpty().withMessage('El título es obligatorio')
            .isLength({ max: 100 }).withMessage('El título no debe exceder 100 caracteres')
            .escape(),
        body('description')
            .trim()
            .notEmpty().withMessage('La descripción es obligatoria')
            .isLength({ max: 500 }).withMessage('La descripción no debe exceder 500 caracteres')
            .escape(),
        body('targetDate')
            .optional()
            .isISO8601().withMessage('La fecha debe estar en formato ISO8601')
            .toDate(),
        body('completed')
            .optional()
            .isBoolean().withMessage('Completed debe ser un valor booleano')
            .toBoolean(),
        checkValidationErrors
    ],
    update: [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        body('title')
            .optional()
            .trim()
            .isLength({ max: 100 }).withMessage('El título no debe exceder 100 caracteres')
            .escape(),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage('La descripción no debe exceder 500 caracteres')
            .escape(),
        body('targetDate')
            .optional()
            .isISO8601().withMessage('La fecha debe estar en formato ISO8601')
            .toDate(),
        body('completed')
            .optional()
            .isBoolean().withMessage('Completed debe ser un valor booleano')
            .toBoolean(),
        checkValidationErrors
    ],
    getById: [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        checkValidationErrors
    ],
    delete: [
        param('id').isInt().withMessage('El ID debe ser un número entero'),
        checkValidationErrors
    ]
};

module.exports = {
    taskValidators,
    goalValidators
};
