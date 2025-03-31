/*import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'nombre_db',
  process.env.DB_USER || 'usuario',
  process.env.DB_PASS || 'contraseña',

  
  {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.warn('Problema temporal en la conexión, intentando reconectar...');
    
  }
};
*/

// src/config/database.ts (o donde tengas la conexión)

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pay_project';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.warn('❌ Error conectando a MongoDB:', error);
  }
};
