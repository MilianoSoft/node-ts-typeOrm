
import { Request, Response } from 'express';
import { Curso } from '../models/cursoModel';
import { Profesor } from '../models/profesoresModel';
import { Estudiante } from '../models/estudianteModel';

//creo la clase profesor
class cursosController {
  //toda clase tiene un constructor
  constructor() { }

  //los metodo que tendra la clase estudiantes son
  async consultar(req: Request, res: Response) {
    //manejo de errores
    try {
      const data = await Curso.find({relations:{profesor:true,estudiantes:true}});

      if (data.length == 0) {
        throw new Error("curso no encontrado");
      }
      res.status(200).json(data);

    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //metodo de insertar estudiantes 
  async ingresar(req: Request, res: Response) {

    try {
       const {profesor}=req.body;
       //valido que halla un profesor
       const profesorregistrado= await Profesor.findOneBy({id:Number(profesor)});
       //si el profesor no existe retorna
       if(!profesorregistrado) throw Error("no hay profesor para mostrar");
       //si no hay fallos
        const registro = await Curso.save(req.body);
        res.status(201).json(registro);

    } catch (err) {
        if (err instanceof Error)
            res.status(500).send(err.message);
    }
}

  //metodo para actualizar estudiantes
  async actualizar(req: Request, res: Response) {

    const { id } = req.params;

    try {

      const registro = await Curso.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("curso no encontrado");
      } else {

          const {profesor}=req.body;
          //valido que halla un profesor
          const profesorregistrado= await Profesor.findOneBy({id:Number(profesor)});
          //si el profesor no existe retorna
          if(!profesorregistrado) {
               throw Error("no hay profesor no existe ");

          } else{
               await Curso.update({id:Number(id)}, req.body)
               const updateData = await Curso.findOneBy({ id: Number(id) });
               res.status(200).json(updateData);
          }
      }

    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }

  }

  //metodo para borrar el profesor
  async borrar(req: Request, res: Response) {
    //manejo de errores
    const { id } = req.params;
    try {
      const registro = await Curso.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("curso no encontrado");
      } else {

        await Curso.delete({id:Number(id)})
        res.status(200).json({message:"delete curso"});
      }
     } catch (error) {
        if (error instanceof Error)
          res.status(500).send(error.message);
      }
    }

//metodo para consultar detalles 
    async consultarDetalles(req: Request, res: Response){
      //manejo de errores
      const { id } = req.params;
      try {

        const registro = await Curso.findOne({where:{ id: Number(id)},relations:{profesor:true,estudiantes:true}});
        if (!registro) {
          throw new Error("curso no encontrado");
        }
        res.status(200).json(registro);

      } catch (error) {
        if (error instanceof Error)
          res.status(500).send(error.message);
      }
    }

   async asociarEstudianteCurso(req:Request,res:Response){

     try {
          const {estudiante_id,curso_id}= req.body;
          const estudiante= await Estudiante.findOneBy({id:Number(estudiante_id)});
          const curso= await Curso.findOneBy({id:Number(curso_id)});

          if (!curso) {
               throw new Error("no se puede asociar estudiante a un curso que no existe");
             }

          if(!estudiante){
               throw new Error("no se puede asociar un curso a un estudiante que no existe");
             }

             //si el curso no tiene estudiante
             curso.estudiantes= curso.estudiantes|| [];
             curso.estudiantes.push(estudiante);
             //guardamos el curso ahora con estudiante
            const registro= await Curso.save(curso);
            res.status(200).json(registro);

     } catch (error) {
        if (error instanceof Error)
          res.status(500).send(error.message);  
     }
    }

  }

//importamos una instancia de la clase
export default new cursosController();