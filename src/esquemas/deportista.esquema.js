
const { buildSchema } = require('graphql');
const DeportistaModel = require('../modelos/deportista.model');

/**
 * El esquema es el encargado de representar los datos, es decir, definirá
 * la estructura que tendrán los datos que se pedirán mediante el servicio web.
 * El tipo Query representa una consulta que se puede hacer desde el cliente.
 * Se puede crear tipos de datos personalizados, por ejemplo Deportista, descrito abajo.
 * La sintaxis recuerda un poco a TypeScript y sus interfaces.
 */

const deportistaEsquema = buildSchema(`

    type Query {
        deportista(id: Int!): Deportista
        deportistasPorNombre(nombre: String!): [Deportista]
        deportistasPorApellidos(apellidos: String!): [Deportista]
        todosDeportistas: [Deportista]
        deportesDeUnDeportista(id: Int!): [Deporte]
        deportistaPorRangoEdad(min: Int!, max: Int!): [Deportista]
    }

    type Deportista {
        id: Int
        nombre: String
        apellidos: String
        edad: Int
    }

    type Deporte {
        id: Int
        nombre: String
        descripcion: String
    }

`);

/**
 * El root es un objeto donde estarán los metodos que se declararon en Query dentro del esquema, aqui
 * crearemos la variable root y le anexaremos nuestras functiones del deportista.
 * Las funciones que reciben argumentos, estos vienen en un parametro llamado args, es un objeto con los argumentos
 * como atributos
 * NOTA: El root es uno solo en toda la app
 */

const rootDeportista = {
    deportista: (args) => DeportistaModel.getUno(args.id),
    deportistasPorNombre: (args) => DeportistaModel.getPorNombre(args.nombre),
    deportistasPorApellidos: (args) => DeportistaModel.getPorApellidos(args.apellidos),
    todosDeportistas: () => DeportistaModel.getTodos(),
    deportesDeUnDeportista: (args) => DeportistaModel.getDeportes(args.id),
    deportistaPorRangoEdad: (args) => DeportistaModel.getRangoEdad(args.min, args.max)
};

module.exports = {
    deportistaEsquema,
    rootDeportista
}