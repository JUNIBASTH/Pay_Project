// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import employeeRoutes from '../routes/employeeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Conexión a base de datos
connectDB();

// Rutas
app.use('/api', employeeRoutes);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
