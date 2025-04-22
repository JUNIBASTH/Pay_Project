export interface Planilla {
    _id: string;
    nombre: string;
    fechaInicio: string; 
    fechaFin: string;
  }
  
  export interface Empleado {
    _id: string;
    nombre: string;
    salario: number;
  }
  
  export interface PagoEmpleado {
    _id: string;
    empleado: {
      _id: string;
      nombre: string;
    };
    planilla: string;
    horasExtra: number;
    bono: number;
    deducciones: number;
    salarioCalculado: number;
  }