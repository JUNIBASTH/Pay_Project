import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { Request, Response } from 'express'; // Asegúrate de que esta importación esté presente si no estás usando alias

const router = Router();
router.post('/register', register);
router.post('/login', login);

export default router;