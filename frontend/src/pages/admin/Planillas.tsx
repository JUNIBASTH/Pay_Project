import { useEffect, useState } from 'react';
import axios from 'axios';
import { Planilla, PagoEmpleado } from '../../types';
import { useNavigate } from 'react-router-dom';

const Planillas = () => {
  const [planillas, setPlanillas] = useState<Planilla[]>([]);
  const [pagos, setPagos] = useState<Record<string, PagoEmpleado[]>>({});
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlanillas();
  }, []);

  const fetchPlanillas = async () => {
    try {
      const res = await axios.get<Planilla[]>('http://localhost:5000/api/planillas');
      setPlanillas(res.data);

      const pagosPorPlanilla: Record<string, PagoEmpleado[]> = {};
      for (const p of res.data) {
        if (!/^[0-9a-fA-F]{24}$/.test(p._id)) {
          console.warn(`Planilla con ID inválido: ${p._id}, se omitirá`);
          continue;
        }

        try {
          const resp = await axios.get<PagoEmpleado[]>(`/api/pagos-empleado/planilla/${p._id}`);
          pagosPorPlanilla[p._id] = resp.data;
        } catch (error) {
          console.error(`Error al obtener pagos para planilla ${p._id}:`, error);
          pagosPorPlanilla[p._id] = [];
        }
      }
      setPagos(pagosPorPlanilla);
    } catch (err) {
      console.error('Error al cargar planillas:', err);
    }
  };

  const calcularTotalPago = (planillaId: string): number => {
    const pagosPlanilla = pagos[planillaId];
    if (!Array.isArray(pagosPlanilla)) return 0;
    return pagosPlanilla.reduce((acc, pago) => acc + pago.salarioCalculado, 0);
  };

  const handleCrearPlanilla = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/planillas', {
        nombre,
        fechaInicio,
        fechaFin,
      });
      setMensaje('✅ Planilla creada con éxito');
      setShowModal(false);
      setNombre('');
      setFechaInicio('');
      setFechaFin('');
      fetchPlanillas();
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al crear planilla');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Planillas</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/agregar-empleados')}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Agregar Empleado
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Crear Planilla
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 overflow-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Fecha Inicio</th>
              <th className="border px-2 py-1">Fecha Fin</th>
              <th className="border px-2 py-1">Colaboradores</th>
              <th className="border px-2 py-1">Total Pagado</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planillas.map((planilla) => (
              <tr key={planilla._id}>
                <td className="border px-2 py-1">{planilla.nombre}</td>
                <td className="border px-2 py-1">{planilla.fechaInicio?.slice(0, 10)}</td>
                <td className="border px-2 py-1">{planilla.fechaFin?.slice(0, 10)}</td>
                <td className="border px-2 py-1">{pagos[planilla._id]?.length || 0}</td>
                <td className="border px-2 py-1 font-semibold">L {calcularTotalPago(planilla._id).toFixed(2)}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => navigate(`/detalle-planilla/${planilla._id}`)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear planilla */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Nueva Planilla</h2>
            <form onSubmit={handleCrearPlanilla} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre de la planilla"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border p-2 w-full"
                required
              />
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border p-2 w-full"
                required
              />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="border p-2 w-full"
                required
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
              {mensaje && <p className="text-green-600 mt-2">{mensaje}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planillas;
