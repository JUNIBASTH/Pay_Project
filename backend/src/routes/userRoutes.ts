import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { verifyToken, isAdmin } from '../../middleware/authMiddleware';

const router = Router();

// Solo un usuario autenticado con rol "admin" puede crear o ver usuarios
router.post('/', verifyToken, isAdmin, createUser);
router.get('/', verifyToken, isAdmin, getUsers);

export default router;