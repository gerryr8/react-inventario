import axios from "axios";
import React, { useState, useEffect } from "react";

function ListaFabricantes() {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fabricantes");
      setManufacturers(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de fabricantes:", error);
    }
  };

  const handleDelete = async (manufacturerId) => {
    try {
      await axios.delete(`http://localhost:3000/fabricantes/${manufacturerId}`);
      fetchManufacturers();
    } catch (error) {
      console.error("Error al eliminar el fabricante:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de Fabricantes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => (
            <tr key={manufacturer.codigo}>
              <td>{manufacturer.nombre}</td>
              <td>
                <a
                  className="btn btn-warning"
                  href={`/fabricantes/actualizar/${manufacturer.codigo}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-edit"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </a>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(manufacturer.codigo)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-trash-x"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7h16" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    <path d="M10 12l4 4m0 -4l-4 4" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaFabricantes;
