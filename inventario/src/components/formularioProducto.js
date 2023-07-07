import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

function FormularioProducto() {

    const [nombre, setName] = useState('');
    const [precio, setPrice] = useState('');
    const [codigo_fabricante, setManufacturer] = useState('');
    const [fabricantes, setManufacturers] = useState([]);

    const [showAlert, setShowAlert] = useState(true);


  
    useEffect(() => {
      setShowAlert(false);
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

    const handleDismiss = () => {
      setShowAlert(false);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const productData = {
        nombre,
        precio,
        codigo_fabricante,
      };
  
      try {
        await axios.post('http://localhost:3000/productos', productData); // Reemplaza la ruta con la URL de tu API
        setName('');
        setPrice('');
        setManufacturer('');
        setShowAlert(true);
        setTimeout(() => {
          window.location.reload(); 
        }, 2000); 
      } catch (error) {
        console.error('Error al agregar el producto:', error);
        alert('Ocurrió un error al agregar el producto');
      }
    }      
  
      return (
<div className="container">
  <h2 className="text-center">Agregar Producto</h2>
  <div>
      {showAlert && (
        <Alert variant="success" onClose={handleDismiss} dismissible>
          Producto agregado correctamente.
        </Alert>
      )}
    </div>
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
    <div className="form-group">
      <label htmlFor="precio">Precio:</label>
      <input
        type="text"
        className="form-control"
        id="precio"
        value={precio}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="fabricante">Fabricante:</label>
      <select
        required
        className="form-control"
        id="fabricante"
        value={codigo_fabricante}
        onChange={(e) => setManufacturer(e.target.value)}
      >
        <option value="">Seleccione un fabricante</option>
        {fabricantes.map((codigo_fabricante) => (
          <option key={codigo_fabricante.codigo} value={codigo_fabricante.codigo}>
            {codigo_fabricante.nombre}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Guardar</button>
  </form>
</div>

      );
    }
     
export default FormularioProducto;



