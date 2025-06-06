import mongoose from 'mongoose';

const pagoEmpleadoSchema = new mongoose.Schema({
  empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  planilla: { type: mongoose.Schema.Types.ObjectId, ref: 'Planilla', required: true },
  horasExtra: Number,
  bono: Number,
  deducciones: Number,
  salarioCalculado: Number
}, { timestamps: true });

export interface PagoEmpleado {
  _id: string;
  empleado: {
    _id: string;
    nombre: string;
    employeeCode: string;
    position: string;
    salary: number;
  };
  horasExtra: number;
  bono: number;
  deducciones: number;
  salarioCalculado: number;
}
export default mongoose.model('PagoEmpleado', pagoEmpleadoSchema);
