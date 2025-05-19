import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface Empleado {
  name: string;
  position: string;
  salary: number;
  overtimeHours: number;
  deductions: number[];
}


const colores = ['#12C48B', '#5DADE2', '#F4D03F', '#EC7063'];

const userData = localStorage.getItem('user');
const user = userData ? JSON.parse(userData) : null;

const Dashboard = () => {
  const [datosEmpleados, setDatosEmpleados] = useState<
  { nombre: string; salario: number; bono: number; rol: string }[]
>([]);

const [datosPorRol, setDatosPorRol] = useState<
  { name: string; value: number }[]
>([]);
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/employees', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
        const data: Empleado[] = await response.json();
  
        setEmpleados(data);
  
        // Generar datos para el gráfico de barras
        const datosTransformados = data.map((emp: Empleado) => ({
          nombre: emp.name,
          salario: emp.salary,
          bono: emp.overtimeHours * 100, // puedes ajustar esta lógica
          rol: emp.position
        }));
        setDatosEmpleados(datosTransformados);
  
        // Generar datos para el gráfico circular
        const conteoRol: Record<string, number> = {};
        datosTransformados.forEach(emp => {
          conteoRol[emp.rol] = (conteoRol[emp.rol] || 0) + 1;
        });
        const datosRol = Object.entries(conteoRol).map(([name, value]) => ({ name, value }));
        setDatosPorRol(datosRol);
  
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };
  
    fetchEmpleados();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Panel de Administrador</h1>

      {/* Botones en una sola línea */}
      <div className="button-group">
        <button className="btn" onClick={() => navigate('/dashboard')}>Inicio</button>
        <button className="btn" onClick={() => navigate('/empleados')}>Empleados</button>
        <button className="btn" onClick={() => navigate('/planillas')}>Nóminas</button>
        <button className="btn" onClick={() => navigate('/register')}>Registrar Usuario</button>
        <button className="btn" onClick={() => navigate('/agregar-empleados')}>Agregar empleados</button>
        <button className="btn btn-red" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>
        {user?.name && `- Bienvenido, ${user.name}`}
      </h1>
      {/* Tabla de empleados */}
      <section id="empleados">
        <h2 style={{ fontSize: '20px', marginTop: '40px' }}>Lista de Empleados</h2>
        <table className="dashboard-table">
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
                <td>L {emp.salary}</td>
                <td>{emp.overtimeHours}</td>
                <td>{Array.isArray(emp.deductions) ? emp.deductions.join(', ') : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

  <div className="bg-white rounded-xl p-4 shadow">
    <h3 className="text-lg font-semibold mb-2">Salario por Empleado</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datosEmpleados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="salario" fill="#12C48B" />
        <Bar dataKey="bono" fill="#5DADE2" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="bg-white rounded-xl p-4 shadow">
    <h3 className="text-lg font-semibold mb-2">Distribución por Rol</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={datosPorRol}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {datosPorRol.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

</div>
      </section>
    </div>
  );
};

export default Dashboard;
