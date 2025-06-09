import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PagoEmpleado } from '../../types';
import { useNavigate } from 'react-router-dom';


const DetallePlanilla = () => {
  const { id } = useParams();
  const [pagos, setPagos] = useState<PagoEmpleado[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await axios.get<PagoEmpleado[]>(`http://localhost:5000/api/pagos-empleado/planilla/${id}`);
        setPagos(res.data);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      fetchPagos();
    } else {
      console.warn('ID de planilla inválido:', id);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Detalle de la Planilla</h1>

      {/* Botones en una sola línea */}
      <div className="button-group">
        <button className="btn" onClick={() => navigate('/dashboard')}>Inicio</button>
        <button className="btn" onClick={() => navigate('/empleados')}>Empleados</button>
        <button className="btn" onClick={() => navigate('/planillas')}>Nóminas</button>
        <button className="btn" onClick={() => navigate('/register')}>Registrar Usuario</button>
        <button className="btn" onClick={() => navigate('/agregar-empleados')}>Pagar empleados</button>
        <button className="btn btn-red" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 overflow-auto">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Código</th>
              <th>Puesto</th>
              <th>Tipo de Nómina</th>
              <th>Salario Base</th>
              <th>Horas Extra</th>
              <th>Bonos</th>
              <th>Deducciones</th>
              <th>Total Pagado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago._id}>
                <td>{pago.empleado?.name || '—'}</td>
                <td>{pago.empleado?.user?.email || '—'}</td>
                <td>{pago.empleado?.user?.rol || '—'}</td>
                <td>{pago.empleado?.employeeCode || '—'}</td>
                <td>{pago.empleado?.position || '—'}</td>
                <td>Mensual</td>
                <td>L {pago.empleado?.salary?.toFixed(2) || '0.00'}</td>
                <td>{pago.horasExtra}</td>
                <td>L {pago.bono}</td>
                <td>L {pago.deducciones}</td>
                <td className="font-semibold">L {pago.salarioCalculado}</td>
                <td className="text-center">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetallePlanilla;
