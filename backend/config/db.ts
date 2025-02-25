import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'nombre_db',
  process.env.DB_USER || 'usuario',
  process.env.DB_PASSWORD || 'contraseña',

  
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Conectado a la base de datos');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};
