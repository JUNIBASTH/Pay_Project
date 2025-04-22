import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Formato: Bearer token
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return 
  }

  console.log('🔐 Verificando token...');
  
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Token inválido' });
      return 
    }
    req.user = decoded;
    next();
  });
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado, se requiere rol de administrador' });
  }
};