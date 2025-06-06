import EmpleadoForm, { FormData } from '../components/EmpleadoForm';

export default function Register() {
  const handleRegister = async (data: FormData) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Registro fallido');
  };

  return <EmpleadoForm onSubmit={handleRegister} mode="crear" />;
}