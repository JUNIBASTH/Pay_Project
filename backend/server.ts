import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';
import registerRoute from './routes/register';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(express.json());
// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', registerRoute);




// Conectar a la base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Conectado a la base de datos');

    // Rutas
    app.use('/config/auth', authRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
    process.exit(1); // Finaliza el proceso si no puede conectar
  }
};

startServer();
