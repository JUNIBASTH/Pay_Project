import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Planilla, Empleado } from '../../types';
import jsPDF from 'jspdf';

const AgregarEmpleadosPlanilla = () => {
  const [planillas, setPlanillas] = useState<Planilla[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
  const [planillaSeleccionada, setPlanillaSeleccionada] = useState('');
  const [resumen, setResumen] = useState<any>(null);
  const resumenRef = useRef<HTMLDivElement | null>(null);
  const [yaGuardado, setYaGuardado] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Resumen de pago - ${resumen.nombre}`, 10, 20);
    doc.text(`Email: ${resumen.email}`, 10, 30);
    doc.text(`Salario Base: L ${resumen.salarioBase}`, 10, 40);
    doc.text(`Horas Extra (Normal): L ${resumen.pagoHorasNormal}`, 10, 50);
    doc.text(`Horas Extra (Extra): L ${resumen.pagoHorasExtra}`, 10, 60);
    doc.text(`Bonificaciones: L ${resumen.totalBonos}`, 10, 70);
    doc.text(`Deducciones: L ${resumen.totalDeducciones}`, 10, 80);
    doc.text(`Total Calculado: L ${resumen.salarioCalculado}`, 10, 90);
    doc.save(`Resumen_${resumen.nombre}.pdf`);
  };
  const enviarPDFPorCorreo = async () => {
  if (!resumen || !resumen.email) {
    alert("❌ No hay resumen o email disponible.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`Resumen de pago - ${resumen.nombre}`, 10, 20);
  doc.text(`Email: ${resumen.email}`, 10, 30);
  doc.text(`Salario Base: L ${resumen.salarioBase}`, 10, 40);
  doc.text(`Horas Extra (Normal): L ${resumen.pagoHorasNormal}`, 10, 50);
  doc.text(`Horas Extra (Extra): L ${resumen.pagoHorasExtra}`, 10, 60);
  doc.text(`Bonificaciones: L ${resumen.totalBonos}`, 10, 70);
  doc.text(`Deducciones: L ${resumen.totalDeducciones}`, 10, 80);
  doc.text(`Total Calculado: L ${resumen.salarioCalculado}`, 10, 90);

  const pdfBlob = doc.output('blob');
  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'ResumenDePago.pdf');
  formData.append('email', resumen.email);

  try {
    await axios.post('http://localhost:5000/api/pdf/send-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('✅ PDF enviado con éxito por correo');
  } catch (error) {
    console.error(error);
    alert('❌ Error al enviar el correo');
  }
};


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
    if (!empleadoSeleccionado || !planillaSeleccionada || yaGuardado) return;

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

      setResumen({
        nombre: empleadoSeleccionado.name,
        email: empleadoSeleccionado.user?.email || 'No disponible',
        salarioBase,
        pagoHorasNormal,
        pagoHorasExtra,
        totalBonos,
        totalDeducciones,
        salarioCalculado,
      });
      setYaGuardado(true);

      setTimeout(() => {
        resumenRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);

    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar los datos.");
    }
  };

  return (
    <div style={{ maxWidth: '100%', padding: '24px' }}>
      <h1>Agregar Empleado a Planilla</h1>

      <div className="button-group">
        <button className="btn" onClick={() => navigate('/dashboard')}>Inicio</button>
        <button className="btn" onClick={() => navigate('/empleados')}>Empleados</button>
        <button className="btn" onClick={() => navigate('/planillas')}>Nóminas</button>
        <button className="btn" onClick={() => navigate('/register')}>Registrar Usuario</button>
        <button className="btn" onClick={() => navigate('/agregar-empleados')}>Agregar empleados</button>
        <button className="btn btn-red" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Seleccionar Planilla</label>
        <select value={planillaSeleccionada} onChange={(e) => setPlanillaSeleccionada(e.target.value)} required style={selectStyle}>
          <option value="">-- Seleccione --</option>
          {planillas.map(planilla => (
            <option key={planilla._id} value={planilla._id}>{planilla.nombre}</option>
          ))}
        </select>

        <label>Seleccionar Empleado</label>
        <select onChange={(e) => handleEmpleadoChange(e.target.value)} required style={selectStyle}>
          <option value="">-- Seleccione --</option>
          {empleados.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        {empleadoSeleccionado && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '20px' }}>
              <div style={boxStyle}>
                <h3>Datos Básicos</h3>
                <p><strong>Salario:</strong> L {empleadoSeleccionado.salary}</p>
                <p><strong>Rol:</strong> {empleadoSeleccionado.position}</p>
                <p><strong>Tipo de Moneda:</strong> {tipoMoneda}</p>
                <p><strong>Horas Trabajadas:</strong> {horasTrabajoDiarias}</p>
              </div>

              <div style={boxStyle}>
                <h3>Horas Extra</h3>
                <label>Horas Extra Normales</label>
                <input type="number" value={horasExtraNormal} onChange={e => setHorasExtraNormal(Number(e.target.value))} style={inputStyle} />
                <p>Pago por hora (1.25x): L {calcularPagoHora(1.25).toFixed(2)}</p>

                <label>Horas Extra Extraordinarias</label>
                <input type="number" value={horasExtraExtra} onChange={e => setHorasExtraExtra(Number(e.target.value))} style={inputStyle} />
                <p>Pago por hora (1.5x): L {calcularPagoHora(1.5).toFixed(2)}</p>
              </div>

              <div style={boxStyle}>
                <h3>Bonos</h3>
                <label>Bono Productividad</label>
                <input type="number" value={bonoProductividad} onChange={e => setBonoProductividad(Number(e.target.value))} style={inputStyle} />
                <label>Bono Festivos</label>
                <input type="number" value={bonoFestivo} onChange={e => setBonoFestivo(Number(e.target.value))} style={inputStyle} />
                <label>Otros Bonos</label>
                <input type="number" value={bonoOtros} onChange={e => setBonoOtros(Number(e.target.value))} style={inputStyle} />
              </div>

              <div style={boxStyle}>
                <h3>Deducciones</h3>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button type="button" onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#f1f1f1', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button type="submit" disabled={yaGuardado} style={{ backgroundColor: yaGuardado ? '#ccc' : '#12C48B', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '6px', cursor: yaGuardado ? 'not-allowed' : 'pointer' }}>
                Guardar
              </button>
            </div>
          </>
        )}
      </form>

      {resumen && (
        <div ref={resumenRef} style={{ marginTop: '24px', border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
          <h3>Resumen de Pago</h3>
          <p><strong>Empleado:</strong> {resumen.nombre}</p>
          <p><strong>Email:</strong> {resumen.email}</p>
          <p><strong>Salario Base:</strong> L {resumen.salarioBase}</p>
          <p><strong>Pago Horas Extra (Normal):</strong> L {resumen.pagoHorasNormal.toFixed(2)}</p>
          <p><strong>Pago Horas Extra (Extra):</strong> L {resumen.pagoHorasExtra.toFixed(2)}</p>
          <p><strong>Bonificaciones:</strong> L {resumen.totalBonos.toFixed(2)}</p>
          <p><strong>Deducciones:</strong> L {resumen.totalDeducciones.toFixed(2)}</p>
          <p><strong>Salario Final:</strong> L {resumen.salarioCalculado.toFixed(2)}</p>
          <div style={{ marginTop: '16px' }}>
            <button onClick={generarPDF} style={{ marginRight: '12px' }}>📄 Generar PDF</button>
            <button onClick={enviarPDFPorCorreo} style={{ marginLeft: '12px' }}>
              📧 Enviar PDF por correo
            </button>
            <button onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
          </div>
        </div>
      )}
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
