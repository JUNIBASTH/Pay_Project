import express from 'express';
import Planilla from '../models/Planilla';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, fechaInicio, fechaFin } = req.body;
    const nuevaPlanilla = new Planilla({ nombre, fechaInicio, fechaFin });
    await nuevaPlanilla.save();
    res.status(201).json(nuevaPlanilla);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear planilla' });
  }
});

router.get('/', async (req, res) => {
    try {
      const planillas = await Planilla.find();
      res.json(planillas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener planillas' });
    }
  });

export default router;