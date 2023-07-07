
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaProductos from "./components/listaProductos";
import FormularioProducto from "./components/formularioProducto";
import ListaFabricantes from "./components/listaFabricantes";
import FormularioFabricante from "./components/formularioFabricante";
import ActualizarFabricante from "./components/actualizarFabricante";
import ActualizarProducto from "./components/actualizarProducto";
import BuscadorProductos from "./components/buscadorProductos";
import Header from './components/header';

function App() {
  const handleSearch = (searchTerm) => {
    console.log('Realizando búsqueda de productos:', searchTerm);
  };

  return (
    <Router>
      {/* <Header/> */}
      <div>
     
  
        <Routes>
        <Route
            path=""
            element={
            
                <BuscadorProductos onSearch={handleSearch} />
               
            }/>
        
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
          <Route path="/productos/actualizar/:id" element={<ActualizarProducto />} />
          <Route path="/fabricantes/actualizar/:id" element={<ActualizarFabricante />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//  import ListaProductos from "./components/listaProductos";
//  import FormularioProducto from "./components/formularioProducto";
//  import ListaFabricantes from "./components/listaFabricantes";
//  import FormularioFabricante from "./components/formularioFabricante";
//  import ActualizarFabricante from "./components/actualizarFabricante";
//  import ActualizarProducto from "./components/actualizarProducto";
//  import BuscadorProductos from "./components/buscadorProductos";

// function App() {
//   const handleSearch = (searchTerm) => {
//     // Aquí puedes realizar la lógica para buscar productos en tu API y actualizar la lista de productos mostrada en ListaProductos.js
//     console.log('Realizando búsqueda de productos:', searchTerm);
//   };

//   return (
    
//     <Router>
//            <Routes>
//              <Route
//                path="/productos"
//                element={
//                  <div>
//                    <BuscadorProductos/>
//                    <ListaProductos />
//                    <FormularioProducto />
//                  </div>
//                }
//              />
//              <Route
//                path="/fabricantes"
//                element={
//                  <div>
//                    <ListaFabricantes />
//                    <FormularioFabricante />
//                  </div>
//                }
//              />
//              <Route path="/productos/actualizar/:id" element={<ActualizarProducto/>} />
//              <Route path="/fabricantes/actualizar/:id" element={<ActualizarFabricante/>}/>

             
//           <Route path="/productos" element={<ListaProductos />} />
//           <Route path="/productos/agregar" element={<FormularioProducto />} />
//           <Route path="/productos/actualizar/:codigo" element={<ActualizarProducto />} />
        
       
      

//              {/* <Route path="/productos/:id/update" element={<EditarProducto/>} />
//                <Route path="/fabricantes/:id/update" element={<EditarFabricante />} />
//                <Route path="/fabricantes" element={<ListaFabricantes />} /> */}
//            </Routes>
//             <BuscadorProductos onSearch={handleSearch} />
//          </Router>
//   );
// }

// export default App;





// import React from "react";

// import ListaProductos from "./components/listaProductos";
// import FormularioProducto from "./components/formularioProducto";
// import ListaFabricantes from "./components/listaFabricantes";
// import FormularioFabricante from "./components/formularioFabricante";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ActualizarFabricante from "./components/actualizarFabricante";
// import ActualizarProducto from "./components/actualizarProducto";
// import BuscadorProductos from "./components/buscadorProductos";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/productos"
//           element={
//             <div>
//               <BuscadorProductos/>
//               <ListaProductos />
//               <FormularioProducto />
//             </div>
//           }
//         />
//         <Route
//           path="/fabricantes"
//           element={
//             <div>
//               <ListaFabricantes />
//               <FormularioFabricante />
//             </div>
//           }
//         />
//         <Route path="/productos/actualizar/:id" element={<ActualizarProducto/>} />
//         <Route path="/fabricantes/actualizar/:id" element={<ActualizarFabricante/>}/>

//         {/* <Route path="/productos/:id/update" element={<EditarProducto/>} />
//           <Route path="/fabricantes/:id/update" element={<EditarFabricante />} />
//           <Route path="/fabricantes" element={<ListaFabricantes />} /> */}
//       </Routes>
//     </Router>
//   );
// }
// export default App;
