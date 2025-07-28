import express, { RequestHandler } from 'express';
import mongoose from 'mongoose';
import PagoEmpleado from '../../models/PagoEmpleado';
import { verifyToken, isAdmin } from '../../middleware/authMiddleware';

const router = express.Router();

/**
 * POST /api/pagos-empleado
 * Registra un nuevo pago de empleado
 */
export const registrarPagoEmpleado: RequestHandler = async (req, res) => {
  try {
    const {
      empleado,
      planilla,
      horasExtra,
      bono,
      deducciones,
      salarioCalculado
    } = req.body;

    const nuevoPago = new PagoEmpleado({
      empleado,
      planilla,
      horasExtra,
      bono,
      deducciones,
      salarioCalculado
    });

    await nuevoPago.save();
    res.status(201).json(nuevoPago);
  } catch (error: any) {
    console.error('Error al registrar pago:', error);
    res.status(500).json({ error: 'Error al registrar pago del empleado' });
  }
};

/**
 * GET /api/pagos-empleado/planilla/:id
 * Obtiene todos los pagos vinculados a una planilla específica
 */
export const obtenerPagosPorPlanilla: RequestHandler = async (req, res) => {
  try {
    const planillaId = req.params.id;

    console.log('Recibido ID:', planillaId);

    if (!mongoose.Types.ObjectId.isValid(planillaId)) {
      console.warn('ID inválido:', planillaId);
      res.status(400).json({ error: 'ID de planilla inválido' });
      return;
    }

    const pagos = await PagoEmpleado.find({ planilla: planillaId }).populate({
      path: 'empleado',
      populate: { path: 'user' }
    });

    console.log('Pagos encontrados:', pagos);
    res.status(200).json(pagos);
  } catch (error: any) {
    console.error('Error en pagos por planilla:', error);
    res.status(500).json({ error: 'Error al obtener pagos de la planilla' });
  }
};

// Registrar las rutas
router.post('/', verifyToken, isAdmin, registrarPagoEmpleado);
router.get('/planilla/:id', verifyToken, isAdmin, obtenerPagosPorPlanilla);

export default router;
