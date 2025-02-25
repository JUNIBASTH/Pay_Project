import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password || !rol) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return 
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'El email ya está registrado' });
      return 
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });
    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    return 
  } catch (error: any) {
    console.error('Error en /routes/register:', error);
    // Envía el error completo en la respuesta para depuración
    res.status(500).json({ message: 'Error al registrar usuario', error: error.toString() });
    return 
  }
});

export default router;
