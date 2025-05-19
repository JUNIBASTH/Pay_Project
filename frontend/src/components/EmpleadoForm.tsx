import { useState, useEffect } from 'react';

interface Props {
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  mode?: 'crear' | 'editar';
}

export interface FormData {
  name: string;
  email: string;
  password?: string;
  rol: string;
  position: string;
  salary: number;
  employeeCode: string;
}

export default function EmpleadoForm({ initialData = {}, onSubmit, mode = 'crear' }: Props) {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    rol: 'user',
    position: '',
    salary: 0,
    employeeCode: '',
    ...initialData,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: id === 'salary' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(form);
      setMessage(`Usuario ${mode === 'editar' ? 'actualizado' : 'registrado'} exitosamente ✅`);
    } catch (err) {
      setMessage('Ocurrió un error.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h1>{mode === 'editar' ? 'Editar Usuario' : 'Registrar Usuario'}</h1>

      <label htmlFor="name">Nombre</label>
      <input id="name" value={form.name} onChange={handleChange} required />

      <label htmlFor="email">Correo electrónico</label>
      <input id="email" type="email" value={form.email} onChange={handleChange} required />

      {mode === 'crear' && (
        <>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" value={form.password} onChange={handleChange} required />
        </>
      )}

      <label htmlFor="rol">Rol</label>
      <select id="rol" value={form.rol} onChange={handleChange}>
        <option value="user">Empleado</option>
        <option value="admin">Admin</option>
      </select>

      <label htmlFor="position">Puesto</label>
      <input id="position" value={form.position} onChange={handleChange} required />

      <label htmlFor="salary">Salario</label>
      <input id="salary" type="number" value={form.salary} onChange={handleChange} required />

      <label htmlFor="employeeCode">Código de empleado</label>
      <input id="employeeCode" value={form.employeeCode} onChange={handleChange} required />

      <button type="submit" style={{ marginTop: '20px' }}>
        {mode === 'editar' ? 'Guardar cambios' : 'Registrar'}
      </button>

      {message && <p style={{ marginTop: '16px', color: '#12C48B' }}>{message}</p>}
    </form>
  );
}