# API de Tareas y Metas - Universidad Galileo

Una API RESTful para gestionar tareas y metas personales, implementada con Node.js, Express y MySQL, con soporte completo para Docker.

## Características

- API RESTful completa
- Gestión de tareas y metas personales
- Autenticación mediante API key segura
- Validación de datos de entrada
- Medidas de seguridad contra ataques comunes
- Límites de tasa para prevenir ataques de fuerza bruta
- Headers de seguridad con Helmet
- Persistencia de datos en MySQL con Sequelize ORM
- **Despliegue con Docker y Docker Compose**
- **Health checks integrados**
- **Logging estructurado**
- **Imagen Docker optimizada multi-stage**
- Documentación completa de endpoints
- Colección de Postman incluida para pruebas

## Instalación

### Opción 1: Instalación con Docker (Recomendada)

```bash
# Clonar el repositorio
git clone https://github.com/DavidDevGt/backendTodoUniversidadGalileo.git

# Navegar al directorio del proyecto
cd backendTodoUniversidadGalileo

# Copiar el archivo de variables de entorno
cp .env.example .env

# Editar el archivo .env con tus configuraciones
# Asegúrate de configurar:
# - MYSQL_ROOT_PASSWORD
# - MYSQL_DATABASE
# - API_KEY
# - PORT
# - FRONTEND_URL

# Construir y ejecutar con Docker Compose
docker-compose up --build

# Para ejecutar en segundo plano
docker-compose up -d --build
```

### Opción 2: Instalación Manual

```bash
# Clonar el repositorio
git clone https://github.com/DavidDevGt/backendTodoUniversidadGalileo.git

# Navegar al directorio del proyecto
cd backendTodoUniversidadGalileo

# Instalar dependencias
npm install

# Configurar el archivo .env
# Crear un archivo .env en la raíz del proyecto basado en .env.example
cp .env.example .env

# Configurar MySQL manualmente y editar las variables de entorno en .env:
# PORT=3000
# API_KEY=apikeysito12345 # Usaremos este de ejemplo jaja
# NODE_ENV=development
# DB_HOST=localhost
# DB_USER=tu_usuario_mysql
# DB_PASSWORD=tu_contraseña_mysql
# DB_NAME=nombre_base_datos
# DB_PORT=3306
# FRONTEND_URL=http://localhost:8536
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
.dockerignore        # Archivos ignorados por Docker
.gitignore           # Configuración de archivos ignorados por git
docker-compose.yml   # Configuración de Docker Compose
Dockerfile           # Imagen Docker para la aplicación
Dockerfile.db        # Imagen Docker personalizada para MySQL
UniversidadGalileoTodoAPI.postman_collection.json # Colección de Postman para pruebas
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
  -H "Authorization: apikeysito12345" \
  -d '{"title":"Completar proyecto","description":"Finalizar el desarrollo del API","dueDate":"2023-12-31"}'
```

### Obtener todas las metas

```bash
curl -X GET http://localhost:3000/api/goals \
  -H "Authorization: apikeysito12345"
```

## Docker y Contenedores

### Comandos Docker Útiles

```bash
# Construir y ejecutar los contenedores
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs de los servicios
docker-compose logs -f

# Ver logs solo de la aplicación
docker-compose logs -f app

# Ver logs solo de la base de datos
docker-compose logs -f db

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes (¡CUIDADO! Elimina datos de la BD)
docker-compose down -v

# Reconstruir solo la aplicación
docker-compose build app

# Ejecutar comandos dentro del contenedor de la aplicación
docker-compose exec app sh

# Acceder a MySQL desde el contenedor
docker-compose exec db mysql -u root -p
```

### Health Checks

La aplicación incluye health checks tanto para la aplicación como para la base de datos:

- **Aplicación**: `GET /health` - Verifica que el servidor esté respondiendo
- **Base de datos**: Verificación automática de conexión MySQL cada 30 segundos

### Variables de Entorno para Docker

Cuando uses Docker Compose, asegúrate de configurar estas variables adicionales en tu `.env`:

```env
# Variables específicas para Docker
MYSQL_ROOT_PASSWORD=tu_password_seguro
MYSQL_DATABASE=galileo_todo_db
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

## Pruebas con Postman

El proyecto incluye una colección completa de Postman (`UniversidadGalileoTodoAPI.postman_collection.json`) con todas las pruebas necesarias:

### Importar la Colección

1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `UniversidadGalileoTodoAPI.postman_collection.json`
4. La colección se importará con todas las pruebas organizadas por categorías

### Variables de Entorno en Postman

La colección utiliza estas variables:
- `baseUrl`: `http://localhost:3000` (ajusta según tu configuración)
- `apiKey`: `apikeysito12345` (ajusta según tu API key)

### Categorías de Pruebas Incluidas

- **Info**: Información general de la API
- **Tasks**: CRUD completo para tareas
- **Goals**: CRUD completo para metas  
- **Authentication**: Pruebas de autenticación válida e inválida
- **Error Handling**: Manejo de errores y rutas no existentes

## Notas Adicionales

- Esta API utiliza MySQL como base de datos a través de Sequelize ORM.
- Se realiza sincronización automática de modelos (`sequelize.sync({ alter: true })`) al iniciar la aplicación.
- **Docker Compose gestiona automáticamente la base de datos MySQL**.
- **Health checks garantizan que los servicios estén funcionando correctamente**.
- **Logging estructurado para facilitar el debugging**.

## Requisitos

### Para Instalación con Docker (Recomendada)
- Docker
- Docker Compose

### Para Instalación Manual
- Node.js (v18 o superior)
- MySQL (v8.0 o superior)
- npm (v8 o superior)

## Medidas de Seguridad Implementadas

- **Variables de entorno**: Las claves y configuraciones sensibles se almacenan en variables de entorno (.env).
- **Validación de entradas**: Todas las entradas del usuario son validadas con express-validator.
- **Protección contra ataques comunes**: Implementación de helmet para proteger contra vulnerabilidades web comunes.
- **Limitación de tasa**: Protección contra ataques de fuerza bruta mediante express-rate-limit.
- **CORS configurado**: Control de acceso seguro desde dominios específicos.
- **Sanitización de entrada**: Escape de caracteres potencialmente peligrosos.
- **IDs de solicitud únicos**: Cada solicitud recibe un ID único para facilitar el rastreo y depuración.
- **Limitación de tamaño JSON**: Prevención de ataques de denegación de servicio.
- **Usuario no privilegiado en Docker**: La aplicación se ejecuta con un usuario sin privilegios dentro del contenedor.
- **Imagen Docker optimizada**: Imagen multi-stage que reduce el tamaño y la superficie de ataque.

## Optimizaciones de Docker

- **Imagen multi-stage**: Separa la construcción de la ejecución para optimizar el tamaño final.
- **Usuario no root**: La aplicación se ejecuta con un usuario dedicado sin privilegios.
- **Health checks**: Verificación automática del estado de los servicios.
- **Volumes nombrados**: Persistencia de datos de MySQL entre reinicios.
- **Redes aisladas**: Los contenedores se comunican a través de una red privada.
- **Logs estructurados**: Rotación automática de logs para evitar que consuman demasiado espacio.
- **Tini init system**: Manejo correcto de señales y procesos zombie en el contenedor.
