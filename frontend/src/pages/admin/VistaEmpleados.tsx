import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Empleado {
  _id: string;
  name: string;
  email?: string;
  employeeCode: string;
  isActive: boolean;
  user?: {
    rol: string;
    email: string;
  };
}

const userData = localStorage.getItem('user');
const user = userData ? JSON.parse(userData) : null;

export default function VistaEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/employees', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Respuesta inesperada del servidor');

        setEmpleados(data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  const toggleActivo = async (id: string, nuevoEstado: boolean) => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:5000/api/employees/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: nuevoEstado }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error al cambiar estado:', errorData);
        return;
      }

      setEmpleados((prev) =>
        prev.map((emp) => (emp._id === id ? { ...emp, isActive: nuevoEstado } : emp))
      );
    } catch (error) {
      console.error('Error en toggleActivo:', error);
    }
  };

  const editarEmpleado = (id: string) => {
    navigate(`/editar-empleado/${id}`);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="text-2xl font-bold mb-4">Lista de Colaboradores</h2>

      <div className="button-group">
        <button className="btn" onClick={() => navigate('/dashboard')}>Inicio</button>
        <button className="btn" onClick={() => navigate('/empleados')}>Empleados</button>
        <button className="btn" onClick={() => navigate('/planillas')}>Nóminas</button>
        <button className="btn" onClick={() => navigate('/register')}>Registrar Usuario</button>
        <button className="btn" onClick={() => navigate('/agregar-empleados')}>Agregar empleados</button>
        <button className="btn btn-red" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <h2 className="mt-6 mb-4 text-xl">{user?.name && `- Bienvenido, ${user.name}`}</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Código</th>
            <th>Activo</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.user?.email}</td>
              <td>{emp.user?.rol}</td>
              <td>{emp.employeeCode}</td>
              <td>{emp.isActive ? '✅' : '❌'}</td>
              <td>
                <div className="flex gap-2">
                  <button className="btn" onClick={() => toggleActivo(emp._id, !emp.isActive)}>
                    {emp.isActive ? 'Desactivar' : 'Activar'}
                  </button>
                  <button className="btn" onClick={() => editarEmpleado(emp._id)}>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
