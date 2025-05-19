import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Planilla, Empleado } from '../../types';

const AgregarEmpleadosPlanilla = () => {
  const [planillas, setPlanillas] = useState<Planilla[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
  const [planillaSeleccionada, setPlanillaSeleccionada] = useState('');

  const [horasExtraNormal, setHorasExtraNormal] = useState(0);
  const [horasExtraExtra, setHorasExtraExtra] = useState(0);
  const [bonoProductividad, setBonoProductividad] = useState(0);
  const [bonoFestivo, setBonoFestivo] = useState(0);
  const [bonoOtros, setBonoOtros] = useState(0);
  const [deudaTotal, setDeudaTotal] = useState(0);
  const [cuotaMensual, setCuotaMensual] = useState(0);
  const [cuotaActividades, setCuotaActividades] = useState(0);
  const [otrasDeducciones, setOtrasDeducciones] = useState(0);

  const horasTrabajoDiarias = 8;
  const tipoMoneda = "Lempiras";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const [resPlanillas, resEmpleados] = await Promise.all([
        axios.get<Planilla[]>('http://localhost:5000/api/planillas'),
        axios.get<Empleado[]>('http://localhost:5000/api/employees', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
      ]);
      setPlanillas(resPlanillas.data);
      setEmpleados(resEmpleados.data);
    };
    fetchData();
  }, []);

  const handleEmpleadoChange = (id: string) => {
    const empleado = empleados.find(emp => emp._id === id) || null;
    setEmpleadoSeleccionado(empleado);
  };

  const calcularPagoHora = (multiplicador: number) => {
    if (!empleadoSeleccionado?.salary) return 0;
    return ((empleadoSeleccionado.salary / 30) / 8) * multiplicador;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empleadoSeleccionado || !planillaSeleccionada) {
      alert("Debe seleccionar una planilla y un empleado.");
      return;
    }

    const salarioBase = empleadoSeleccionado.salary || 0;
    const pagoHorasNormal = horasExtraNormal * calcularPagoHora(1.25);
    const pagoHorasExtra = horasExtraExtra * calcularPagoHora(1.5);
    const totalBonos = bonoProductividad + bonoFestivo + bonoOtros;
    const totalDeducciones = deudaTotal + cuotaMensual + cuotaActividades + otrasDeducciones;

    const salarioCalculado = salarioBase + pagoHorasNormal + pagoHorasExtra + totalBonos - totalDeducciones;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/pagos-empleado', {
        empleado: empleadoSeleccionado._id,
        planilla: planillaSeleccionada,
        horasExtraNormal,
        horasExtraExtra,
        bonoProductividad,
        bonoFestivo,
        bonoOtros,
        deudaTotal,
        cuotaMensual,
        cuotaActividades,
        otrasDeducciones,
        salarioCalculado,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Empleado agregado exitosamente a la planilla.");
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar los datos.");
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <h2 className="text-2xl font-bold mb-6">Agregar Empleado a Planilla</h2>

      <form onSubmit={handleSubmit}>
        <label>Seleccionar Planilla</label>
        <select
          value={planillaSeleccionada}
          onChange={(e) => setPlanillaSeleccionada(e.target.value)}
          required
          style={selectStyle}
        >
          <option value="">-- Seleccione --</option>
          {planillas.map(planilla => (
            <option key={planilla._id} value={planilla._id}>{planilla.nombre}</option>
          ))}
        </select>

        <label>Seleccionar Empleado</label>
        <select
          onChange={(e) => handleEmpleadoChange(e.target.value)}
          required
          style={selectStyle}
        >
          <option value="">-- Seleccione --</option>
          {empleados.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        {empleadoSeleccionado && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div style={boxStyle}>
                <h3 className="font-semibold text-lg mb-2">Datos Básicos</h3>
                <p><strong>Salario:</strong> L {empleadoSeleccionado.salary}</p>
                <p><strong>Rol:</strong> {empleadoSeleccionado.position}</p>
                <p><strong>Tipo de Moneda:</strong> {tipoMoneda}</p>
                <p><strong>Horas Trabajadas:</strong> {horasTrabajoDiarias}</p>
              </div>

              <div style={boxStyle}>
                <h3 className="font-semibold text-lg mb-2">Horas Extra</h3>
                <label>Horas Extra Normales</label>
                <input type="number" value={horasExtraNormal} onChange={e => setHorasExtraNormal(Number(e.target.value))} style={inputStyle} />
                <p>Pago por hora (1.25x): L {calcularPagoHora(1.25).toFixed(2)}</p>
                <label>Horas Extra Extraordinarias</label>
                <input type="number" value={horasExtraExtra} onChange={e => setHorasExtraExtra(Number(e.target.value))} style={inputStyle} />
                <p>Pago por hora (1.5x): L {calcularPagoHora(1.5).toFixed(2)}</p>
              </div>

              <div style={boxStyle}>
                <h3 className="font-semibold text-lg mb-2">Bonos</h3>
                <label>Bono Productividad</label>
                <input type="number" value={bonoProductividad} onChange={e => setBonoProductividad(Number(e.target.value))} style={inputStyle} />
                <label>Bono Festivos</label>
                <input type="number" value={bonoFestivo} onChange={e => setBonoFestivo(Number(e.target.value))} style={inputStyle} />
                <label>Otros Bonos</label>
                <input type="number" value={bonoOtros} onChange={e => setBonoOtros(Number(e.target.value))} style={inputStyle} />
              </div>

              <div style={boxStyle}>
                <h3 className="font-semibold text-lg mb-2">Deducciones</h3>
                <label>Deuda Total</label>
                <input type="number" value={deudaTotal} onChange={e => setDeudaTotal(Number(e.target.value))} style={inputStyle} />
                <label>Cuota Mensual</label>
                <input type="number" value={cuotaMensual} onChange={e => setCuotaMensual(Number(e.target.value))} style={inputStyle} />
                <label>Cuota por Actividades</label>
                <input type="number" value={cuotaActividades} onChange={e => setCuotaActividades(Number(e.target.value))} style={inputStyle} />
                <label>Otras Deducciones</label>
                <input type="number" value={otrasDeducciones} onChange={e => setOtrasDeducciones(Number(e.target.value))} style={inputStyle} />
              </div>
            </div>

            <div className="button-group mt-6">
              <button className="btn btn-red" type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
              <button className="btn" type="submit">Guardar</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

const selectStyle = {
  marginBottom: '12px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
};

const inputStyle = {
  marginBottom: '12px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
};

const boxStyle = {
  flex: '1 1 300px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '16px',
  backgroundColor: '#f9f9f9',
};

export default AgregarEmpleadosPlanilla;
