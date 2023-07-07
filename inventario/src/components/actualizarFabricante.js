import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

function ActualizarFabricante() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    fetchFabricante();
  }, []);

  const fetchFabricante = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/fabricantes/${id}`);
      const { nombre } = response.data;
      setNombre(nombre);
      setCodigo(response.data.codigo);
    } catch (error) {
      console.error('Error al obtener el fabricante:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fabricanteData = {
      nombre,
      codigo
    };

    try {
      await axios.put(`http://localhost:3000/fabricantes/${id}`, fabricanteData);
      alert('Fabricante actualizado exitosamente');
      navigate('/fabricantes'); 
    } catch (error) {
      console.error('Error al actualizar el fabricante:', error);
      alert('Ocurrió un error al actualizar el fabricante');
    }
  };

  return (
<div className="container">
  <h2 className="text-center">Actualizar Fabricante</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        className="form-control"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary">Guardar</button>
  </form>
</div>

  );
}

export default ActualizarFabricante;
