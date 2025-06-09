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
  user?: {
    email?: string;
    rol?: string;
    employeeCode?: string;
  };
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
  empleado: {
    _id: string;
    name: string;
    email?: string;
    position?: string;
    salary?: number;
    employeeCode?: string;
    user?: {
      rol?: string;
      email?: string;
    };
  };
  planilla: string;
  horasExtra: number;
  bono: number;
  deducciones: number;
  salarioCalculado: number;
}