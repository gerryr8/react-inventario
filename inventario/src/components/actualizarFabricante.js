import React, { useState } from 'react';
import axios from 'axios';

function ActualizarFabricante({ manufacturerId }) {
  const [nombre, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manufacturerData = {
      nombre,
    };

    try {
      await axios.put(`http://localhost:3000/fabricantes/${manufacturerId}`, manufacturerData); // Reemplaza la ruta con la URL de tu API
      alert('Fabricante actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el fabricante:', error);
      alert('Ocurrió un error al actualizar el fabricante');
    }
  };

  return (
    <div>
      <h2>Actualizar Fabricante</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default ActualizarFabricante;
