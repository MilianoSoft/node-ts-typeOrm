import express from"express";
import profesoresController from"../controllers/profesoresController"

const route= express.Router();

//gestio las rutas del estuciante

//get para mostrarlos todos
route.get('/',profesoresController.consultar);
//post para crear un estudiante
route.post('/',profesoresController.ingresar);
   //para las rutas que tienen id podemos octimizar el codigo
   
route.route('/:id')
   .put(profesoresController.actualizar)
   .delete(profesoresController.borrar)
   .get(profesoresController.consultarDetalles);

export default route;