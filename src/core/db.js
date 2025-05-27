const { Sequelize } = require('sequelize');

const DEBUG = false; // debuggear .env
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  console.error('❌ Error: Variables de entorno para la base de datos no están definidas correctamente.');
  console.error(`➡️ DB_HOST: ${DB_HOST}`);
  console.error(`➡️ DB_USER: ${DB_USER}`);
  console.error(`➡️ DB_NAME: ${DB_NAME}`);
  process.exit(1);
}

if (DEBUG) {
  console.log('DEBUG ENV:');
  console.log(`➡️ DB_HOST: ${DB_HOST}`);
  console.log(`➡️ DB_USER: ${DB_USER}`);
  console.log(`➡️ DB_NAME: ${DB_NAME}`);
  console.log(`➡️ DB_PORT: ${DB_PORT}`);
  console.log(`➡️ DB_PASSWORD: ${DB_PASSWORD}`);
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 15000, // timeout: 15s
  },
});

module.exports = sequelize;
