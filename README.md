# API de Tareas y Metas – Node.js + Express + MySQL

¡Hola! Este es el backend que desarrollé como complemento del frontend para **Universidad Galileo**. Se trata de una API RESTful robusta y moderna para gestionar tareas y metas personales, construida con **Node.js**, **Express** y **MySQL**.

El objetivo fue crear un backend escalable, seguro y listo para producción, con todas las buenas prácticas de desarrollo backend moderno.

---

## 🔍 Tabla de Contenidos

* [🚀 Tecnologías que usé](#-tecnologías-que-usé)
* [✨ ¿Qué puedes hacer con esta API?](#-qué-puedes-hacer-con-esta-api)
* [🛠️ ¿Cómo ponerlo en marcha?](#️-cómo-ponerlo-en-marcha)
* [📁 Cómo está organizada la API](#-cómo-está-organizada-la-api)
* [📡 Endpoints disponibles](#-endpoints-disponibles)
* [🔹 Ejemplos de uso rápido](#-ejemplos-de-uso-rápido)
* [⚖️ Formato de los objetos](#️-formato-de-los-objetos)
* [🔮 Pruebas con Postman](#-pruebas-con-postman)
* [🔒 Medidas de seguridad implementadas](#-medidas-de-seguridad-implementadas)
* [🚀 Optimizaciones de Docker](#-optimizaciones-de-docker)
* [🔧 Configuración de variables de entorno](#-configuración-de-variables-de-entorno)
* [💡 Notas importantes](#-notas-importantes)
* [👨‍💻 Autor](#-autor)
* [📄 Licencia](#-licencia)

---

## 🚀 Tecnologías que usé

Estas son las herramientas que conforman el corazón de la API:

* **Node.js 18+ + Express** – Para construir una API rápida y confiable.
* **MySQL + Sequelize ORM** – Base de datos relacional con ORM moderno.
* **Docker + Docker Compose** – Contenedores listos para producción.
* **Express Validator** – Validación robusta de datos de entrada.
* **Helmet + Rate Limiting** – Seguridad contra ataques comunes.
* **Winston** – Logging estructurado para debugging y trazabilidad.
* **Postman Collection** – Documentación interactiva incluida.

---

## ✨ ¿Qué puedes hacer con esta API?

### 📋 Gestión completa de tareas y metas

* **Tareas**: CRUD completo con fechas de vencimiento y estados.
* **Metas**: Administración de objetivos a largo plazo con fechas objetivo.
* **Autenticación**: Sistema seguro con API Keys configurables.

### 🔒 Seguridad robusta y lista para producción

* ✅ Protección contra XSS, ataques de fuerza bruta y vulnerabilidades comunes.
* 🛡️ Validación y sanitización de todas las entradas.
* 🔑 Autenticación por API key con variables de entorno.
* 📊 Logging estructurado con IDs únicos de solicitud.
* 🚫 Limitación de tasa para prevenir abuso.

### 🐳 Despliegue simplificado con Docker

* **Docker Compose**: Levanta toda la infraestructura con un comando.
* **Health Checks**: Verificación automática del estado de los servicios.
* **Imagen optimizada**: Multi-stage build que reduce tamaño y superficie de ataque.
* **Persistencia**: Volúmenes nombrados para mantener datos entre reinicios.
* **Redes aisladas**: Comunicación segura entre contenedores.

### 🔧 Arquitectura sólida y mantenible

* Estructura modular por capas (rutas, middleware, repositorios).
* **Sequelize ORM** con sincronización automática de modelos.
* Middleware personalizado para validación y autenticación.
* **Separación de responsabilidades** clara y escalable.
* Colección de **Postman** completa para pruebas.

---

## 🛠️ ¿Cómo ponerlo en marcha?

### Requisitos

**Para Docker (Recomendado):**
* Docker
* Docker Compose

**Para instalación manual:**
* Node.js 18 o superior
* MySQL 8.0 o superior
* npm 8 o superior

### Instalación con Docker (Recomendada)

1. **Clona este repo**:

   ```bash
   git clone https://github.com/DavidDevGt/backendTodoUniversidadGalileo.git
   cd backendTodoUniversidadGalileo
   ```

2. **Configura las variables de entorno**:

   ```bash
   cp .env.example .env
   # Edita el archivo .env con tus configuraciones
   ```

3. **Levanta toda la infraestructura**:

   ```bash
   docker-compose up --build
   # Para ejecutar en segundo plano
   docker-compose up -d --build
   ```

   > La API estará disponible en `http://localhost:3000`

### Instalación manual

1. **Clona y prepara el proyecto**:

   ```bash
   git clone https://github.com/DavidDevGt/backendTodoUniversidadGalileo.git
   cd backendTodoUniversidadGalileo
   npm install
   ```

2. **Configura tu base de datos MySQL**:

   ```bash
   cp .env.example .env
   # Edita las variables de entorno:
   # DB_HOST=localhost
   # DB_USER=tu_usuario_mysql
   # DB_PASSWORD=tu_contraseña_mysql
   # DB_NAME=nombre_base_datos
   # API_KEY=apikeysito12345
   ```

3. **Arranca el servidor**:

   ```bash
   npm run dev     # Desarrollo
   npm start       # Producción
   ```

### Comandos Docker útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Logs solo de la aplicación
docker-compose logs -f app

# Acceder al contenedor
docker-compose exec app sh

# Conectar a MySQL
docker-compose exec db mysql -u root -p

# Parar servicios
docker-compose down

# Parar y eliminar datos (¡CUIDADO!)
docker-compose down -v
```

---

## 📁 Cómo está organizada la API

```bash
src/
├── core/               # Lógica de negocio
│   ├── db.js          # Configuración de base de datos
│   ├── task.js        # Modelo de tareas (Sequelize)
│   ├── goal.js        # Modelo de metas (Sequelize)
│   └── repositories.js # Repositorios de datos
├── middleware/         # Middleware personalizado
│   ├── auth.js        # Autenticación con API key
│   └── validators.js  # Validación de datos
├── routes/            # Definición de endpoints
│   ├── taskRoutes.js  # Rutas de tareas
│   └── goalRoutes.js  # Rutas de metas
└── server.js          # Configuración del servidor Express

# Archivos de configuración
├── docker-compose.yml                              # Orquestación de contenedores
├── Dockerfile                                      # Imagen de la aplicación
├── UniversidadGalileoTodoAPI.postman_collection.json # Colección de pruebas
└── .env.example                                    # Variables de entorno de ejemplo
```

---

## 📡 Endpoints disponibles

### 🔐 Autenticación

Todas las solicitudes requieren el header:
```
Authorization: tu_clave_api_definida_en_env
```

### 📋 Tareas

* `GET /api/tasks` – Obtener todas las tareas
* `GET /api/tasks/:id` – Obtener una tarea específica
* `POST /api/tasks` – Crear una nueva tarea
* `PUT /api/tasks/:id` – Actualizar una tarea existente
* `DELETE /api/tasks/:id` – Eliminar una tarea

### 🎯 Metas

* `GET /api/goals` – Obtener todas las metas
* `GET /api/goals/:id` – Obtener una meta específica
* `POST /api/goals` – Crear una nueva meta
* `PUT /api/goals/:id` – Actualizar una meta existente
* `DELETE /api/goals/:id` – Eliminar una meta

### 🏥 Health Checks

* `GET /health` – Verificar estado de la aplicación
* Health check automático de MySQL cada 30 segundos

---

## 🔹 Ejemplos de uso rápido

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

---

## ⚖️ Formato de los objetos

### Tarea (Task)
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

### Meta (Goal)
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

---

## 🔮 Pruebas con Postman

### ¿Cómo usar la colección incluida?

1. **Importa la colección**:
   - Abre Postman
   - Haz clic en "Import"
   - Selecciona `UniversidadGalileoTodoAPI.postman_collection.json`

2. **Configura las variables**:
   - `baseUrl`: `http://localhost:3000`
   - `apiKey`: `apikeysito12345` (o tu API key personalizada)

3. **Categorías de pruebas disponibles**:
   - **Info**: Información general de la API
   - **Tasks**: CRUD completo para tareas
   - **Goals**: CRUD completo para metas
   - **Authentication**: Pruebas de autenticación válida e inválida
   - **Error Handling**: Manejo de errores y rutas no existentes

---

## 🔒 Medidas de seguridad implementadas

### 🛡️ Protección robusta

* **Variables de entorno**: Claves sensibles almacenadas de forma segura
* **Helmet**: Protección contra vulnerabilidades web comunes
* **Rate Limiting**: Prevención de ataques de fuerza bruta
* **CORS configurado**: Control de acceso desde dominios específicos
* **Validación estricta**: Todas las entradas validadas con express-validator
* **Sanitización**: Escape de caracteres potencialmente peligrosos

### 🔍 Trazabilidad y debugging

* **IDs únicos**: Cada solicitud recibe un ID único para rastreo
* **Logging estructurado**: Winston para logs organizados y consultables
* **Limitación de payload**: Prevención de ataques de denegación de servicio

---

## 🚀 Optimizaciones de Docker

### 🐳 Imagen optimizada

* **Multi-stage build**: Separa construcción de ejecución
* **Usuario no privilegiado**: Ejecuta con usuario dedicado sin privilegios
* **Tini init system**: Manejo correcto de señales y procesos
* **Imagen mínima**: Reduce superficie de ataque y tamaño

### 🔧 Infraestructura robusta

* **Health checks automáticos**: Verificación del estado de servicios
* **Volúmenes nombrados**: Persistencia de datos entre reinicios
* **Redes aisladas**: Comunicación segura entre contenedores
* **Logs estructurados**: Rotación automática para evitar consumo excesivo

---

## 🔧 Configuración de variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development
API_KEY=apikeysito12345

# Base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=galileo_todo_db
DB_PORT=3306

# Docker (si usas Docker Compose)
MYSQL_ROOT_PASSWORD=tu_password_seguro
MYSQL_DATABASE=galileo_todo_db

# Frontend
FRONTEND_URL=http://localhost:8536

# Debugging
SHOW_ERRORS=true
```

---

## 💡 Notas importantes

### 🔄 Sincronización automática

* Sequelize sincroniza automáticamente los modelos al iniciar (`sequelize.sync({ alter: true })`)
* Docker Compose gestiona la base de datos MySQL completamente
* Health checks garantizan que todo funcione correctamente

### 📊 Arquitectura de la aplicación

```
Cliente → Rutas → Middleware → Controladores → Repositorios → Base de datos
   ↑                                                            ↓
Respuesta ← Formateo ← Validación ← Lógica de negocio ← Consultas SQL
```

---

## 👨‍💻 Autor

**David Vargas**  
Proyecto académico para Universidad Galileo  
Materia: Desarrollo Web Moderno

---

## 📄 Licencia

Este proyecto fue creado con fines educativos y está destinado al uso académico dentro de la Universidad Galileo.
