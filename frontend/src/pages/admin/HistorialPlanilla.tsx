import { useEffect, useState } from 'react';
import axios from 'axios';
import { Planilla, PagoEmpleado } from '../../types';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const HistorialPlanilla = () => {
  const [planillas, setPlanillas] = useState<Planilla[]>([]);
  const [planillaId, setPlanillaId] = useState('');
  const [pagos, setPagos] = useState<PagoEmpleado[]>([]);

  useEffect(() => {
    axios.get<Planilla[]>('/api/planillas')
      .then(res => setPlanillas(res.data))
      .catch(err => console.error(err));
  }, []);

  const obtenerHistorial = async () => {
    try {
      const res = await axios.get<PagoEmpleado[]>(`/api/pagos-empleado/planilla/${planillaId}`);
      setPagos(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const exportarCSV = () => {
    if (!pagos.length) return;
  
    const data = pagos.map(pago => ({
      Empleado: pago.empleado.nombre,
      HorasExtra: pago.horasExtra,
      Bono: pago.bono,
      Deducciones: pago.deducciones,
      SalarioTotal: pago.salarioCalculado,
    }));
  
    const csv = Papa.unparse(data);
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `planilla_${planillaId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportarPDF = () => {
    if (!pagos.length) return;
  
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text('Resumen de Planilla', 14, 20);
  
    autoTable(doc, {
      head: [['Empleado', 'Horas Extra', 'Bono', 'Deducciones', 'Salario Total']],
      body: pagos.map(pago => [
        pago.empleado.nombre,
        pago.horasExtra,
        `L ${pago.bono}`,
        `L ${pago.deducciones}`,
        `L ${pago.salarioCalculado}`
      ]),
      startY: 30
    });
  
    doc.save(`planilla_${planillaId}.pdf`);
  };


  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Historial de Planilla</h2>

      <select value={planillaId} onChange={(e) => setPlanillaId(e.target.value)} className="border p-2 w-full mb-4">
        <option value="">Seleccionar Planilla</option>
        {planillas.map(planilla => (
          <option key={planilla._id} value={planilla._id}>
            {planilla.nombre}
          </option>
        ))}
      </select>

      <button onClick={obtenerHistorial} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Ver Historial
      </button>
      <button onClick={exportarCSV} className="bg-green-600 text-white px-4 py-2 rounded ml-2">
        Exportar CSV
    </button>

    <button onClick={exportarPDF} className="bg-red-600 text-white px-4 py-2 rounded ml-2">
        Exportar PDF
    </button>


      {pagos.length > 0 && (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Empleado</th>
              <th className="border px-2 py-1">Horas Extra</th>
              <th className="border px-2 py-1">Bono</th>
              <th className="border px-2 py-1">Deducciones</th>
              <th className="border px-2 py-1">Salario Total</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago._id}>
                <td className="border px-2 py-1">{pago.empleado?.nombre}</td>
                <td className="border px-2 py-1">{pago.horasExtra}</td>
                <td className="border px-2 py-1">L {pago.bono}</td>
                <td className="border px-2 py-1">L {pago.deducciones}</td>
                <td className="border px-2 py-1 font-semibold">L {pago.salarioCalculado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialPlanilla;
