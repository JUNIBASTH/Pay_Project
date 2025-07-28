import { Router } from 'express';
import { getUsers } from '../controllers/userController';
import { verifyToken, isAdmin } from '../../middleware/authMiddleware';

const router = Router();

// Solo un usuario autenticado con rol "admin" puede crear o ver usuarios
// Con este apartado puedo obtener usuarios por postman

router.get('/', verifyToken, isAdmin, getUsers);

export default router;