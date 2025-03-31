import { useEffect, useState } from 'react';
import '../styles/styles.css'; // Ajustá la ruta si es necesario

interface Empleado {
  name: string;
  position: string;
  salary: number;
  overtimeHours: number;
  deductions: number[];
}

export default function Dashboard() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <nav>
          <a href="#">Inicio</a>
          <a href="#">Empleados</a>
          <a href="#">Nóminas</a>
          <a href="#">Cerrar Sesión</a>
        </nav>
      </header>
      <main>
        <h2>Resumen de Nómina</h2>
        <p>Total de pagos realizados este mes: L 0.00</p>

        <h2>Lista de Empleados</h2>
        <table border={1}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Posición</th>
              <th>Salario</th>
              <th>Horas Extra</th>
              <th>Deducciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.salary}</td>
                <td>{emp.overtimeHours}</td>
                <td>{emp.deductions.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}