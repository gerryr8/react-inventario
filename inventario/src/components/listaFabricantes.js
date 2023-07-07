
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ListaFabricantes() {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
      fetchManufacturers();
    }, []);
  
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/fabricantes'); // Reemplaza la ruta con la URL de tu API
        setManufacturers(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de fabricantes:', error);
      }
    };
  
    const handleDelete = async (manufacturerId) => {
      try {
        await axios.delete(`http://localhost:3000/fabricantes/${manufacturerId}`); // Reemplaza la ruta con la URL de tu API
        fetchManufacturers();
      } catch (error) {
        console.error('Error al eliminar el fabricante:', error);
      }
    };
  
    return (
<div className="container">
  <h2 className="text-center">Lista de Fabricantes</h2>
  <ul className="list-group">
    {manufacturers.map((manufacturer) => (
      <li key={manufacturer.codigo} className="list-group-item d-flex justify-content-between align-items-center">
        <span>{manufacturer.nombre}</span>
        <button className="btn btn-danger" onClick={() => handleDelete(manufacturer.codigo)}>Eliminar</button>
      </li>
    ))}
  </ul>
</div>

    );
  
}

export default ListaFabricantes;
