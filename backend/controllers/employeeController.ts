import { Request, Response } from 'express';
import Employee from '../models/Employee';

export const getAllEmployees = async (req: Request, res: Response) => {
  console.log('📥 GET /api/employees llegó al controlador');
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, position, salary, overtimeHours, deductions } = req.body;

    const newEmployee = new Employee({
      name,
      position,
      salary,
      overtimeHours,
      deductions,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Empleado creado', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empleado', error });
  }
};