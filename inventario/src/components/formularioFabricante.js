import React, { useState } from 'react';
import axios from 'axios';

function FormularioFabricante() {
    const [nombre, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manufacturerData = {
      nombre,
    };

    try {
      await axios.post('http://localhost:3000/fabricantes', manufacturerData); // Reemplaza la ruta con la URL de tu API
      setName('');
      alert('Fabricante agregado exitosamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar el fabricante:', error);
      alert('Ocurrió un error al agregar el fabricante');
    }
  };

  return (
<div className="container">
  <h2 className="text-center">Agregar Fabricante</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="nombre">Nombre:</label>
      <input
        required
        type="text"
        className="form-control"
        id="nombre"
        value={nombre}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary">Guardar</button>
  </form>
</div>

  );

}

export default FormularioFabricante;
