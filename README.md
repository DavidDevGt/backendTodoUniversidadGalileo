# API de Tareas y Metas - Universidad Galileo

Una API RESTful para gestionar tareas y metas personales, implementada con Node.js, Express y MySQL.

## Características

- API RESTful completa
- Gestión de tareas y metas personales
- Autenticación mediante API key segura
- Validación de datos de entrada
- Medidas de seguridad contra ataques comunes
- Límites de tasa para prevenir ataques de fuerza bruta
- Headers de seguridad con Helmet
- Persistencia de datos en MySQL con Sequelize ORM
- Documentación completa de endpoints

## Instalación

```bash
# Clonar el repositorio (si aplica)
git clone https://github.com/DavidDevGt/backendTodoUniversidadGalileo.git

# Navegar al directorio del proyecto
cd backendTodoUniversidadGalileo

# Instalar dependencias
npm install

# Configurar el archivo .env
# Crear un archivo .env en la raíz del proyecto basado en .env.example:
# PORT=3000
# API_KEY=tu_clave_secreta_aquí
# NODE_ENV=development
# DB_HOST=localhost
# DB_USER=usuario_mysql
# DB_PASSWORD=contraseña_mysql
# DB_NAME=nombre_base_datos
# DB_PORT=3306
# FRONTEND_URL=http://localhost:5173
# SHOW_ERRORS=true

# Iniciar el servidor en modo desarrollo
npm run dev

# O para producción
npm start
```

## Estructura del Proyecto

```
.env                 # Variables de entorno (no incluido en el repositorio)
.env.example         # Ejemplo de configuración de variables de entorno
.gitignore           # Configuración de archivos ignorados por git
src/
├── core/             # Lógica de negocio y modelos
│   ├── db.js         # Configuración de conexión a la base de datos
│   ├── goal.js       # Modelo de metas (Sequelize)
│   ├── task.js       # Modelo de tareas (Sequelize)
│   └── repositories.js # Repositorios para acceder a los datos
├── middleware/       # Middleware personalizado
│   ├── auth.js       # Middleware de autenticación con API key
│   └── validators.js # Validadores para tareas y metas
├── routes/           # Definición de rutas API
│   ├── taskRoutes.js # Rutas para tareas
│   └── goalRoutes.js # Rutas para metas
└── server.js         # Configuración del servidor Express
```

## Endpoints API

### Autenticación

Todas las solicitudes requieren un encabezado `Authorization` con la API key.

```
Authorization: tu_clave_api_definida_en_env
```

> **Nota de seguridad**: La API key debe mantenerse en secreto y configurarse a través del archivo `.env`.

### Tareas

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea específica
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea existente
- `DELETE /api/tasks/:id` - Eliminar una tarea

### Metas

- `GET /api/goals` - Obtener todas las metas
- `GET /api/goals/:id` - Obtener una meta específica
- `POST /api/goals` - Crear una nueva meta
- `PUT /api/goals/:id` - Actualizar una meta existente
- `DELETE /api/goals/:id` - Eliminar una meta

## Ejemplos de Uso

### Crear una nueva tarea

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: dfasdfasdfdsa" \
  -d '{"title":"Completar proyecto","description":"Finalizar el desarrollo del API","dueDate":"2023-12-31"}'
```

### Obtener todas las metas

```bash
curl -X GET http://localhost:3000/api/goals \
  -H "Authorization: dfasdfasdfdsa"
```

### Formato de Objetos

#### Tarea (Task)
```json
{
  "id": 1,
  "title": "Completar proyecto",
  "description": "Finalizar el desarrollo del API",
  "dueDate": "2023-12-31T00:00:00.000Z",
  "completed": false,
  "createdAt": "2023-12-10T15:30:00.000Z"
}
```

#### Meta (Goal)
```json
{
  "id": 1,
  "title": "Aprobar el curso",
  "description": "Obtener calificación superior a 80",
  "targetDate": "2023-12-31T00:00:00.000Z",
  "completed": false,
  "createdAt": "2023-12-10T15:30:00.000Z"
}
```

## Notas Adicionales

- Esta API utiliza MySQL como base de datos a través de Sequelize ORM.
- Se realiza sincronización automática de modelos (`sequelize.sync({ alter: true })`) al iniciar la aplicación.

## Requisitos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)

## Medidas de Seguridad Implementadas

- **Variables de entorno**: Las claves y configuraciones sensibles se almacenan en variables de entorno (.env).
- **Validación de entradas**: Todas las entradas del usuario son validadas con express-validator.
- **Protección contra ataques comunes**: Implementación de helmet para proteger contra vulnerabilidades web comunes.
- **Limitación de tasa**: Protección contra ataques de fuerza bruta mediante express-rate-limit.
- **CORS configurado**: Control de acceso seguro desde dominios específicos.
- **Sanitización de entrada**: Escape de caracteres potencialmente peligrosos.
- **IDs de solicitud únicos**: Cada solicitud recibe un ID único para facilitar el rastreo y depuración.
- **Limitación de tamaño JSON**: Prevención de ataques de denegación de servicio.
