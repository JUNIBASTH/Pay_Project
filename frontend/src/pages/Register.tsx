import { useState } from 'react';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('user');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      if (!response.ok) {
        setMessage('Error al registrar el usuario');
        return;
      }

      const data = await response.json();
      setMessage('Usuario registrado exitosamente ✅');
      console.log(data);
    } catch (error) {
      console.error(error);
      setMessage('Error al registrar');
    }
  };

  return (
    <div className="login-container">
      <h1>Registrar Usuario</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="rol">Rol</label>
        <select
          id="rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
        >
          <option value="user">Empleado</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Registrar</button>
      </form>

      {message && <p style={{ marginTop: '16px', color: '#12C48B' }}>{message}</p>}
    </div>
  );
}
