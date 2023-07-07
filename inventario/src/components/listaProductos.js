import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function ListaProductos() {
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    fetchProducts();
    setShowAlert(false);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
    }
  };
  const handleDismiss = () => {
    setShowAlert(false);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/productos/${productId}`);
      fetchProducts();
      setShowAlert(true);
      setTimeout(() => {

     window.location.reload();
      }, 1000); 
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const fetchFabricante = async (codigoFabricante) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/fabricantes/${codigoFabricante}`
      );
      return response.data.nombre;
    } catch (error) {
      console.error("Error al obtener el nombre del fabricante:", error);
      return "";
    }
  };

  const getProductsWithFabricantes = async () => {
    const productsWithFabricantes = [];

    for (const product of products) {
      const fabricanteNombre = await fetchFabricante(product.codigo_fabricante);
      productsWithFabricantes.push({
        ...product,
        nombre_fabricante: fabricanteNombre,
      });
    }

    return productsWithFabricantes;
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsWithFabricantes = await getProductsWithFabricantes();
      setProducts(productsWithFabricantes);
    };

    getProducts();
  }, [products]); 

  return (
    <div className="container">
      <h2 className="text-center">Lista de Productos</h2>
      <div>
      {showAlert && (
        <Alert variant="danger" onClose={handleDismiss} dismissible>
          Producto eliminado correctamente.
        </Alert>
      )}
    </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Nombre del fabricante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.codigo}>
              <td>{product.codigo}</td>
              <td>{product.nombre}</td>
              <td>{product.precio}</td>
              <td>{product.nombre_fabricante}</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`/productos/actualizar/${product.codigo}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-edit"
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
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </a>
                &nbsp; &nbsp;  &nbsp; &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.codigo)}
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

export default ListaProductos;
