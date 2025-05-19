//import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


interface Empleado {
  _id: string;
  name: string;
  email?: string;
  employeeCode: string;
  isActive: boolean;
  user?: {
    rol: string;
    email: string;
  };
}

export default function VistaEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchEmpleados = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('No autorizado');
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error('Respuesta inesperada del servidor');
      }

      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  fetchEmpleados();
}, []);

  const toggleActivo = async (id: string, nuevoEstado: boolean) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000/api/employees/${id}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔐 Token aquí
      },
      body: JSON.stringify({ isActive: nuevoEstado }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error al cambiar estado:', errorData);
      return;
    }

    setEmpleados((prev) =>
      prev.map((emp) => (emp._id === id ? { ...emp, isActive: nuevoEstado } : emp))
    );
  } catch (error) {
    console.error('Error en toggleActivo:', error);
  }
};

  const editarEmpleado = (id: string) => {
    navigate(`/editar-empleado/${id}`);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Lista de Colaboradores</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Código</th>
            <th>Activo</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.user?.email}</td>
                <td>{emp.user?.rol}</td>
                <td>{emp.employeeCode}</td>
                <td>{emp.isActive ? '✅' : '❌'}</td>
              <td>
                <div className="relative">
                  <button className="btn" onClick={() => toggleActivo(emp._id, !emp.isActive)}>
                    {emp.isActive ? 'Desactivar' : 'Activar'}
                  </button>
                  <button className="btn" onClick={() => editarEmpleado(emp._id)}>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

