import express from 'express';
import { createEmployee, getAllEmployees } from '../controllers/employeeController';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyToken, getAllEmployees);
router.post('/', verifyToken, isAdmin, createEmployee);

export default router;