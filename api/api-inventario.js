const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());


app.use(cors()); 


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda',
});


connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos MySQL:', error);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

// todos los productos
app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM producto';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.json(results);
    }
  });
});

// producto por su codigo
app.get('/productos/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const query = 'SELECT * FROM producto WHERE codigo = ?';

  connection.query(query, [codigo], (error, results) => {
    if (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

//  agregar un producto
app.post('/productos', (req, res) => {
  const { nombre, precio, codigo_fabricante } = req.body;
  const query = 'INSERT INTO producto (nombre, precio, codigo_fabricante) VALUES (?, ?, ?)';

  connection.query(query, [nombre, precio, codigo_fabricante], (error, results) => {
    if (error) {
      console.error('Error al agregar el producto:', error);
      res.status(500).json({ error: 'Error al agregar el producto' });
    } else {
      const productoId = results.insertId;
      res.json({ id: productoId, nombre, precio, codigo_fabricante });
    }
  });
});

// actualizar un producto
app.put('/productos/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const { nombre, precio, codigo_fabricante } = req.body;
  const query = 'UPDATE producto SET nombre = ?, precio = ?, codigo_fabricante = ? WHERE codigo = ?';

  connection.query(query, [nombre, precio, codigo_fabricante, codigo], (error, results) => {
    if (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    } else {
      res.json({ success: true });
    }
  });
});

// eliminar un producto
app.delete('/productos/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const query = 'DELETE FROM producto WHERE codigo = ?';

  connection.query(query, [codigo], (error, results) => {
    if (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    } else {
      res.json({ success: true });
    }
  });
});

//  todos los fabricantes
app.get('/fabricantes', (req, res) => {
  const query = 'SELECT * FROM fabricante';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los fabricantes:', error);
      res.status(500).json({ error: 'Error al obtener los fabricantes' });
    } else {
      res.json(results);
    }
  });
});

// fabricante por su código
app.get('/fabricantes/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const query = 'SELECT * FROM fabricante WHERE codigo = ?';

  connection.query(query, [codigo], (error, results) => {
    if (error) {
      console.error('Error al obtener el fabricante:', error);
      res.status(500).json({ error: 'Error al obtener el fabricante' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Fabricante no encontrado' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

// agregar un fabricante
app.post('/fabricantes', (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO fabricante (nombre) VALUES (?)';

  connection.query(query, [nombre], (error, results) => {
    if (error) {
      console.error('Error al agregar el fabricante:', error);
      res.status(500).json({ error: 'Error al agregar el fabricante' });
    } else {
      const fabricanteId = results.insertId;
      res.json({ id: fabricanteId, nombre });
    }
  });
});

// actualizar un fabricante
app.put('/fabricantes/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const { nombre } = req.body;
  const query = 'UPDATE fabricante SET nombre = ? WHERE codigo = ?';

  connection.query(query, [nombre, codigo], (error, results) => {
    if (error) {
      console.error('Error al actualizar el fabricante:', error);
      res.status(500).json({ error: 'Error al actualizar el fabricante' });
    } else {
      res.json({ success: true });
    }
  });
});

// eliminar un fabricante
app.delete('/fabricantes/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const query = 'DELETE FROM fabricante WHERE codigo = ?';

  connection.query(query, [codigo], (error, results) => {
    if (error) {
      console.error('Error al eliminar el fabricante:', error);
      res.status(500).json({ error: 'Error al eliminar el fabricante' });
    } else {
      res.json({ success: true });
    }
  });
});


// app.get('/productos/buscar', (req, res) => {
//     const search = req.query.search;
  
//     const query = `
//       SELECT codigo, nombre, precio, codigo_fabricante FROM producto
//       WHERE nombre LIKE '%${search}%'
//     `;
  
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error al buscar productos:', error);
//         res.status(500).json({ error: 'Ocurrió un error al buscar productos' });
//       } else {
//         res.json(results);
//       }
//     });
//   });

  

//buscar producto
  app.get('/productos/buscar/:search', (req, res) => {
    const search = req.params.search;
  
    const query = `
      SELECT codigo, nombre, precio, codigo_fabricante FROM producto
      WHERE nombre LIKE '%${search}%'
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al buscar productos' });
      } else {
        res.json(results);
      }
    });
  });
  
 
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
