import EmpleadoForm, { FormData } from '../../components/EmpleadoForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditarEmpleado() {
  const { id } = useParams();
  const [datos, setDatos] = useState<Partial<FormData>>({});

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('No autorizado');
      }

      const data = await res.json();
      setDatos({
        name: data.name,
        email: data.user?.email,
        rol: data.user?.rol,
        position: data.position,
        salary: data.salary,
        employeeCode: data.employeeCode,
      });
    } catch (error) {
      console.error('Error al obtener empleado:', error);
    }
  };

  fetchData();
}, [id]);

  const handleUpdate = async (data: FormData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`, },
      
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Error al actualizar');
  };

  return <EmpleadoForm onSubmit={handleUpdate} initialData={datos} mode="editar" />;
}
