const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal para renderizar la vista del cliente
app.get('/', (req, res) => {
    const dataPath = path.join(__dirname, 'data.json');

    // Leer el archivo JSON y parsear los datos
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return res.status(500).send('Error interno del servidor');
        }

        try {
            // Parsear los datos JSON
            const jsonData = JSON.parse(data);

            // Obtener la lista de productos del objeto JSON
            const productos = jsonData.products;

            // Renderizar la vista 'client' y pasar los productos como contexto
            res.render('client', { productos });
        } catch (parseError) {
            console.error('Error al analizar el archivo JSON:', parseError);
            res.status(500).send('Error interno del servidor');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
