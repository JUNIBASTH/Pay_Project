import { useState } from 'react';
import '../styles/styles.css'; // Asegurate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setMessage('Credenciales inválidas');
        return;
      }

      const data = await response.json();
      setMessage('Login exitoso ✅');
      console.log('Token:', data.token);
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      setMessage('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      {/* Logo opcional */}
      {/* <img src="/logo.svg" alt="Logo" /> */}
  
      <h1>Login</h1>
  
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        <div className="forgot">Forgot password?</div>
  
        <button type="submit">Sign In</button>
      </form>
  
      {message && <div id="message">{message}</div>}
    </div>
  );
}