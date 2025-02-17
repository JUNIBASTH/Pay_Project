import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any; 
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
