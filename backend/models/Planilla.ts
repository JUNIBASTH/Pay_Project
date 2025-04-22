import mongoose from 'mongoose';

const planillaSchema = new mongoose.Schema({
  nombre: String,
  fechaInicio: Date,
  fechaFin: Date,
  empleados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' }]
}, { timestamps: true });

export default mongoose.model('Planilla', planillaSchema);