import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';

const userData = localStorage.getItem('user');
const user = userData ? JSON.parse(userData) : null;

const DashboardUser = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Panel de Usuario</h1>

      <div className="button-group">
        <button className="btn" onClick={() => alert('Pestaña 1')}>Pestaña 1</button>
        <button className="btn" onClick={() => alert('Pestaña 2')}>Pestaña 2</button>
        <button className="btn btn-red" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
        {user?.name && `Bienvenido, ${user.name}`}
      </h1>
      <p>Este es tu panel personal. Pronto se agregarán funcionalidades específicas para ti como empleado.</p>
    </div>
  );
};

export default DashboardUser;
