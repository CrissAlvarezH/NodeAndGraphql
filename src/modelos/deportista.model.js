
const jsondata = require('../datos/datos.json');

class DeportistaModel {

    static getTodos() {
        return jsondata.deportistas;
    }

    static getUno(id) {
        let deportista = jsondata.deportistas.filter( (dep) => dep.id == id )[0];

        return deportista;
    }

    static getPorNombre(nombre) {
        let deportistas = jsondata.deportistas.filter( (dep) => dep.nombre == nombre );

        return deportistas;
    }

    static getPorApellidos(apellidos) {
        let deportistas = jsondata.deportistas.filter( (dep) => dep.apellidos == apellidos );

        return deportistas;
    }

    static getRangoEdad(min, max) {
        let deportistas = jsondata.deportistas.filter( (dep) => dep.edad >= min && dep.edad <= max );

        return deportistas;
    }

    static getDeportes(id) {
        // Buscamos los id de los deporte que practica este deportista
        let dep_dep = jsondata.deportista_deporte.filter( (item) => item.id_deportista == id );

        let deportes = [];
        
        for( let idDep of dep_dep ) { // Buscamos los datos de dichos deportes y los metemos en un array
            deportes.push( jsondata.deportes.filter( (deports) => deports.id == idDep.id_deporte )[0] );
        }

        return deportes;
    }
}

module.exports = DeportistaModel;