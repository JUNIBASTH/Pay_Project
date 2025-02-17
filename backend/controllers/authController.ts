import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; 
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ nombre, email, password: hashedPassword, rol });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return res.json({ token, user });
    } catch (error) {
      return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  };