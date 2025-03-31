import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <div>
        <h1>Bienvenido</h1>
        <p>Este es mi sistema de nómina</p>
        <Link to="/login">Iniciar sesión</Link> | <Link to="/register">Registrarse</Link>
      </div>
    );
  }