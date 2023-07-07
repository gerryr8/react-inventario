import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function BuscadorProductos({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/productos/buscar/${searchTerm}`);
      const results = response.data;
      setSearchResults(results);
      setNoResults(results.length === 0);
      onSearch(results);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  return (
<div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="">Inventario</a>
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="/productos">Productos</a>
      </li>
      <li className="nav-item">
      <a className="nav-link" href="/fabricantes">Fabricantes</a>
      </li>
    </ul>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="btn btn-outline-primary text-white my-2 my-sm-0" type="submit">Buscar</button>
      </form>
    </div>
  </nav>

  {searchResults.length > 0 && !noResults && (
    <div>
      <h2>Resultados de búsqueda</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result) => (
            <tr key={result.codigo}>
              <td>{result.codigo}</td>
              <td>{result.nombre}</td>
              <td>{result.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {noResults && <p>No se encontraron resultados.</p>}
</div>


  );
}

export default BuscadorProductos;
