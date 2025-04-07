import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'backend/.env') });

console.log('🔍 Intentando conectar a MongoDB...');

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB Atlas');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);
  });

// ⏱️ Corte de emergencia después de 15 segundos
setTimeout(() => {
  console.log('❌ Timeout: la conexión no respondió en 15 segundos');
  process.exit(1);
}, 15000);