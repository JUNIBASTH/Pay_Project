import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  salary: { type: Number, required: true },
  position: { type: String, required: true },
  employeeCode: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  
}, { timestamps: true });

export default mongoose.model('Employee', EmployeeSchema);