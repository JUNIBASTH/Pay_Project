import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PagoEmpleado } from '../../types';

const DetallePlanilla = () => {
  const { id } = useParams();
  const [pagos, setPagos] = useState<PagoEmpleado[]>([]);
  const [loading, setLoading] = useState(true);

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
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
        Detalles de la Planilla
      </h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Empleado</th>
              <th className="border px-2 py-1">Código</th>
              <th className="border px-2 py-1">Puesto</th>
              <th className="border px-2 py-1">Tipo de Nómina</th>
              <th className="border px-2 py-1">Salario Base</th>
              <th className="border px-2 py-1">Horas Extra</th>
              <th className="border px-2 py-1">Bonos</th>
              <th className="border px-2 py-1">Deducciones</th>
              <th className="border px-2 py-1">Total Pagado</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago._id}>
                <td className="border px-2 py-1">{pago.empleado?.nombre || '—'}</td>
                <td className="border px-2 py-1">{pago.empleado?.employeeCode || '—'}</td>
                <td className="border px-2 py-1">{pago.empleado?.position || '—'}</td>
                <td className="border px-2 py-1">Mensual</td>
                <td className="border px-2 py-1">L {pago.empleado?.salary?.toFixed(2) || '0.00'}</td>
                <td className="border px-2 py-1">{pago.horasExtra}</td>
                <td className="border px-2 py-1">L {pago.bono}</td>
                <td className="border px-2 py-1">L {pago.deducciones}</td>
                <td className="border px-2 py-1 font-semibold">L {pago.salarioCalculado}</td>
                <td className="border px-2 py-1 text-center">
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
