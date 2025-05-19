import { RequestHandler } from 'express';
import Employee from '../models/Employee';
import User from '../models/User';

export const getAllEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await Employee.find().populate('user');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

export const getEmployeeById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate('user');

    if (!employee) {
      res.status(404).json({ message: 'Empleado no encontrado' });
      return;
    }

    res.status(200).json(employee); 
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener empleado', error: error.message });
  }
};

export const createEmployee: RequestHandler = async (req, res) => {
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
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear empleado', error: error.message });
  }
};

export const actualizarEstadoEmpleado: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedEmployee) {
      res.status(404).json({ message: 'Empleado no encontrado' });
      return;
    }

    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

export const actualizarEmpleado: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      rol,
      position,
      salary,
      employeeCode,
    } = req.body;

    const empleado = await Employee.findById(id);
    if (!empleado) {
      res.status(404).json({ message: 'Empleado no encontrado' });
      return; // ✅ evitar return con valor
    }

    // ✅ Actualizar campos de empleado
    empleado.name = name;
    empleado.position = position;
    empleado.salary = salary;
    empleado.employeeCode = employeeCode;
    await empleado.save();

    // ✅ Actualizar campos del usuario vinculado
    if (empleado.user) {
      const user = await User.findById(empleado.user);
      if (user) {
        user.name = name;
        user.email = email;
        user.rol = rol;
        await user.save();
      }
    }

    res.status(200).json({ message: 'Empleado actualizado correctamente', empleado });
  } catch (error: any) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};