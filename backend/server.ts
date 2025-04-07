import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import employeeRoutes from './routes/employeeRoutes';
import authRoutes from './routes/authRoutes'; // si tenés rutas de login
import userRoutes from './routes/userRoutes';


dotenv.config({ path: path.resolve(__dirname, './.env') });
//dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🛡️ CORS debe ir ANTES de cualquier otra cosa
app.use(cors({
  origin: 'http://localhost:5173', // o '*', solo para desarrollo
  credentials: true
}));

// 🔧 Middleware
app.use(express.json());

// 🔌 Conexión a DB
connectDB();

// 📦 Rutas
app.use('/api', employeeRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);

// 🚀 Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});