import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql' 
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error conectando a la BD:', error);
  }
};
