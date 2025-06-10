  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import path from 'path';
  import { connectDB } from './config/db';
  import employeeRoutes from './src/routes/employeeRoutes';
  import authRoutes from './src/routes/authRoutes'; 
  import userRoutes from './src/routes/userRoutes';
  import planillaRoutes from './src/routes/planilla.routes';
  import pagoEmpleadoRoutes from './src/routes/pagoEmpleado.routes';

  dotenv.config({ path: path.resolve(__dirname, './.env') });
  //dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };


  // 🛡️ CORS debe ir ANTES de cualquier otra cosa
  app.use(cors(corsOptions));

  // 🔧 Middleware
  app.use(express.json());

  // 🔌 Conexión a DB
  connectDB();

  // 📦 Rutas
  app.use('/api/employees', employeeRoutes)
  app.use('/api/auth', authRoutes); 
  app.use('/api/users', userRoutes);
  app.use('/api/planillas', planillaRoutes);
  app.use('/api/pagos-empleado', pagoEmpleadoRoutes);
  app.use('/api/employees', employeeRoutes);

  app.use(express.json());

  // 🚀 Servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });

  app.use((req, res) => {
    console.warn(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).send('Ruta no encontrada desde fallback');
  });