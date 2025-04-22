import React, { useState, useEffect } from 'react';
import { Planilla, Empleado } from '../../types';
import axios from 'axios';

const AgregarEmpleadosPlanilla = () => {
    const [planillas, setPlanillas] = useState<Planilla[]>([]);
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [planillaSeleccionada, setPlanillaSeleccionada] = useState('');
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
    const [horasExtra, setHorasExtra] = useState(0);
    const [bono, setBono] = useState(0);
    const [deducciones, setDeducciones] = useState(0);
    const [mensaje, setMensaje] = useState('');

  // Cargar planillas existentes
  useEffect(() => {
    const fetchPlanillas = async () => {
        const res = await axios.get<Planilla[]>('http://localhost:5000/api/planillas');
        setPlanillas(res.data);
      };
      
      const fetchEmpleados = async () => {
        const res = await axios.get<Empleado[]>('http://localhost:5000/api/empleados');
        setEmpleados(res.data);
      };

    fetchPlanillas();
    fetchEmpleados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const salarioBase = empleados.find(emp => emp._id === empleadoSeleccionado)?.salario || 0;
      const salarioCalculado = salarioBase + (horasExtra * 100) + bono - deducciones; // Puedes personalizar la fórmula

      await axios.post('http://localhost:5000/api/pagos-empleado', {
        empleado: empleadoSeleccionado,
        planilla: planillaSeleccionada,
        horasExtra,
        bono,
        deducciones,
        salarioCalculado
      });

      setMensaje('Empleado agregado a la planilla exitosamente');
    } catch (error) {
      console.error(error);
      setMensaje('Error al agregar empleado a la planilla');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Agregar Empleado a Planilla</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={planillaSeleccionada} onChange={(e) => setPlanillaSeleccionada(e.target.value)} className="border p-2 w-full" required>
          <option value="">Seleccionar Planilla</option>
          {planillas.map((planilla) => (
            <option key={planilla._id} value={planilla._id}>
              {planilla.nombre}
            </option>
          ))}
        </select>

        <select value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)} className="border p-2 w-full" required>
          <option value="">Seleccionar Empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado._id} value={empleado._id}>
              {empleado.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Horas Extra"
          value={horasExtra}
          onChange={(e) => setHorasExtra(parseInt(e.target.value))}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Bono"
          value={bono}
          onChange={(e) => setBono(parseInt(e.target.value))}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Deducciones"
          value={deducciones}
          onChange={(e) => setDeducciones(parseInt(e.target.value))}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Agregar a Planilla
        </button>

        {mensaje && <p className="mt-2 text-green-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default AgregarEmpleadosPlanilla;
