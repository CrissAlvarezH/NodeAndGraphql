const http = require('http');
const express = require('express');
const expressGraphql = require('express-graphql');

const DeportistaModel = require('./modelos/deportista.model');
const { deportistaEsquema, rootDeportista } = require('./esquemas/deportista.esquema');

const { verificarToken, validarRolDeportista } = require('./middlewares/autenticaciones.md');

const app = express();
const server = http.createServer( app );

// Agregamos un middleware 
app.use(verificarToken);

// Ruta que tiene activado el graphiql
app.use('/graphiql', expressGraphql({
    schema: deportistaEsquema,
    rootValue: rootDeportista,
    graphiql: true
}));

// Ruta para consultar simulando el servicio web final
app.post('/deportistas', validarRolDeportista, expressGraphql({
    schema: deportistaEsquema,
    rootValue: rootDeportista,
    graphiql: false
}));

// Ruta raiz de prueba
app.get('/', (req, res) => {
    let deportes = DeportistaModel.getDeportes(3);

    res.json(deportes);
});

server.listen(3000, () => {
    console.log(`Servidor corriendo`);
});