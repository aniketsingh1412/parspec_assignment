import { Sequelize } from 'sequelize';

const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'myuser';
const dbPass = process.env.DB_PASS || 'mypassword';
const dbName = process.env.DB_NAME || 'ordersdb';

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'postgres',
  logging: false, 
});


export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}