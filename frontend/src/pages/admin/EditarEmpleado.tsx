import EmpleadoForm, { FormData } from '../../components/EmpleadoForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        setDatos({
          name: data.name,
          email: data.user?.email,
          rol: data.user?.rol,
          position: data.position,
          salary: data.salary,
          employeeCode: data.employeeCode,
        });
      } catch (error) {
        console.error('Error al obtener empleado:', error);
        setMensaje('❌ Error al obtener datos del empleado');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (data: FormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error al actualizar');
      setMensaje('✅ Empleado actualizado correctamente');
    } catch (err) {
      console.error(err);
      setMensaje('❌ Hubo un error al actualizar');
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <p className="p-6">Cargando empleado...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="text-2xl font-bold mb-4">Editar Colaborador</h2>

      <div className="button-group mb-6">
        <button className="btn" onClick={() => navigate('/dashboard')}>Inicio</button>
        <button className="btn" onClick={() => navigate('/empleados')}>Empleados</button>
        <button className="btn" onClick={() => navigate('/planillas')}>Nóminas</button>
        <button className="btn" onClick={() => navigate('/register')}>Registrar Usuario</button>
        <button className="btn" onClick={() => navigate('/agregar-empleados')}>Agregar empleados</button>
        <button className="btn btn-red" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <h3 className="text-lg mb-4">{user?.name && `- Bienvenido, ${user.name}`}</h3>

      <EmpleadoForm onSubmit={handleUpdate} initialData={datos} mode="editar" />
      {mensaje && <p className="mt-4 text-blue-600">{mensaje}</p>}
    </div>
  );
}
