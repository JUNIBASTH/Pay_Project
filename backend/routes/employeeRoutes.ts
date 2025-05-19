import express from 'express';
import {
  getAllEmployees,
  createEmployee,
  actualizarEstadoEmpleado,
  getEmployeeById,
  actualizarEmpleado,

} from '../controllers/employeeController';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// ✅ Rutas protegidas con middleware
router.get('/', verifyToken, getAllEmployees);
router.get('/:id', verifyToken, getEmployeeById);
router.post('/', verifyToken, isAdmin, createEmployee);
router.patch('/:id/estado', verifyToken, isAdmin, actualizarEstadoEmpleado);
router.put('/:id', verifyToken, isAdmin, actualizarEmpleado);

export default router;
