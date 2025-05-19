import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; 
import User from '../models/User';
import Employee from '../models/Employee';
import { RequestHandler } from 'express';


export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, rol, position, salary, employeeCode } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      rol,
    });

    const newEmployee = await Employee.create({
      user: newUser._id,
      name,
      email: email,
      salary,
      position,
      employeeCode,
      isActive: true,
    });

    res.status(201).json({
      message: 'Usuario y empleado creados exitosamente',
      user: newUser,
      employee: newEmployee,
    });
  } catch (error: any) {
    console.error('Error en registro:', error.message);
    res.status(500).json({ message: 'Error al registrar usuario y empleado', error: error.message });
  }
};

export const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email } ); 
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