import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import registerRoute from './routes/register';
import { connectDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', registerRoute);
app.use('/config/auth', authRoutes);

// Middleware de manejo de errores (se coloca al final)
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error interno:", err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
};
app.use(errorHandler);

// Conectar a la base de datos y luego iniciar el servidor
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
    process.exit(1);
  }
};

startServer();
