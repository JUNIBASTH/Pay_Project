export interface Planilla {
    _id: string;
    nombre: string;
    fechaInicio: string; 
    fechaFin: string;
  }
  
  export interface Empleado {
    _id: string;
  name: string;        
  position?: string;
  salary?: number;
  overtimeHours?: number;
  deductions?: number[];
  }
  
 export interface EmpleadoRelacionado {
  _id: string;
  nombre: string;
  employeeCode: string;
  position: string;
  salary: number;
}

export interface PagoEmpleado {
  _id: string;
  empleado: EmpleadoRelacionado;
  horasExtra: number;
  bono: number;
  deducciones: number;
  salarioCalculado: number;
}