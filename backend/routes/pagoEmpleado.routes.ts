import express from 'express';
import PagoEmpleado from '../models/PagoEmpleado';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { empleado, planilla, horasExtra, bono, deducciones, salarioCalculado } = req.body;

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar pago del empleado' });
  }
});

router.get('/planilla/:id', async (req, res) => {
    try {
      const pagos = await PagoEmpleado.find({ planilla: req.params.id }).populate('empleado');
      res.json(pagos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener pagos de la planilla' });
    }
  });


export default router;
