import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import employeeRoutes from './routes/employeeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Necesario para que req.body funcione

connectDB();

// 👇 Esto monta las rutas bajo "/api"
app.use('/api', employeeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});