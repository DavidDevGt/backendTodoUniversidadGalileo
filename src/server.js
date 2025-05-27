require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const sequelize = require('./core/db');

const Task = require('./core/task');
const Goal = require('./core/goal');
const taskRoutes = require('./routes/taskRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL;
const SHOW_ERRORS = process.env.SHOW_ERRORS === 'true';

app.use(helmet());
const corsOptions = {
    origin: NODE_ENV === 'production' ? [FRONTEND_URL] : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Request-Id'],
    credentials: true,
    maxAge: 86400
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Demasiadas solicitudes desde esta IP, intente de nuevo mas tarde'
    }
});
app.use('/api/', apiLimiter);

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
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
    console.error('❌ Error:', err);

    const errorResponse = {
        error: 'Ocurrió un error en el servidor'
    };

    if (SHOW_ERRORS) {
        errorResponse.message = err.message;
        errorResponse.stack = err.stack;
    }

    res.status(500).json(errorResponse);
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.url
    });
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexion con la base de datos iniciada');

        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados con la base de datos');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:');
        console.error('➡️ Msg:', error.message);

        if (error.original) {
            console.error('➡️ Error Original:', {
                code: error.original.code,
                errno: error.original.errno,
                sqlState: error.original.sqlState,
                sqlMessage: error.original.sqlMessage,
                fatal: error.original.fatal,
                host: error.original?.host,
                port: error.original?.port
            });
        } else {
            console.error('➡️ Detalles:', error);
        }

        process.exit(1);
    }
}


startServer();
