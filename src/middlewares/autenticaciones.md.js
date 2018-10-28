
/**
 * Declaramos unos middlewares de prueba 
 */
const jsondata = require('../datos/datos.json');
const token = "token_prueba>";

const verificarToken = (req, res, next) => {

    let tokenEntrante = req.get('Authorization');

    if( tokenEntrante.indexOf(token) !== -1 ) { // Si el tokenEntrante coniene token dentro de si 

        // Procedemos a tomar el caracter despues de 'token_prueba>' que se supone que es el id del usuario
        // ejemplo: token_prueba>4  el id seria 4 en este caso
        let index = tokenEntrante.indexOf('>');
        let id = tokenEntrante.charAt(index + 1);

        // le adjuntamos el id a la request para que los siguitenes middlewares tengan acceso a él
        req.id = id;

        next();
        
    } else { 
        res.json({
            'okay': false,
            'respuesta': 'Token invalido'
        });

    }

}

const validarRolDeportista = (req, res, next) => {
    let id = req.id;// id colocado en el middlewware anterior

    console.log('id recibido',id)

    // Si encuentra algun deportista con ese id
    let coincidencias = jsondata.deportistas.filter( (d) => d.id == id );
    if( coincidencias.length > 0 ) {
        next();
    }else{
        res.json({
            'okay': false,
            'respuesta': 'No tiene autorizacion'
        });
    }
}

module.exports = {
    verificarToken,
    validarRolDeportista
}