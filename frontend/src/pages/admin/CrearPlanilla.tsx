import React, { useState } from 'react';
import axios from 'axios';

const CrearPlanilla = () => {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/planillas', {
        nombre,
        fechaInicio,
        fechaFin
      });

      setMensaje('Planilla creada con éxito');
      console.log('Planilla:', response.data);
    } catch (error: any) {
      setMensaje('Error al crear la planilla');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Planilla</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de la planilla"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Planilla
        </button>
        {mensaje && <p className="mt-2 text-green-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default CrearPlanilla;