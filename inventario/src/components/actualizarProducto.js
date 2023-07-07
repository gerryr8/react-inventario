import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ActualizarFabricante from './actualizarFabricante';

function ActualizarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [codigoFabricante, setCodigoFabricante] = useState('');
  const [fabricantes, setFabricantes] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchFabricantes();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/productos/${id}`);
      const { nombre, precio, codigo_fabricante } = response.data;
      setNombre(nombre);
      setPrecio(precio);
      setCodigoFabricante(codigo_fabricante);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  };

  const fetchFabricantes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fabricantes');
      setFabricantes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de fabricantes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      nombre,
      precio,
      codigo_fabricante: codigoFabricante,
    };

    try {
      await axios.put(`http://localhost:3000/productos/${id}`, productData);
      alert('Producto actualizado exitosamente');
      navigate('/productos'); // Redireccionar a la lista de productos
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Ocurrió un error al actualizar el producto');
    }
  };

  return (
<div className="container">
  <h2 className="text-center">Actualizar Producto</h2>
  <form onSubmit={handleSubmit} className="needs-validation">
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
    <div className="form-group">
      <label htmlFor="precio">Precio:</label>
      <input
        type="text"
        className="form-control"
        id="precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="codigoFabricante">Código de Fabricante:</label>
      <select
        className="form-control"
        id="codigoFabricante"
        value={codigoFabricante}
        onChange={(e) => setCodigoFabricante(e.target.value)}
      >
        <option value="">Seleccione un fabricante</option>
        {fabricantes.map((fabricante) => (
          <option key={fabricante.codigo} value={fabricante.codigo}>
            {fabricante.nombre}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Actualizar</button>
  </form>
</div>

  );
}

export default ActualizarProducto;
