import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nombre, email, password, rol } = req.body;
      if (!nombre || !email || !password || !rol) {
        res.status(400).json({ message: 'Todos los campos son requeridos' });
        return;
      }

      // Verifica si el email ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'El email ya está registrado' });
        return;
      }

      // Encripta la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crea el usuario
      const newUser = await User.create({
        nombre,
        email,
        password: hashedPassword,
        rol,
      });

      res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    } catch (error) {
      console.error('Error en /api/register:', error);
      next(error);
    }
  }
);

export default router;
