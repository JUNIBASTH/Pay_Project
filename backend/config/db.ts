import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// 🔐 Cargar el archivo .env
dotenv.config({ path: path.join(process.cwd(), 'backend/.env') });

// ✅ Validar que la variable exista
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Error: MONGO_URI no está definida en el archivo .env');
  process.exit(1); // Detiene el servidor si no hay URI
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};