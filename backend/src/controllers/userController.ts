import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/User';

/*export const createUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({nombre, email, password: hashedPassword, rol });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};*/ // movido a register

export const getUsers: RequestHandler = async (req, res): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};