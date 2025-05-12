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
      const salarioCalculado = salarioBase + (horasExtra * 100) + bono - deducciones;

      await axios.post('http://localhost:5000/api/pagos-empleado', {
        empleado: empleadoSeleccionado,
        planilla: planillaSeleccionada,
        horasExtra,
        bono,
        deducciones,
        salarioCalculado
      });

      setMensaje('Empleado agregado a la planilla exitosamente ✅');
    } catch (error) {
      console.error(error);
      setMensaje('Error al agregar empleado a la planilla');
    }
  };

  return (
    <div className="login-container">
      <h1>Agregar Empleado a Planilla</h1>
      <form onSubmit={handleSubmit}>

        <label>Seleccionar Planilla</label>
        <select
          value={planillaSeleccionada}
          onChange={(e) => setPlanillaSeleccionada(e.target.value)}
          required
          style={{ marginBottom: '12px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
        >
          <option value="">-- Seleccione --</option>
          {planillas.map((planilla) => (
            <option key={planilla._id} value={planilla._id}>
              {planilla.nombre}
            </option>
          ))}
        </select>

        <label>Seleccionar Empleado</label>
        <select
          value={empleadoSeleccionado}
          onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
          required
          style={{ marginBottom: '12px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
        >
          <option value="">-- Seleccione --</option>
          {empleados.map((empleado) => (
            <option key={empleado._id} value={empleado._id}>
              {empleado.nombre}
            </option>
          ))}
        </select>

        <label>Horas Extra</label>
        <input
          type="number"
          placeholder="Horas Extra"
          value={horasExtra}
          onChange={(e) => setHorasExtra(parseInt(e.target.value))}
        />

        <label>Bono</label>
        <input
          type="number"
          placeholder="Bono"
          value={bono}
          onChange={(e) => setBono(parseInt(e.target.value))}
        />

        <label>Deducciones</label>
        <input
          type="number"
          placeholder="Deducciones"
          value={deducciones}
          onChange={(e) => setDeducciones(parseInt(e.target.value))}
        />

        <button type="submit">Agregar a Planilla</button>
      </form>

      {mensaje && <p style={{ marginTop: '16px', color: '#12C48B' }}>{mensaje}</p>}
    </div>
  );
};

export default AgregarEmpleadosPlanilla;
