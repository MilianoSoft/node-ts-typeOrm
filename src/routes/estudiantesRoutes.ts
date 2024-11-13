import express from"express";
import estudianteController from"../controllers/estudiantesController"

const route= express.Router();


//gestio las rutas del estuciante

//get para mostrarlos todos
route.get('/', estudianteController.consultar);
//post para crear un estudiante
route.post('/',estudianteController.ingresar);

   //para las rutas que tienen id podemos octimizar el codigo
route.route('/:id')
   .get(estudianteController.consultarDetalles)
   .put(estudianteController.actualizar)
   .delete(estudianteController.borrar);

export default route;