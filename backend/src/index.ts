// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import employeeRoutes from '../routes/employeeRoutes';
import sendPdfRoutes from '../routes/sendPdf.routes';
import fs from 'fs';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Middlewares
app.use(express.json());

// Conexión a base de datos
connectDB();

// Rutas
app.use('/api', employeeRoutes);
app.use('/api', sendPdfRoutes);


// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
