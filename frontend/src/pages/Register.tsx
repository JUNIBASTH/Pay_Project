import EmpleadoForm, { FormData } from '../components/EmpleadoForm';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const handleRegister = async (data: FormData) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Registro fallido');
  };

  return (
    <div className="p-6">
      {/* ✅ Botones de navegación FUERA del formulario */}
      <div className="button-group mb-6">
        <button className="btn" onClick={() => navigate('/dashboard')}>Inicio</button>
        <button className="btn" onClick={() => navigate('/empleados')}>Empleados</button>
        <button className="btn" onClick={() => navigate('/planillas')}>Nóminas</button>
        <button className="btn" onClick={() => navigate('/register')}>Registrar Usuario</button>
        <button className="btn" onClick={() => navigate('/agregar-empleados')}>Pagar empleados</button>
        <button
          className="btn btn-red"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }}
        >
          Cerrar sesión
        </button>
      </div>
      <div className="login-container">
        <EmpleadoForm onSubmit={handleRegister} mode="crear" />
      </div>
    </div>
    
  );
}