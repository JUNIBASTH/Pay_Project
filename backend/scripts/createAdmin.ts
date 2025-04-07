import { connectDB } from '../config/db'; // ✅ Importa la función
import bcrypt from 'bcrypt';
import User from '../models/User';

const createAdmin = async () => {
  try {
    await connectDB(); // ✅ Espera la conexión a MongoDB

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await User.create({
      nombre: 'Super Admin',
      email: 'admin1@gmail.com',
      password: hashedPassword,
      rol: 'admin',
    });

    console.log('✅ Admin creado:', admin);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando admin:', error);
    process.exit(1);
  }
};

createAdmin();