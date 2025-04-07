import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
  role?: 'admin' | 'user';
};

export default function PrivateRoute({ children, role }: Props) {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  // Si no hay token o user guardado, redirigir al login
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // Si se requiere rol específico y no lo cumple, redirigir
  if (role && user.rol !== role) {
    return <Navigate to="/" />;
  }

  return children;
}