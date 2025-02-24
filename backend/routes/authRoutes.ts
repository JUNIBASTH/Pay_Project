import { Router } from 'express';
import { login, register } from '../controllers/authController';
import type { Request, Response } from 'express'; 


const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;