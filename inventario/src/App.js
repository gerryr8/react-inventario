import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaProductos from "./components/listaProductos";
import FormularioProducto from "./components/formularioProducto";
import ListaFabricantes from "./components/listaFabricantes";
import FormularioFabricante from "./components/formularioFabricante";
import ActualizarFabricante from "./components/actualizarFabricante";
import ActualizarProducto from "./components/actualizarProducto";
import BuscadorProductos from "./components/buscadorProductos";
import Header from "./components/header";

function App() {
  const handleSearch = (searchTerm) => {
    console.log("Realizando búsqueda de productos:", searchTerm);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path=""
            element={<BuscadorProductos onSearch={handleSearch} />}
          />

          <Route
            path="/productos"
            element={
              <div>
                <BuscadorProductos onSearch={handleSearch} />
                <FormularioProducto />
                <ListaProductos />
              </div>
            }
          />
          <Route
            path="/fabricantes"
            element={
              <div>
                <BuscadorProductos onSearch={handleSearch} />
                <FormularioFabricante />
                <ListaFabricantes />
              </div>
            }
          />
          <Route
            path="/productos/actualizar/:id"
            element={
              <div>
              <BuscadorProductos onSearch={handleSearch} />
              <ActualizarProducto />
            </div>}
            
          />
          <Route
            path="/fabricantes/actualizar/:id"
           
            element={
              <div>
              <BuscadorProductos onSearch={handleSearch} />
              <ActualizarFabricante />
            </div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

