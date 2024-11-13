import express from"express";
import cursosController from"../controllers/cursosController"

const route= express.Router();

//gestio las rutas del estuciante

//get para mostrarlos todos
route.get('/',cursosController.consultar);
//post para crear un estudiante
route.post('/',cursosController.ingresar);
//post para asociar un estudiante a un curso
route.post('/inscribir',cursosController.asociarEstudianteCurso);

   //para las rutas que tienen id podemos octimizar el codigo
   
route.route('/:id')
   .put(cursosController.actualizar)
   .delete(cursosController.borrar)
   .get(cursosController.consultarDetalles);

export default route;



