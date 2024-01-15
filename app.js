const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT ?? 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'fl0user',
  host: 'ep-black-salad-87891778.us-east-2.aws.neon.fl0.io',
  database: 'ToDo',
  password: '3jOLckdbW6nA',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

const pool = new Pool({
    connectionString: 'postgres://tu_usuario:tu_contraseña@localhost:5432/tu_base_de_datos?sslmode=require',
  });
  

app.use(bodyParser.json());

// Operación Create (Crear)
app.post('/api/datos', async (req, res) => {
  const nuevoDato = req.body;

  try {
    const result = await pool.query('INSERT INTO tareas (materia_id, descripcion) VALUES ($1, $2) RETURNING *', [materia_id, descripcion]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear dato:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Operación Read (Leer)
app.get('/api/datos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM vista_tareas');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  });
  

// Operación Update (Actualizar)
app.put('/api/datos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const nuevosDatos = req.body;

  try {
    const result = await pool.query('UPDATE tu_tabla SET nombre = $1 WHERE id = $2 RETURNING *', [nuevosDatos.nombre, id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Dato no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar dato por ID:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Operación Delete (Eliminar)
app.delete('/api/datos/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('DELETE FROM tu_tabla WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length > 0) {
      res.json({ mensaje: 'Dato eliminado exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Dato no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar dato por ID:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
