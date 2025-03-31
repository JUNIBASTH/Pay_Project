import express from 'express';
import { createEmployee, getAllEmployees } from '../controllers/employeeController';

const router = express.Router();

router.get('/employees', getAllEmployees);
router.post('/employees', createEmployee);

export default router;