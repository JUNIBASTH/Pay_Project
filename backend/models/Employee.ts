import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  position: String,
  overtimeHours: Number,
  deductions: [Number], // si los manejas como array
});

export default mongoose.model('Employee', EmployeeSchema);