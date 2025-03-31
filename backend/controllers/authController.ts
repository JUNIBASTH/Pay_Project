import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; 
import User from '../models/User';
import { RequestHandler } from 'express';


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

export const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email } ); // <-- esta línea aún es de Sequelize
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};