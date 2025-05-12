require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const taskRoutes = require('./routes/taskRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuración de seguridad
app.use(helmet());

// Configuración de CORS más restrictiva
const corsOptions = {
    origin: NODE_ENV === 'production' ? ['https://yourdomain.com'] : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Request-Id'],
    credentials: true,
    maxAge: 86400 // 24 horas
};
app.use(cors(corsOptions));

// Limitar el tamaño de las solicitudes JSON
app.use(express.json({ limit: '10kb' }));

// Aplicar límite de solicitudes para prevenir ataques de fuerza bruta
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 solicitudes por ventana por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Demasiadas solicitudes desde esta IP, intente de nuevo más tarde'
    }
});
app.use('/api/', apiLimiter);

// Middleware de registro
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    // Asignar un ID único a cada solicitud
    req.id = crypto.randomUUID();
    res.setHeader('X-Request-Id', req.id);
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'API de Tareas y Metas - Universidad Galileo',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks',
            goals: '/api/goals'
        }
    });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        error: 'Ocurrió un error en el servidor',
        message: err.message
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.url
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
